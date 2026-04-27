'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { COLORS_BATUQUE } from '@/lib/constants'
import { useInView } from '@/components/Shared'
import Nav from '@/components/Nav'

const C = COLORS_BATUQUE
const stripes: string[] = [C.golden, C.red, C.olive, C.blue, C.golden]

interface DrumSVGProps {
  size?: number
}

const DrumSVG = ({ size = 140 }: DrumSVGProps) => (
  <svg width={size} height={Math.round(size * 0.8)} viewBox="0 0 140 112">
    <rect x="5" y="32" width="130" height="46" fill={C.golden} />
    {Array.from({ length: 13 }, (_, i) => (
      <polygon
        key={i}
        points={`${5 + i * 10},32 ${5 + i * 10 + 5},56 ${5 + i * 10 + 10},32`}
        fill={C.bg}
        opacity="0.38"
      />
    ))}
    <ellipse cx="70" cy="78" rx="65" ry="22" fill={C.goldenDark} />
    <ellipse cx="70" cy="32" rx="65" ry="22" fill={C.golden} />
    <ellipse cx="62" cy="27" rx="44" ry="13" fill={C.golden} opacity="0.35" />
    <line x1="100" y1="4" x2="132" y2="28" stroke={C.cream} strokeWidth="5" strokeLinecap="round" />
    <circle cx="100" cy="4" r="7" fill={C.cream} />
  </svg>
)

interface WaveSVGProps {
  width?: number
  color?: string
}

const WaveSVG = ({ width = 80, color = C.golden }: WaveSVGProps) => (
  <svg width={width} height={Math.round(width * 0.49)} viewBox="0 0 90 44">
    {([
      [1, 14, 16], [12, 6, 28], [23, 0, 40], [34, 10, 20],
      [45, 16, 12], [56, 4, 32], [67, 8, 24], [78, 14, 16],
    ] as [number, number, number][]).map(([x, y, h], i) => (
      <rect key={i} x={x} y={y} width={8} height={h} rx={4} fill={color} />
    ))}
  </svg>
)

export default function BatuquePage() {
  const [ref1, inView1] = useInView()
  const [ref2, inView2] = useInView()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 80) }, [])

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.cream }}>
      <Nav active="" onNav={() => {}} />

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '100px clamp(20px, 4vw, 60px) 80px',
        background: `linear-gradient(160deg, ${C.bgAlt} 0%, ${C.bg} 70%)`,
      }}>
        {/* Blue geometric accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '40%', height: '50%',
          background: C.blue, opacity: 0.1,
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
        }} />
        {/* Red accent */}
        <div style={{
          position: 'absolute', bottom: 8, left: 0, width: '30%', height: '35%',
          background: C.red, opacity: 0.1,
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
        }} />
        {/* Drum watermark */}
        <div style={{ position: 'absolute', bottom: '12%', right: '5%', opacity: 0.04, transform: 'scale(2.5)' }}>
          <DrumSVG size={120} />
        </div>

        <Link href="/" style={{
          position: 'absolute', top: 90, left: 'clamp(20px, 4vw, 60px)',
          fontFamily: "'Open Sans', sans-serif", fontSize: 12, letterSpacing: 2,
          textTransform: 'uppercase', color: C.gray,
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = C.golden}
          onMouseLeave={e => e.currentTarget.style.color = C.gray}
        >← Voltar</Link>

        <div style={{
          position: 'relative', zIndex: 2,
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{ marginBottom: 32 }}>
            <img src="/Logo_tambor.png" alt="Feira Criativa Batuquê" style={{ width: 160, height: 'auto' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${C.golden})` }} />
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: C.golden }}>Feira Criativa</span>
            <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, ${C.golden}, transparent)` }} />
          </div>
          <h1 style={{
            fontFamily: "'Gulfs Display', sans-serif",
            fontSize: 'clamp(64px, 15vw, 148px)', fontWeight: 700,
            color: C.golden, lineHeight: 0.9, margin: '0 0 20px', letterSpacing: 6,
          }}>
            BATUQUÊ
          </h1>
          <p style={{
            fontFamily: "'Open Sans', sans-serif", fontSize: 'clamp(12px, 1.4vw, 15px)',
            color: C.gray, letterSpacing: 3, textTransform: 'uppercase', margin: '0 auto 36px',
          }}>
            Coletivo Gestação · Rondonópolis, MT
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WaveSVG width={100} />
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', height: 8 }}>
          {stripes.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
        </div>
      </section>

      {/* Sobre */}
      <section style={{ padding: 'clamp(70px, 10vw, 100px) clamp(20px, 4vw, 60px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }} ref={ref1 as React.RefObject<HTMLDivElement | null>}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60,
            opacity: inView1 ? 1 : 0, transform: inView1 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <div>
              <div style={{ marginBottom: 20 }}>
                <WaveSVG width={70} />
              </div>
              <h2 style={{
                fontFamily: "'Gulfs Display', sans-serif",
                fontSize: 'clamp(32px, 5vw, 48px)', color: C.cream,
                letterSpacing: 2, margin: '0 0 20px',
              }}>Sobre a Feira</h2>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 15, color: C.gray, lineHeight: 1.8 }}>
                A Feira Criativa Batuquê é uma iniciativa do Coletivo Gestação que celebra a cultura afro-brasileira por meio da arte, música e criatividade. Um encontro que pulsa como um batuque — cheio de energia, tradição e expressão negra.
              </p>
              <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 15, color: C.gray, lineHeight: 1.8, marginTop: 16 }}>
                O evento reúne artistas, artesãos, músicos e criadores em Rondonópolis, MT, criando um espaço vivo de troca, afirmação identitária e celebração da cultura negra.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {([
                ['Tipo', 'Feira Criativa'],
                ['Local', 'Rondonópolis, Mato Grosso'],
                ['Organização', 'Coletivo Gestação'],
                ['Instagram', '@coletivogestacao'],
              ] as [string, string][]).map(([label, value], i) => (
                <div key={i} style={{
                  padding: '16px 20px',
                  background: C.bgCard,
                  borderLeft: `3px solid ${C.golden}`,
                  opacity: inView1 ? 1 : 0,
                  transform: inView1 ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.6s ease ${0.1 + i * 0.08}s`,
                }}>
                  <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 10, color: C.golden, letterSpacing: 2, textTransform: 'uppercase' }}>{label}</span>
                  <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 15, color: C.cream, margin: '4px 0 0' }}>{value}</p>
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

      {/* Programação */}
      <section style={{ padding: 'clamp(70px, 10vw, 100px) clamp(20px, 4vw, 60px)', background: C.bgAlt }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }} ref={ref2 as React.RefObject<HTMLDivElement | null>}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: C.golden }} />
            <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: C.golden }}>Programação</span>
          </div>
          <h2 style={{
            fontFamily: "'Gulfs Display', sans-serif",
            fontSize: 'clamp(36px, 6vw, 60px)', color: C.cream,
            letterSpacing: 2, margin: '0 0 48px',
          }}>Edições e Atrações</h2>
          <div style={{
            border: `1px dashed ${C.golden}44`,
            padding: 'clamp(40px, 6vw, 80px)', color: C.gray,
            fontFamily: "'Open Sans', sans-serif", fontSize: 13, letterSpacing: 2,
            textTransform: 'uppercase', textAlign: 'center',
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
