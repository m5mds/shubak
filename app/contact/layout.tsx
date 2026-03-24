import type { Metadata } from 'next'
import { ar } from '@/lib/i18n/ar'
import { en } from '@/lib/i18n/en'

export const metadata: Metadata = {
  title: `${ar.contact.title} | ${en.contact.title}`,
  description: en.contact.subtitle,
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
