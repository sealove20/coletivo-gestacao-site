'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { COLORS } from '@/lib/constants'
import { useInView, AdinkraSymbol } from '@/components/Shared'
import Nav from '@/components/Nav'

export default function GestacaoDeCamPage() {
  const [ref, inView] = useInView()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 80) }, [])

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', color: COLORS.cream }}>
      <Nav active="" onNav={() => {}} />
      {/* Page header */}
      <div style={{
        padding: '120px clamp(20px, 4vw, 60px) clamp(60px, 8vw, 80px)',
        background: `linear-gradient(180deg, ${COLORS.bgAlt} 0%, ${COLORS.bg} 100%)`,
        position: 'relative',
        opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease',
      }}>
        <div style={{
          position: 'absolute', left: 'clamp(20px, 4vw, 60px)', top: 120, bottom: 0,
          width: 1, background: `linear-gradient(${COLORS.gold}00, ${COLORS.gold}33, ${COLORS.gold}00)`,
        }} />
        <Link href="/" style={{
          position: 'absolute', top: 90, left: 'clamp(20px, 4vw, 60px)',
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 2,
          textTransform: 'uppercase', color: COLORS.gray,
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = COLORS.gold}
          onMouseLeave={e => e.currentTarget.style.color = COLORS.gray}
        >
          ← Voltar
        </Link>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 700,
            color: COLORS.cream, lineHeight: 1.05, margin: 0,
          }}>Gestação de Cam</h1>
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 60px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div ref={ref}>
            {/* Hero image placeholder */}
            <div style={{
              width: '100%', height: 'clamp(250px, 40vw, 450px)',
              background: `linear-gradient(135deg, #1a1008, #2a1a0c, #1a1008)`,
              border: `1px solid ${COLORS.grayDark}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 50, position: 'relative', overflow: 'hidden',
              opacity: inView ? 1 : 0, transition: 'opacity 1s ease',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${COLORS.gold}11 0%, transparent 70%)` }} />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <AdinkraSymbol size={50} color={`${COLORS.gold}55`} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.gray, marginTop: 16, letterSpacing: 2 }}>
                  [ FOTO DE CENA DO ESPETÁCULO ]
                </p>
              </div>
            </div>
            {/* Synopsis */}
            <div style={{
              maxWidth: 800, margin: '0 auto 50px',
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.3s',
            }}>
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 3,
                textTransform: 'uppercase', color: COLORS.gold, marginBottom: 20,
              }}>Sinopse</h3>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(16px, 2vw, 20px)', color: COLORS.cream,
                lineHeight: 1.8, margin: 0,
              }}>
                Três mulheres negras despertam sem memória. Tudo o que sabem é que compartilham o mesmo nome: Cam. Um dia, nasce uma criança que precisa ser protegida para não herdar a mesma maldição. Para isso, as mulheres embarcam em uma jornada pela floresta em busca de seu verdadeiro nome — aquele que lhes foi tirado.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.gray,
                lineHeight: 1.8, marginTop: 20,
              }}>
                Nesse caminho encantado, cercado de folhas, cantos e mistérios, elas encontram divindades, histórias e desafios que revelam memórias guardadas em seus corpos e na terra. Uma performance que convida crianças e adultos a refletir, através da poesia e da imaginação, sobre a força da memória, da proteção e do afeto.
              </p>
            </div>
            {/* Technical info grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 1, background: COLORS.grayDark,
              border: `1px solid ${COLORS.grayDark}`,
              opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.5s',
            }}>
              <div style={{ background: COLORS.bg, padding: 'clamp(24px, 3vw, 36px)' }}>
                <h4 style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3,
                  textTransform: 'uppercase', color: COLORS.gold, marginBottom: 20, marginTop: 0,
                }}>Ficha Técnica</h4>
                {[
                  ['Direção', 'Coletiva'],
                  ['Dramaturgia', 'Camila Zenzele Pinho'],
                  ['Elenco', 'Camila Zenzele Pinho, Larissa Fernanda de Andrade, Sara Alves Timótheo'],
                  ['Atriz Convidada', 'Alice Lucas'],
                  ['Trilha Sonora', 'Nega Lu'],
                  ['Percussão', 'Moisés Ferreira'],
                  ['Figurino / Iluminação', 'Ricardo Almeida'],
                ].map(([label, value], i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.gray, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</span>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.cream, margin: '2px 0 0' }}>{value}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: COLORS.bg, padding: 'clamp(24px, 3vw, 36px)' }}>
                <h4 style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3,
                  textTransform: 'uppercase', color: COLORS.gold, marginBottom: 20, marginTop: 0,
                }}>Informações Técnicas</h4>
                {[
                  ['Duração', '50 minutos'],
                  ['Classificação', '12+'],
                  ['Montagem', '3 horas'],
                  ['Idioma', 'Português'],
                  ['Campo Artístico', 'Teatro / Performance / Música'],
                  ['Tipo', 'Ensemble'],
                ].map(([label, value], i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    padding: '12px 0',
                    borderBottom: i < 5 ? `1px solid ${COLORS.grayDark}` : 'none',
                  }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.gray }}>{label}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.cream, fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Photo gallery placeholder */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 8, marginTop: 50,
              opacity: inView ? 1 : 0, transition: 'opacity 1s ease 0.7s',
            }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  aspectRatio: i === 1 ? '4/5' : i === 2 ? '1/1' : '3/4',
                  background: `linear-gradient(${135 + i * 30}deg, #1a1008, #2a1a0c)`,
                  border: `1px solid ${COLORS.grayDark}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.gray, letterSpacing: 1 }}>FOTO {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
