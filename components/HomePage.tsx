'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { COLORS, SECTIONS } from '@/lib/constants'
import { useInView, AdinkraSymbol, StarDecor, SectionTitle } from '@/components/Shared'
import Nav from '@/components/Nav'

interface BlogPost {
  id: number
  category: string
  tag: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  content: string[]
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

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: 'Reflexão',
    tag: 'Dramaturgia',
    title: 'A Memória Como Resistência: Reflexões sobre Gestação de Cam',
    excerpt: 'Em Gestação de Cam, a memória não é apenas recordação — é ato político. Três mulheres que despertam sem nome carregam no corpo a história de todas as que vieram antes. Este texto explora como a dramaturgia converte o esquecimento imposto em semente de recriação.',
    author: 'Camila Zenzele Pinho',
    date: 'Fevereiro 2025',
    readTime: '6 min',
    content: [
      'Quando três mulheres despertam sem saber seus nomes, a primeira reação do público costuma ser a estranheza. Mas há algo de profundamente familiar nesse estado — porque o esquecimento forçado é uma das ferramentas mais antigas do apagamento cultural. Em Gestação de Cam, esse esquecimento não é um ponto de partida dramático qualquer: é a síntese de séculos de violência epistêmica contra povos negros.',
      'A dramaturgia que construímos coletivamente parte de uma pergunta simples: o que resta quando tiram de você o seu nome? A resposta que encontramos no processo de criação foi surpreendente — resta o corpo. Resta o ritmo. Resta a voz que, mesmo sem saber o que diz, sabe como cantar. A memória corporal, aquela que a colonização não conseguiu apagar completamente, é o fio condutor de toda a peça.',
      'Cada cena foi construída a partir de práticas de pesquisa em afroperspectividades, teoria que propõe colocar as epistemologias africanas e afro-diaspóricas no centro da produção de conhecimento. Isso significa que não adaptamos mitos europeus para "incluir" personagens negras — criamos a partir de dentro, com as ferramentas que nossa própria tradição nos oferece: o canto como invocação, o corpo como arquivo, a floresta como território sagrado.',
      'A resistência, aqui, não é grito. É germinação. As personagens não lutam contra uma força externa visível — elas buscam dentro de si aquilo que sempre esteve lá. E quando encontram, não apenas recuperam um nome: constroem um futuro diferente para a criança que nasce entre elas. Esse movimento — do esquecimento para a memória, da maldição para a proteção — é, em essência, o que entendemos por resistência cultural.',
    ],
  },
  {
    id: 2,
    category: 'Pensamento',
    tag: 'Teoria',
    title: 'Afroperspectivismo no Teatro: O que é e por que importa',
    excerpt: 'O termo afroperspectividade surge da filosofia de Renato Noguera e propõe um giro epistêmico: colocar as perspectivas africanas e afro-diaspóricas no centro, não como exotismo, mas como método. Entenda como o Coletivo Gestação aplica esse conceito à cena.',
    author: 'Camila Zenzele Pinho',
    date: 'Outubro 2024',
    readTime: '8 min',
    content: [
      'Quando falamos em afroperspectividade, não estamos falando de um estilo estético ou de uma temática específica. Estamos falando de um método — uma forma de produzir conhecimento que parte de referenciais filosóficos africanos e afro-diaspóricos como centro, e não como margem ou complemento. O conceito foi desenvolvido pelo filósofo Renato Noguera e tem se mostrado uma ferramenta poderosa para repensar não apenas o que fazemos, mas como fazemos.',
      'No teatro, isso se traduz em algumas perguntas fundamentais: Quem fala? De onde fala? Para quem? Com quais ferramentas simbólicas? Um teatro afroperspectivista não é simplesmente um teatro "sobre negros" — é um teatro que opera a partir de lógicas cosmológicas, filosóficas e estéticas nascidas em terras africanas e reelaboradas na diáspora. A diferença é enorme.',
      'No Coletivo Gestação, essa perspectiva se manifesta na estrutura dramatúrgica: o tempo circular em vez de linear, a presença de divindades não como metáfora mas como agentes da narrativa, o corpo coletivo que pulsa junto antes de se individualizar, a música como dramaturgia e não como ilustração. Não adaptamos o modelo do teatro ocidental para "incluir" elementos afro — partimos de outro lugar.',
      'Isso não significa exclusão. Significa que quando o espetáculo chega a um palco universitário em São Paulo ou a um festival em Rondonópolis, ele não pede licença para existir nem traduz a si mesmo para uma suposta "linguagem universal". Ele propõe ao público que se mova em direção a ele — e a resposta, em todos os contextos, tem sido de encontro genuíno.',
    ],
  },
  {
    id: 3,
    category: 'Bastidores',
    tag: 'Festival',
    title: 'Festival Satyrianas 2023: Nossa Experiência em São Paulo',
    excerpt: 'Levar Gestação de Cam a um dos maiores festivais universitários de teatro do Brasil foi uma prova de fé coletiva. Aqui contamos os desafios da viagem, o encontro com outros grupos negros e o que voltou diferente em cada uma de nós.',
    author: 'Larissa Fernanda de Andrade',
    date: 'Novembro 2023',
    readTime: '5 min',
    content: [
      'A convocatória chegou em um momento em que o coletivo estava em pleno processo de revisão do espetáculo. Inscrever Gestação de Cam no Festival Satyrianas parecia, ao mesmo tempo, um salto necessário e um risco enorme. Éramos um grupo de Rondonópolis, cidade do interior de Mato Grosso, indo ao encontro de grupos teatrais de todo o Brasil — muitos deles com anos de trajetória em grandes centros.',
      'A viagem de ônibus foi longa. Dividimos os custos, arrumamos mala com figurino e adereços, e partimos com a certeza de que o espetáculo carregava algo verdadeiro. A recepção no festival nos surpreendeu desde o primeiro dia: outros grupos negros nos procuraram para conversar sobre processo, sobre as escolhas estéticas, sobre afroperspectividade. Havia um reconhecimento mútuo que ultrapassava o elogio.',
      'A apresentação aconteceu em um espaço pequeno, com capacidade para cerca de oitenta pessoas. Estava lotado. O silêncio durante o espetáculo foi diferente dos silêncios que conhecíamos — mais denso, mais atento. E o encontro depois, com a plateia ainda presente no espaço, foi onde a peça de fato se completou.',
      'O que voltou diferente em cada uma de nós é difícil de nomear com precisão. Talvez seja a certeza de que o que fazemos não é local no sentido limitante da palavra — é local no sentido de que nasce de um lugar específico, de uma experiência específica, e é exatamente por isso que ressoa em qualquer outro lugar.',
    ],
  },
  {
    id: 4,
    category: 'Ancestralidade',
    tag: 'Pesquisa',
    title: 'Cam e a Mitologia: A Maldição Reinterpretada',
    excerpt: 'A figura bíblica de Cam foi usada por séculos para justificar a escravidão. Nossa dramaturgia se recusa a aceitar essa narrativa. Aqui detalhamos o processo de reescrita mítica que dá origem ao espetáculo.',
    author: 'Camila Zenzele Pinho',
    date: 'Março 2023',
    readTime: '10 min',
    content: [
      'A chamada "Maldição de Cam" é um dos exemplos mais devastadores de como a interpretação religiosa pode ser instrumentalizada para fins políticos. A passagem do Gênesis em que Noé amaldiçoa Canaã, filho de Cam, foi reinterpretada ao longo dos séculos como justificativa teológica para a escravidão dos povos africanos. Cam teria sido o "pai dos negros" e, portanto, toda a sua descendência estaria condenada à servidão.',
      'Quando me deparei com essa interpretação durante minha pesquisa de mestrado, a reação foi imediata: recusar. Não como negação ingênua, mas como ato dramaturgo consciente. Se essa narrativa foi construída, pode ser desconstruída. Se foi usada para apagar, pode ser reescrita para iluminar.',
      'O processo de pesquisa envolveu mergulhar em cosmologias africanas, em especial nas tradições yorubá e banto, buscando figuras femininas de proteção e memória. Encontramos nas yabás — orixás femininos — uma galeria de mulheres que carregam em si contradições, poderes e histórias muito mais ricas do que qualquer maldição bíblica poderia conter. Cam, em nossa dramaturgia, não é amaldiçoada: é uma mulher que teve seu nome roubado e que parte em busca dele.',
      'A reescrita não apaga o peso histórico da maldição original — ela o carrega e o transforma. As três mulheres que compartilham o nome Cam não fogem da ferida: elas a atravessam. E ao atravessá-la, encontram não apenas seus nomes, mas a capacidade de nomear a criança que nasce — de garantir que ela não herde o esquecimento, mas a memória.',
    ],
  },
  {
    id: 5,
    category: 'Processo Criativo',
    tag: 'Música',
    title: 'Música Como Medicina: A Trilha Sonora de Nega Lu',
    excerpt: 'As canções compostas por Nega Lu para Gestação de Cam não são ornamento — são estrutura dramatúrgica. Cada tema musical corresponde a um estágio da jornada das personagens e carrega em si uma intenção de cura.',
    author: 'Sara Alves Timótheo',
    date: 'Janeiro 2023',
    readTime: '7 min',
    content: [
      'Antes de existirem palavras para descrever o que queríamos fazer em cena, existia som. Nas primeiras sessões de criação do espetáculo, muito antes de termos um roteiro definido, Nega Lu já trazia melodias que pareciam saber o que a peça iria dizer. Havia algo de oracular nesse processo — a música chegava antes da cena e a cena nascia a partir da música.',
      'Nega Lu trabalha a partir de uma prática que ela mesma chama de "composição medicinal": cada canção é criada com uma intenção específica de cura ou de abertura. Para Gestação de Cam, ela compôs temas que correspondem aos estados emocionais e espirituais das personagens: há uma canção para o estado de esquecimento, quase um lamento sem palavras; há um tema para o momento em que as mulheres se reconhecem entre si; e há o canto final, que é também uma oração.',
      'A percussão de Moisés Ferreira se integra a esse universo não como acompanhamento rítmico, mas como voz própria. Em alguns momentos do espetáculo, o tambor dialoga diretamente com as atrizes — responde, pergunta, confirma. Quem assiste sem saber pode pensar que isso é improvisação; na verdade, é uma partitura muito precisa, desenvolvida ao longo de meses de ensaio.',
      'O que nos surpreende, espetáculo após espetáculo, é ver como a plateia responde à música antes de processar o texto. Crianças que nunca viram teatro, adultos que raramente frequentam espetáculos — todos entram em sincronia com o ritmo antes de entender a história. Isso confirma o que sabemos há muito tempo: o corpo entende o que a mente ainda está tentando traduzir.',
    ],
  },
]

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {post.content.map((paragraph, i) => (
            <p key={i} style={{
              fontFamily: i === 0 ? "'Playfair Display', Georgia, serif" : "'DM Sans', sans-serif",
              fontSize: i === 0 ? 'clamp(16px, 2vw, 19px)' : 15,
              color: i === 0 ? COLORS.cream : COLORS.gray,
              lineHeight: 1.85, margin: 0,
              fontStyle: i === 0 ? 'italic' : 'normal',
            }}>{paragraph}</p>
          ))}
        </div>
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

function Blog() {
  const [ref, inView] = useInView()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [featured, ...rest] = BLOG_POSTS
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
              <BlogCard key={post.id} post={post} inView={inView} delay={0.2 + i * 0.1} onClick={() => setSelectedPost(post)} />
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

export default function HomePage() {
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
      <Blog />
      <Contato />
      <Footer />
    </div>
  )
}
