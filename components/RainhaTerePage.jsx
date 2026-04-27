'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { COLORS_TERE } from '@/lib/constants'
import { useInView } from '@/components/Shared'
import Nav from '@/components/Nav'

const TereArrow = ({ color = COLORS_TERE.yellow, width = 48 }) => (
  <svg width={width} height={width * 0.6} viewBox="0 0 80 48" fill={color}>
    <polygon points="0,13 46,13 46,0 80,24 46,48 46,35 0,35" />
  </svg>
)

const TereLogoSVG = ({ size = 160, spin = false }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="96" fill={COLORS_TERE.goldenLight} />
    <polygon
      points="100,18 115,44 141,29 141,59 171,59 156,85 182,100 156,115 171,141 141,141 141,171 115,156 100,182 85,156 59,171 59,141 29,141 44,115 18,100 44,85 29,59 59,59 59,29 85,44"
      fill={COLORS_TERE.olive}
      style={spin ? { transformOrigin: '100px 100px', animation: 'logoSpin 60s linear infinite' } : {}}
    />
    <circle cx="100" cy="100" r="44" fill={COLORS_TERE.bgAlt} />
    <polygon
      points="100,68 108,90 130,90 112,104 119,126 100,113 81,126 88,104 70,90 92,90"
      fill={COLORS_TERE.red}
    />
  </svg>
)

export default function RainhaTerePage() {
  const [ref, inView] = useInView()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 80) }, [])
  const stripes = [COLORS_TERE.red, COLORS_TERE.olive, COLORS_TERE.yellow, COLORS_TERE.peach, COLORS_TERE.golden, COLORS_TERE.olive, COLORS_TERE.red]

  return (
    <div style={{ background: COLORS_TERE.bg, minHeight: '100vh', color: COLORS_TERE.cream }}>
      <Nav active="" onNav={() => {}} />

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '100px clamp(20px, 4vw, 60px) 80px',
        background: `linear-gradient(170deg, ${COLORS_TERE.bgAlt} 0%, ${COLORS_TERE.bg} 60%, #2a3a10 100%)`,
      }}>
        {/* Back button */}
        <Link href="/" style={{
          position: 'absolute', top: 90, left: 'clamp(20px, 4vw, 60px)',
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 2,
          textTransform: 'uppercase', color: COLORS_TERE.gray,
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = COLORS_TERE.yellow}
          onMouseLeave={e => e.currentTarget.style.color = COLORS_TERE.gray}
        >
          ← Voltar
        </Link>
        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{ marginBottom: 32 }}>
            <TereLogoSVG size={140} spin={true} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS_TERE.yellow})` }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: COLORS_TERE.yellow }}>Rondonópolis · MT</span>
            <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, ${COLORS_TERE.yellow}, transparent)` }} />
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', 'Barlow Condensed', 'DM Sans', sans-serif",
            fontSize: 'clamp(52px, 12vw, 120px)', fontWeight: 700,
            color: COLORS_TERE.cream, lineHeight: 0.9, margin: '0 0 16px', letterSpacing: 2,
          }}>
            Festival de Teatro<br />
            <span style={{ color: COLORS_TERE.yellow }}>Rainha Terê</span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px, 1.5vw, 16px)',
            color: COLORS_TERE.gray, letterSpacing: 3, textTransform: 'uppercase',
            margin: '0 auto 40px',
          }}>
            Mato Grosso Negro: Quem Somos?
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['2024', '2025', '2026'].map(y => (
              <span key={y} style={{
                fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
                fontSize: 20, letterSpacing: 3,
                border: `1px solid ${COLORS_TERE.yellow}66`,
                color: COLORS_TERE.yellow, padding: '6px 20px',
              }}>{y}ª Edição</span>
            ))}
          </div>
        </div>
        {/* Bottom stripe band */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', height: 8 }}>
          {stripes.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
        </div>
      </section>

      {/* Sobre o Festival */}
      <section style={{ padding: 'clamp(70px, 10vw, 100px) clamp(20px, 4vw, 60px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }} ref={ref}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <div>
              <div style={{ marginBottom: 24 }}>
                <TereArrow width={52} />
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
                fontSize: 'clamp(32px, 5vw, 48px)', color: COLORS_TERE.cream,
                letterSpacing: 2, margin: '0 0 20px',
              }}>Sobre o Festival</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS_TERE.gray, lineHeight: 1.8 }}>
                O Festival de Teatro Rainha Terê é uma iniciativa do Coletivo Gestação que celebra a cena teatral negra mato-grossense. Com o tema "Mato Grosso Negro: Quem Somos?", o festival reúne grupos e coletivos de teatro negro para compartilhar experiências, processos criativos e perspectivas afrocentradas.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS_TERE.gray, lineHeight: 1.8, marginTop: 16 }}>
                Realizado em Rondonópolis, MT, o festival se propõe a ser um espaço de encontro, formação e afirmação da identidade negra no teatro regional.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                ['Local', 'Rondonópolis, Mato Grosso'],
                ['Organização', 'Coletivo Gestação'],
                ['Edições', '2024 · 2025 · 2026'],
                ['Instagram', '@festivalrainhatere'],
                ['Realização', 'Viver Cultura · SECEL · Governo de MT'],
              ].map(([label, value], i) => (
                <div key={i} style={{
                  padding: '16px 20px',
                  background: COLORS_TERE.bgCard,
                  borderLeft: `3px solid ${COLORS_TERE.yellow}`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.6s ease ${0.1 + i * 0.08}s`,
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: COLORS_TERE.yellow, letterSpacing: 2, textTransform: 'uppercase' }}>{label}</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS_TERE.cream, margin: '4px 0 0' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stripe divider */}
      <div style={{ display: 'flex', height: 6 }}>
        {stripes.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>

      {/* Edições */}
      <section style={{ padding: 'clamp(70px, 10vw, 100px) clamp(20px, 4vw, 60px)', background: COLORS_TERE.bgAlt }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 40, height: 1, background: COLORS_TERE.yellow }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: COLORS_TERE.yellow }}>Histórico</span>
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
            fontSize: 'clamp(36px, 6vw, 60px)', color: COLORS_TERE.cream,
            letterSpacing: 2, margin: '0 0 48px',
          }}>Edições</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { year: '2024', subtitle: '1ª Edição', info: 'Rondonópolis, MT' },
              { year: '2025', subtitle: '2ª Edição', info: 'Rondonópolis, MT' },
              { year: '2026', subtitle: '3ª Edição', info: 'Rondonópolis, MT' },
            ].map((ed, i) => (
              <div key={i} style={{
                background: COLORS_TERE.bgCard,
                border: `1px solid ${COLORS_TERE.yellow}33`,
                padding: 'clamp(28px, 4vw, 44px)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.06 }}>
                  <TereLogoSVG size={130} />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
                    fontSize: 'clamp(64px, 10vw, 96px)', color: COLORS_TERE.yellow,
                    lineHeight: 1, margin: '0 0 4px', letterSpacing: 2,
                  }}>{ed.year}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS_TERE.gray, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 20px' }}>{ed.subtitle} · {ed.info}</p>
                  <div style={{ height: 1, background: COLORS_TERE.grayDark, marginBottom: 20 }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS_TERE.gray, lineHeight: 1.7 }}>
                    Informações sobre a edição em breve.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Espetáculos Convidados */}
      <section style={{ padding: 'clamp(70px, 10vw, 100px) clamp(20px, 4vw, 60px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            <TereArrow width={36} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: COLORS_TERE.yellow }}>Programação</span>
            <TereArrow width={36} color={COLORS_TERE.olive} />
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
            fontSize: 'clamp(36px, 6vw, 60px)', color: COLORS_TERE.cream,
            letterSpacing: 2, margin: '0 0 16px',
          }}>Espetáculos Convidados</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS_TERE.gray, marginBottom: 48 }}>
            Programação da próxima edição em breve.
          </p>
          <div style={{
            border: `1px dashed ${COLORS_TERE.yellow}33`,
            padding: 'clamp(40px, 6vw, 80px)', color: COLORS_TERE.gray,
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 2,
            textTransform: 'uppercase',
          }}>
            Em breve
          </div>
        </div>
      </section>

      {/* Bottom stripe */}
      <div style={{ display: 'flex', height: 8 }}>
        {stripes.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>
    </div>
  )
}
