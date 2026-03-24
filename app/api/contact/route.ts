import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* ─── In-memory IP rate limiter ──────────────────────────────────────────── */
const WINDOW_MS = 60_000 // 1 minute
const MAX_REQUESTS = 5

const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  hits.set(ip, timestamps)
  return false
}

// Purge stale entries every 5 minutes to prevent memory leak
if (typeof globalThis !== 'undefined') {
  const CLEANUP_INTERVAL = 5 * 60_000
  setInterval(() => {
    const now = Date.now()
    for (const [ip, timestamps] of hits) {
      const fresh = timestamps.filter((t) => now - t < WINDOW_MS)
      if (fresh.length === 0) hits.delete(ip)
      else hits.set(ip, fresh)
    }
  }, CLEANUP_INTERVAL).unref?.()
}
/* ──────────────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    /* Rate limit check */
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'rate_limited' },
        { status: 429, headers: { 'Retry-After': '60' } },
      )
    }

    const { name, email, message } = (await request.json()) as {
      name?: string
      email?: string
      message?: string
    }

    const payload = {
      name: name?.trim() ?? '',
      email: email?.trim() ?? '',
      message: message?.trim() ?? '',
    }

    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }

    if (!EMAIL_PATTERN.test(payload.email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'missing_config' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'Shubak Contact <noreply@shubak.ai>',
      to: 'hello@shubak.ai',
      replyTo: payload.email,
      subject: `New inquiry from ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
    })

    if (error) {
      console.error('Contact form error:', error)
      return NextResponse.json({ error: 'send_failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }
}

