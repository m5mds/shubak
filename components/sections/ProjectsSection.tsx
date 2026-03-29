'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLocale } from '@/lib/i18n/context'
import { SectionReveal } from '@/components/motion/SectionReveal'

const PROJECT_GRADIENTS = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #2c3e50 100%)',
  'linear-gradient(135deg, #1a0a2e 0%, #16082e 50%, #2d1b69 100%)',
  'linear-gradient(135deg, #0a1a1a 0%, #0d2626 50%, #1a3a3a 100%)',
  'linear-gradient(135deg, #1a1000 0%, #2a1f00 50%, #3d2b00 100%)',
  'linear-gradient(135deg, #0a0a1a 0%, #111128 50%, #1a1a38 100%)',
]

function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7l6 3-6 3V7z" fill="currentColor" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

interface ProjectModalProps {
  project: { title: string; description: string }
  gradientBg: string
  onClose: () => void
  closeLabel: string
}

function ProjectModal({ project, gradientBg, onClose, closeLabel }: ProjectModalProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[14px] border border-white/[0.1] bg-[#0e1016]"
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.94, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96, y: prefersReducedMotion ? 0 : 10 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex h-[22px] items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-3">
          <div className="flex items-center gap-1.5">
            <div className="h-[6px] w-[6px] rounded-full bg-white/15" />
            <div className="h-[6px] w-[6px] rounded-full bg-white/15" />
            <div className="h-[6px] w-[6px] rounded-full bg-white/15" />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex items-center gap-1.5 text-white/40 transition-colors hover:text-white/80"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Video player — full modal width */}
        <div
          className="relative flex w-full aspect-video items-center justify-center"
          style={{ background: gradientBg }}
        >
          <div className="flex flex-col items-center gap-3 text-white/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] backdrop-blur-sm">
              <PlayIcon size={22} />
            </div>
          </div>
        </div>

        {/* Title + description directly under video, compact */}
        <div className="px-5 py-4">
          <h3 className="text-[17px] font-normal text-white">{project.title}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface ProjectCardProps {
  project: { title: string; description: string }
  index: number
  onOpen: () => void
  playLabel: string
}

function ProjectCard({ project, index, onOpen, playLabel }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const bg = PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length]

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="group relative w-full cursor-pointer overflow-hidden rounded-[12px] border border-white/[0.07] text-start transition-[border-color] duration-300 hover:border-white/[0.18]"
      style={{ aspectRatio: '16/9' }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.015 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Permanent gradient thumbnail */}
      <div className="absolute inset-0" style={{ background: bg }} />

      {/* Partial dark veil always on, deepens on hover for play icon contrast */}
      <div className="absolute inset-0 bg-black/25 transition-[background-color] duration-300 group-hover:bg-black/55" />

      {/* Play overlay — centred, appears on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white">
          <PlayIcon size={20} />
        </div>
      </div>

      {/* Project title — pinned to bottom, always visible */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-10">
        <span className="text-[15px] font-normal text-white">{project.title}</span>
      </div>
    </motion.button>
  )
}

export function ProjectsSection() {
  const { dict } = useLocale()
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const projects = dict.projects.items

  return (
    <section
      id="projects"
      className="homepage-section relative overflow-hidden bg-[#0a0a0f]"
      style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}
    >
      <div className="relative z-10 mx-auto max-w-5xl px-5 lg:px-12">
        <SectionReveal className="mb-12 md:mb-16">
          <span className="mb-4 block font-mono text-sm uppercase tracking-[0.25em] text-white/50">
            {dict.projects.sectionTag}
          </span>
          <h2 className="text-[clamp(28px,3.8vw,48px)] font-medium tracking-tight text-white">
            {dict.projects.sectionHeading}
          </h2>
        </SectionReveal>

        {/* CSS Grid of thumbnail cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              onOpen={() => setActiveProject(i)}
              playLabel={dict.projects.playVideo}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject !== null && (
          <ProjectModal
            project={projects[activeProject]}
            gradientBg={PROJECT_GRADIENTS[activeProject % PROJECT_GRADIENTS.length]}
            onClose={() => setActiveProject(null)}
            closeLabel={dict.projects.closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
