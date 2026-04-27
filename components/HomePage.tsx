'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { COLORS, SECTIONS } from '@/lib/constants'
import { useInView, AdinkraSymbol, StarDecor, SectionTitle } from '@/components/Shared'
import Nav from '@/components/Nav'

export interface BlogPost {
  slug: string
  category: string
  tag: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  content: string
}

interface CastMember {
  name: string
  role: string
  desc: string
}

interface TeamMember {
  name: string
  roles: string
}

interface MediaItem {
  source: string
  title: string
  year: string
}

interface ContactItem {
  icon: string
  label: string
  value: string
  href: string
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  inView: boolean
  delay?: number
  onClick: () => void
}

interface BlogModalProps {
  post: BlogPost
  onClose: () => void
}

function Home({ onNav }: { onNav: (id: string) => void }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])
  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', position: 'relative',
      overflow: 'hidden', textAlign: 'center',
      background: `linear-gradient(170deg, ${COLORS.bg} 0%, #1a1008 50%, ${COLORS.bg} 100%)`,
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        width: 300, height: 300, borderRadius: '50%',
        border: `1px solid ${COLORS.gold}22`,
        opacity: loaded ? 0.3 : 0, transition: 'opacity 2s ease 0.5s',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '8%',
        width: 200, height: 200, borderRadius: '50%',
        border: `1px solid ${COLORS.gold}22`,
        opacity: loaded ? 0.3 : 0, transition: 'opacity 2s ease 0.8s',
      }} />
      <div style={{
        position: 'relative', zIndex: 2, padding: '0 20px',
        opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{ marginBottom: 30 }}>
          <AdinkraSymbol size={60} color={COLORS.gold} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 20,
          opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 0.3s',
        }}>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.gold})` }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', color: COLORS.gold }}>
            Coletivo Afroperspectivista de Teatro
          </span>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${COLORS.gold}, transparent)` }} />
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(48px, 10vw, 100px)', fontWeight: 700,
          color: COLORS.cream, lineHeight: 1, margin: '0 0 8px',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}>
          Coletivo
        </h1>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(48px, 10vw, 100px)', fontWeight: 700,
          fontStyle: 'italic',
          background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight}, ${COLORS.cream})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          lineHeight: 1, margin: '0 0 30px',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
        }}>
          Gestação
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 2vw, 20px)',
          color: COLORS.gray, maxWidth: 550, margin: '0 auto 40px', lineHeight: 1.7,
          opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 0.8s',
        }}>
          Teatro negro. Memória. Ancestralidade.
          <br />
          <span style={{ fontSize: '0.85em' }}>Rondonópolis, Mato Grosso</span>
        </p>
        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1s',
        }}>
          <Link href="/espetaculos/gestacao-de-cam" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 2,
            textTransform: 'uppercase', padding: '16px 36px',
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`,
            color: COLORS.bg, border: 'none', cursor: 'pointer',
            fontWeight: 600, transition: 'all 0.3s', textDecoration: 'none',
            display: 'inline-block',
          }}>
            Conheça o Espetáculo
          </Link>
          <button onClick={() => onNav('contato')} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 2,
            textTransform: 'uppercase', padding: '16px 36px',
            background: 'transparent',
            color: COLORS.cream, border: `1px solid ${COLORS.grayDark}`,
            cursor: 'pointer', fontWeight: 500, transition: 'all 0.3s',
          }}>
            Contato
          </button>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: loaded ? 0.5 : 0, transition: 'opacity 1s ease 1.5s',
        animation: 'float 2s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.gray }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 30, background: `linear-gradient(${COLORS.gray}, transparent)` }} />
      </div>
    </section>
  )
}

function Coletivo() {
  const [ref, inView] = useInView()
  const cast: CastMember[] = [
    { name: 'Camila Zenzele Pinho', role: 'Dramaturga, Atriz, Produtora', desc: 'Psicóloga e Mestre em Educação. Criadora e idealizadora do Coletivo Gestação.' },
    { name: 'Larissa Fernanda de Andrade', role: 'Atriz e Performer', desc: 'Integrante do elenco de Gestação de Cam.' },
    { name: 'Sara Alves Timótheo', role: 'Atriz e Performer', desc: 'Integrante do elenco de Gestação de Cam.' },
    { name: 'Alice Lucas', role: 'Atriz Convidada', desc: 'Participação especial no espetáculo.' },
  ]
  const team: TeamMember[] = [
    { name: 'Ricardo Almeida', roles: 'Figurino · Maquiagem · Iluminação' },
    { name: 'Nega Lu', roles: 'Composição Musical Original' },
    { name: 'Moisés Ferreira', roles: 'Percussão' },
  ]
  return (
    <section id="coletivo" style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)',
      background: COLORS.bg, position: 'relative',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionTitle title="O Coletivo" subtitle="Quem Somos" />
        <div ref={ref as React.RefObject<HTMLDivElement | null>} style={{
          display: 'grid', gridTemplateColumns: '1fr', gap: 40,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <div style={{
            background: COLORS.bgAlt, border: `1px solid ${COLORS.grayDark}`,
            padding: 'clamp(30px, 4vw, 50px)', position: 'relative',
          }}>
            <AdinkraSymbol size={48} color={`${COLORS.gold}33`} style={{ position: 'absolute', top: -24, right: 30 }} />
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(18px, 2.5vw, 24px)',
              color: COLORS.cream, lineHeight: 1.7, margin: '0 0 24px', fontStyle: 'italic',
            }}>
              "Nascemos da pesquisa e da prática artística de mulheres negras em Mato Grosso."
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: COLORS.gray,
              lineHeight: 1.8, margin: 0,
            }}>
              O Coletivo Gestação nasce da investigação acadêmica de Camila Zenzele Pinho — psicóloga, atriz e Mestre em Educação — sobre juventude, educação e cultura a partir das afroperspectividades. O grupo aprofunda questões sobre saúde mental da juventude negra, processos de formação de sujeitos e as relações entre arte, educação e identidade. Nossa dramaturgia é construída coletivamente, entrelaçando texto, música original e performance para dar corpo a histórias que precisam ser contadas.
            </p>
          </div>
          <div>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 3,
              textTransform: 'uppercase', color: COLORS.gold, marginBottom: 24,
            }}>Elenco & Equipe</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {cast.map((p, i) => (
                <div key={i} style={{
                  padding: 24, border: `1px solid ${COLORS.grayDark}`,
                  background: `${COLORS.bgAlt}88`, transition: 'all 0.3s',
                  opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${0.3 + i * 0.1}s`,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${COLORS.gold}44, ${COLORS.goldDark}22)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16, fontFamily: "'Playfair Display', serif",
                    fontSize: 18, color: COLORS.gold, fontWeight: 700,
                  }}>
                    {p.name.charAt(0)}
                  </div>
                  <h4 style={{
                    fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17,
                    color: COLORS.cream, margin: '0 0 6px', fontWeight: 600,
                  }}>{p.name}</h4>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 1,
                    textTransform: 'uppercase', color: COLORS.gold, margin: '0 0 10px',
                  }}>{p.role}</p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    color: COLORS.gray, lineHeight: 1.6, margin: 0,
                  }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 24,
            padding: '24px 0', borderTop: `1px solid ${COLORS.grayDark}`,
          }}>
            {team.map((t, i) => (
              <div key={i} style={{ flex: '1 1 200px' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: COLORS.cream, margin: '0 0 4px' }}>{t.name}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.gray, margin: 0 }}>{t.roles}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Imprensa() {
  const [ref, inView] = useInView()
  const media: MediaItem[] = [
    { source: 'Notícia em Foco MT', title: "Gestação de CAM estreia nesta quarta, espetáculo contemplado na Lei Aldir Blanc", year: '2021' },
    { source: 'Agora MT', title: "Espetáculo 'Gestação de Cam' estreia em formato online", year: '2021' },
  ]
  return (
    <section id="imprensa" style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)',
      background: COLORS.bgAlt,
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionTitle title="Imprensa" subtitle="Na Mídia" />
        <div ref={ref as React.RefObject<HTMLDivElement | null>} style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20,
        }}>
          <div style={{
            background: COLORS.bg, border: `1px solid ${COLORS.grayDark}`,
            padding: 'clamp(28px, 3vw, 40px)', position: 'relative',
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 60, color: COLORS.gold,
              lineHeight: 1, position: 'absolute', top: 20, left: 28, opacity: 0.3,
            }}>"</div>
            <div style={{ paddingTop: 30 }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', color: COLORS.gold,
              }}>Crítica · Festival Satyrianas 2023</span>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: 17,
                color: COLORS.cream, lineHeight: 1.7, margin: '16px 0', fontStyle: 'italic',
              }}>
                "Gestação de Cam é uma construção abundante, pujante e necessária da memória-território de mulheres negras e do firmamento e importância de suas existências."
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.gray, margin: 0 }}>
                — Tiago Horbatow, Deus Ateu
              </p>
            </div>
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 16,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.4s',
          }}>
            {media.map((m, i) => (
              <div key={i} style={{
                background: COLORS.bg, border: `1px solid ${COLORS.grayDark}`,
                padding: 24, cursor: 'pointer', transition: 'all 0.3s',
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 2,
                  textTransform: 'uppercase', color: COLORS.gold,
                }}>{m.source} · {m.year}</span>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                  color: COLORS.cream, lineHeight: 1.5, margin: '10px 0 0',
                }}>{m.title}</p>
              </div>
            ))}
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.gold}15, ${COLORS.gold}08)`,
              border: `1px solid ${COLORS.gold}33`,
              padding: 24, display: 'flex', alignItems: 'center', gap: 16,
              cursor: 'pointer',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `${COLORS.gold}22`, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>📄</div>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.cream, margin: '0 0 4px', fontWeight: 600 }}>
                  Download do Portfólio
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.gray, margin: 0 }}>
                  PDF com ficha técnica, fotos e informações completas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


function BlogModal({ post, onClose }: BlogModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: 'clamp(16px, 4vw, 40px)', overflowY: 'auto',
      animation: 'fadeIn 0.25s ease',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: COLORS.bg, border: `1px solid ${COLORS.grayDark}`,
        maxWidth: 720, width: '100%',
        padding: 'clamp(32px, 5vw, 60px)', position: 'relative',
        animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
        marginTop: 20, marginBottom: 20,
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20,
          background: 'none', border: `1px solid ${COLORS.grayDark}`,
          color: COLORS.gray, cursor: 'pointer',
          width: 36, height: 36, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: "'DM Sans', sans-serif", fontSize: 18, transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.color = COLORS.gold }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.grayDark; e.currentTarget.style.color = COLORS.gray }}
        >×</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: COLORS.gold }}>{post.category}</span>
          <span style={{ width: 20, height: 1, background: COLORS.grayDark }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: COLORS.gray }}>{post.tag}</span>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(24px, 4vw, 36px)',
          color: COLORS.cream, fontWeight: 700, lineHeight: 1.25, margin: '0 0 24px',
        }}>{post.title}</h2>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          paddingBottom: 28, borderBottom: `1px solid ${COLORS.grayDark}`,
          marginBottom: 32, flexWrap: 'wrap',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: `linear-gradient(135deg, ${COLORS.gold}44, ${COLORS.goldDark}22)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Playfair Display', serif", fontSize: 15, color: COLORS.gold, fontWeight: 700,
          }}>{post.author.charAt(0)}</div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.cream, margin: 0 }}>{post.author}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.gray, margin: 0 }}>{post.date} · {post.readTime} de leitura</p>
          </div>
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: COLORS.gray,
            lineHeight: 1.85,
          }}
        />
        <div style={{
          marginTop: 40, paddingTop: 28, borderTop: `1px solid ${COLORS.grayDark}`,
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <button onClick={onClose} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 2,
            textTransform: 'uppercase', padding: '12px 28px',
            background: 'transparent', border: `1px solid ${COLORS.grayDark}`,
            color: COLORS.gray, cursor: 'pointer', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.color = COLORS.gold }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.grayDark; e.currentTarget.style.color = COLORS.gray }}
          >← Voltar ao Blog</button>
        </div>
      </div>
    </div>
  )
}

function BlogCard({ post, featured = false, inView, delay = 0, onClick }: BlogCardProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: COLORS.bg,
      border: `1px solid ${hovered ? COLORS.gold + '55' : COLORS.grayDark}`,
      padding: featured ? 'clamp(28px, 3vw, 44px)' : 28,
      display: 'flex', flexDirection: 'column', gap: 16,
      cursor: 'pointer', transition: 'border-color 0.3s, transform 0.3s',
      transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      opacity: inView ? 1 : 0,
      transitionDelay: `${delay}s`,
      transitionProperty: 'opacity, transform, border-color',
      transitionDuration: '0.6s, 0.3s, 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: COLORS.gold }}>{post.category}</span>
        <span style={{ width: 20, height: 1, background: COLORS.grayDark }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: COLORS.gray }}>{post.tag}</span>
      </div>
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: featured ? 'clamp(22px, 2.5vw, 28px)' : 'clamp(16px, 2vw, 19px)',
        color: COLORS.cream, fontWeight: 700, lineHeight: 1.3, margin: 0,
      }}>{post.title}</h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: featured ? 15 : 13,
        color: COLORS.gray, lineHeight: 1.75, margin: 0, flexGrow: 1,
      }}>{post.excerpt}</p>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 16, borderTop: `1px solid ${COLORS.grayDark}`, flexWrap: 'wrap', gap: 8,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.cream }}>{post.author}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.gray }}>{post.date} · {post.readTime} de leitura</span>
        </div>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 1.5,
          textTransform: 'uppercase', color: COLORS.gold,
          display: 'flex', alignItems: 'center', gap: 6,
          opacity: hovered ? 1 : 0.6, transition: 'opacity 0.3s',
        }}>Ler mais <span style={{ fontSize: 14 }}>→</span></span>
      </div>
    </div>
  )
}

function Blog({ posts }: { posts: BlogPost[] }) {
  const [ref, inView] = useInView()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [featured, ...rest] = posts
  if (!featured) return null
  return (
    <section id="blog" style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)',
      background: COLORS.bgAlt,
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <SectionTitle title="Blog" subtitle="Textos & Reflexões" />
        <div ref={ref as React.RefObject<HTMLDivElement | null>} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <BlogCard post={featured} featured inView={inView} delay={0.1} onClick={() => setSelectedPost(featured)} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {rest.map((post, i) => (
              <BlogCard key={post.slug} post={post} inView={inView} delay={0.2 + i * 0.1} onClick={() => setSelectedPost(post)} />
            ))}
          </div>
        </div>
      </div>
      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </section>
  )
}

function Contato() {
  const [ref, inView] = useInView()
  const contacts: ContactItem[] = [
    { icon: '✉️', label: 'E-mail', value: 'gestacaoproducao@gmail.com', href: 'mailto:gestacaoproducao@gmail.com' },
    { icon: '📱', label: 'WhatsApp', value: '+55 66 99244-3090', href: 'https://wa.me/5566992443090' },
    { icon: '📸', label: 'Instagram', value: '@coletivogestacao', href: 'https://instagram.com/coletivogestacao' },
  ]
  return (
    <section id="contato" style={{
      padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)',
      background: COLORS.bg, position: 'relative',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <SectionTitle title="Contato" subtitle="Fale Conosco" />
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.gray,
          textAlign: 'center', lineHeight: 1.7, marginTop: -30, marginBottom: 50,
        }}>
          Quer levar <em style={{ color: COLORS.cream }}>Gestação de Cam</em> para seu festival, teatro ou espaço cultural? Entre em contato!
        </p>
        <div ref={ref as React.RefObject<HTMLDivElement | null>} style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20,
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          {contacts.map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{
              textDecoration: 'none',
              background: COLORS.bgAlt, border: `1px solid ${COLORS.grayDark}`,
              padding: 28, textAlign: 'center', transition: 'all 0.3s', display: 'block',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: COLORS.gold }}>{c.label}</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.cream, margin: '8px 0 0' }}>{c.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '40px clamp(20px, 4vw, 60px)',
      background: COLORS.bg, borderTop: `1px solid ${COLORS.grayDark}`,
    }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
        alignItems: 'center', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AdinkraSymbol size={24} color={COLORS.gold} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: COLORS.cream, fontWeight: 600 }}>Coletivo Gestação</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.gray, margin: 0 }}>
          © 2025 Coletivo Gestação — Rondonópolis, MT
        </p>
      </div>
    </footer>
  )
}

export default function HomePage({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState('home')

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setActive(id) }
  }

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && (SECTIONS as readonly string[]).includes(hash)) {
      setTimeout(() => scrollTo(hash), 100)
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s)
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(s)
          break
        }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div style={{ background: COLORS.bg, color: COLORS.white, minHeight: '100vh' }}>
      <Nav active={active} onNav={scrollTo} />
      <Home onNav={scrollTo} />
      <Coletivo />
      <Imprensa />
      <Blog posts={posts} />
      <Contato />
      <Footer />
    </div>
  )
}
