'use client'

import { useState, useEffect, useRef } from 'react'
import { COLORS } from '@/lib/constants'

export function useInView(threshold = 0.15): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

interface AdinkraSymbolProps {
  size?: number
  color?: string
  style?: React.CSSProperties
}

export const AdinkraSymbol = ({ size = 40, color = COLORS.gold, style = {} }: AdinkraSymbolProps) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={style}>
    <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1.5" />
    <circle cx="30" cy="30" r="6" fill={color} />
    <circle cx="30" cy="12" r="3" fill={color} />
    <circle cx="30" cy="48" r="3" fill={color} />
    <circle cx="12" cy="30" r="3" fill={color} />
    <circle cx="48" cy="30" r="3" fill={color} />
  </svg>
)

interface StarDecorProps {
  size?: number
  color?: string
  style?: React.CSSProperties
}

export const StarDecor = ({ size = 16, color = COLORS.gold, style = {} }: StarDecorProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
  </svg>
)

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
}

export function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref as React.RefObject<HTMLDivElement | null>} style={{
      textAlign: align, marginBottom: 50,
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: 16, marginBottom: 12 }}>
        <StarDecor size={14} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: COLORS.gold }}>
          {subtitle}
        </span>
        <StarDecor size={14} />
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 5vw, 48px)',
        color: COLORS.cream, fontWeight: 700, lineHeight: 1.15, margin: 0,
      }}>
        {title}
      </h2>
    </div>
  )
}
