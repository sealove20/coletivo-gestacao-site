import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0A0A0A",
  bgAlt: "#111111",
  gold: "#D4930D",
  goldLight: "#E8A825",
  goldDark: "#B87A0A",
  cream: "#F5E6C8",
  white: "#FAFAFA",
  gray: "#888888",
  grayDark: "#333333",
};

const SECTIONS = ["home", "coletivo", "espetaculo", "premios", "imprensa", "blog", "contato"];

// Adinkra-inspired decorative SVG
const AdinkraSymbol = ({ size = 40, color = COLORS.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={style}>
    <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1.5" />
    <circle cx="30" cy="30" r="6" fill={color} />
    <circle cx="30" cy="12" r="3" fill={color} />
    <circle cx="30" cy="48" r="3" fill={color} />
    <circle cx="12" cy="30" r="3" fill={color} />
    <circle cx="48" cy="30" r="3" fill={color} />
  </svg>
);

const StarDecor = ({ size = 16, color = COLORS.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
  </svg>
);

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Navigation
function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const labels = { home: "Home", coletivo: "O Coletivo", espetaculo: "Gestação de Cam", premios: "Prêmios", imprensa: "Imprensa", blog: "Blog", contato: "Contato" };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.grayDark}` : "none",
      transition: "all 0.5s ease", padding: "0 clamp(20px, 4vw, 60px)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => onNav("home")}>
          <AdinkraSymbol size={32} color={COLORS.gold} />
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: COLORS.cream, fontWeight: 700, letterSpacing: 1 }}>
            COLETIVO GESTAÇÃO
          </span>
        </div>
        {/* Desktop menu */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}
          className="desktop-nav">
          {SECTIONS.map(s => (
            <button key={s} onClick={() => onNav(s)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 1.5,
              textTransform: "uppercase",
              color: active === s ? COLORS.gold : COLORS.gray,
              borderBottom: active === s ? `2px solid ${COLORS.gold}` : "2px solid transparent",
              paddingBottom: 4, transition: "all 0.3s",
            }}>
              {labels[s]}
            </button>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          flexDirection: "column", gap: 5, padding: 8,
        }} className="mobile-hamburger">
          <span style={{ width: 24, height: 2, background: COLORS.cream, display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: 24, height: 2, background: COLORS.cream, display: "block", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 24, height: 2, background: COLORS.cream, display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: 70, left: 0, right: 0, background: "rgba(10,10,10,0.98)",
          padding: "20px 30px", display: "flex", flexDirection: "column", gap: 16,
          borderBottom: `1px solid ${COLORS.grayDark}`,
        }}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => { onNav(s); setMenuOpen(false); }} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, letterSpacing: 1.5,
              textTransform: "uppercase",
              color: active === s ? COLORS.gold : COLORS.cream,
            }}>
              {labels[s]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// Section Title
function SectionTitle({ title, subtitle, align = "center" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      textAlign: align, marginBottom: 50,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: align === "center" ? "center" : "flex-start", gap: 16, marginBottom: 12 }}>
        <StarDecor size={14} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: COLORS.gold }}>
          {subtitle}
        </span>
        <StarDecor size={14} />
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 48px)",
        color: COLORS.cream, fontWeight: 700, lineHeight: 1.15, margin: 0,
      }}>
        {title}
      </h2>
    </div>
  );
}

// HOME Section
function Home({ onNav }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", position: "relative",
      overflow: "hidden", textAlign: "center",
      background: `linear-gradient(170deg, ${COLORS.bg} 0%, #1a1008 50%, ${COLORS.bg} 100%)`,
    }}>
      {/* Decorative grain overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      {/* Decorative circles */}
      <div style={{
        position: "absolute", top: "10%", left: "5%",
        width: 300, height: 300, borderRadius: "50%",
        border: `1px solid ${COLORS.gold}22`,
        opacity: loaded ? 0.3 : 0, transition: "opacity 2s ease 0.5s",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "8%",
        width: 200, height: 200, borderRadius: "50%",
        border: `1px solid ${COLORS.gold}22`,
        opacity: loaded ? 0.3 : 0, transition: "opacity 2s ease 0.8s",
      }} />
      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, padding: "0 20px",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{ marginBottom: 30 }}>
          <AdinkraSymbol size={60} color={COLORS.gold} />
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 20,
          opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.3s",
        }}>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.gold})` }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 5,
            textTransform: "uppercase", color: COLORS.gold,
          }}>
            Coletivo Afroperspectivista de Teatro
          </span>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${COLORS.gold}, transparent)` }} />
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(48px, 10vw, 100px)", fontWeight: 700,
          color: COLORS.cream, lineHeight: 1, margin: "0 0 8px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}>
          Coletivo
        </h1>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(48px, 10vw, 100px)", fontWeight: 700,
          fontStyle: "italic",
          background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight}, ${COLORS.cream})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1, margin: "0 0 30px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
        }}>
          Gestação
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 2vw, 20px)",
          color: COLORS.gray, maxWidth: 550, margin: "0 auto 40px", lineHeight: 1.7,
          opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.8s",
        }}>
          Teatro negro. Memória. Ancestralidade.
          <br />
          <span style={{ fontSize: "0.85em" }}>Rondonópolis, Mato Grosso</span>
        </p>
        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1s",
        }}>
          <button onClick={() => onNav("espetaculo")} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 2,
            textTransform: "uppercase", padding: "16px 36px",
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`,
            color: COLORS.bg, border: "none", cursor: "pointer",
            fontWeight: 600, transition: "all 0.3s",
          }}>
            Conheça o Espetáculo
          </button>
          <button onClick={() => onNav("contato")} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 2,
            textTransform: "uppercase", padding: "16px 36px",
            background: "transparent",
            color: COLORS.cream, border: `1px solid ${COLORS.grayDark}`,
            cursor: "pointer", fontWeight: 500, transition: "all 0.3s",
          }}>
            Contato
          </button>
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.5 : 0, transition: "opacity 1s ease 1.5s",
        animation: "float 2s ease-in-out infinite",
      }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: COLORS.gray }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 30, background: `linear-gradient(${COLORS.gray}, transparent)` }} />
      </div>
    </section>
  );
}

// COLETIVO Section
function Coletivo() {
  const [ref, inView] = useInView();
  const cast = [
    { name: "Camila Zenzele Pinho", role: "Dramaturga, Atriz, Produtora", desc: "Psicóloga e Mestre em Educação. Criadora e idealizadora do Coletivo Gestação." },
    { name: "Larissa Fernanda de Andrade", role: "Atriz e Performer", desc: "Integrante do elenco de Gestação de Cam." },
    { name: "Sara Alves Timótheo", role: "Atriz e Performer", desc: "Integrante do elenco de Gestação de Cam." },
    { name: "Alice Lucas", role: "Atriz Convidada", desc: "Participação especial no espetáculo." },
  ];
  return (
    <section id="coletivo" style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)",
      background: COLORS.bg, position: "relative",
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTitle title="O Coletivo" subtitle="Quem Somos" />
        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "1fr", gap: 40,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.2s",
        }}>
          {/* About text */}
          <div style={{
            background: COLORS.bgAlt, border: `1px solid ${COLORS.grayDark}`,
            padding: "clamp(30px, 4vw, 50px)", position: "relative",
          }}>
            <AdinkraSymbol size={48} color={`${COLORS.gold}33`} style={{ position: "absolute", top: -24, right: 30 }} />
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 24px)",
              color: COLORS.cream, lineHeight: 1.7, margin: "0 0 24px", fontStyle: "italic",
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
          {/* Cast */}
          <div>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 3,
              textTransform: "uppercase", color: COLORS.gold, marginBottom: 24,
            }}>Elenco & Equipe</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {cast.map((p, i) => (
                <div key={i} style={{
                  padding: 24, border: `1px solid ${COLORS.grayDark}`,
                  background: `${COLORS.bgAlt}88`, transition: "all 0.3s",
                  opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${0.3 + i * 0.1}s`,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.gold}44, ${COLORS.goldDark}22)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16, fontFamily: "'Playfair Display', serif",
                    fontSize: 18, color: COLORS.gold, fontWeight: 700,
                  }}>
                    {p.name.charAt(0)}
                  </div>
                  <h4 style={{
                    fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17,
                    color: COLORS.cream, margin: "0 0 6px", fontWeight: 600,
                  }}>{p.name}</h4>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 1,
                    textTransform: "uppercase", color: COLORS.gold, margin: "0 0 10px",
                  }}>{p.role}</p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    color: COLORS.gray, lineHeight: 1.6, margin: 0,
                  }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Technical team */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 24,
            padding: "24px 0", borderTop: `1px solid ${COLORS.grayDark}`,
          }}>
            {[
              { name: "Ricardo Almeida", roles: "Figurino · Maquiagem · Iluminação" },
              { name: "Nega Lu", roles: "Composição Musical Original" },
              { name: "Moisés Ferreira", roles: "Percussão" },
            ].map((t, i) => (
              <div key={i} style={{ flex: "1 1 200px" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: COLORS.cream, margin: "0 0 4px" }}>{t.name}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: COLORS.gray, margin: 0 }}>{t.roles}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ESPETÁCULO Section
function Espetaculo() {
  const [ref, inView] = useInView();
  return (
    <section id="espetaculo" style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)",
      background: `linear-gradient(180deg, ${COLORS.bgAlt} 0%, ${COLORS.bg} 100%)`,
      position: "relative",
    }}>
      {/* Decorative side line */}
      <div style={{
        position: "absolute", left: "clamp(20px, 4vw, 60px)", top: 120, bottom: 120,
        width: 1, background: `linear-gradient(${COLORS.gold}00, ${COLORS.gold}33, ${COLORS.gold}00)`,
      }} />
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTitle title="Gestação de Cam" subtitle="Espetáculo" />
        <div ref={ref}>
          {/* Hero image placeholder */}
          <div style={{
            width: "100%", height: "clamp(250px, 40vw, 450px)",
            background: `linear-gradient(135deg, #1a1008, #2a1a0c, #1a1008)`,
            border: `1px solid ${COLORS.grayDark}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 50, position: "relative", overflow: "hidden",
            opacity: inView ? 1 : 0, transition: "opacity 1s ease",
          }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${COLORS.gold}11 0%, transparent 70%)` }} />
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <AdinkraSymbol size={50} color={`${COLORS.gold}55`} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.gray, marginTop: 16, letterSpacing: 2 }}>
                [ FOTO DE CENA DO ESPETÁCULO ]
              </p>
            </div>
          </div>
          {/* Synopsis */}
          <div style={{
            maxWidth: 800, margin: "0 auto 50px",
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.3s",
          }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 3,
              textTransform: "uppercase", color: COLORS.gold, marginBottom: 20,
            }}>Sinopse</h3>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(16px, 2vw, 20px)", color: COLORS.cream,
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
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 1, background: COLORS.grayDark,
            border: `1px solid ${COLORS.grayDark}`,
            opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 0.5s",
          }}>
            {/* Ficha Técnica */}
            <div style={{ background: COLORS.bg, padding: "clamp(24px, 3vw, 36px)" }}>
              <h4 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3,
                textTransform: "uppercase", color: COLORS.gold, marginBottom: 20, marginTop: 0,
              }}>Ficha Técnica</h4>
              {[
                ["Direção", "Coletiva"],
                ["Dramaturgia", "Camila Zenzele Pinho"],
                ["Elenco", "Camila Zenzele Pinho, Larissa Fernanda de Andrade, Sara Alves Timótheo"],
                ["Atriz Convidada", "Alice Lucas"],
                ["Trilha Sonora", "Nega Lu"],
                ["Percussão", "Moisés Ferreira"],
                ["Figurino / Iluminação", "Ricardo Almeida"],
              ].map(([label, value], i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.gray, textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.cream, margin: "2px 0 0" }}>{value}</p>
                </div>
              ))}
            </div>
            {/* Info para contratantes */}
            <div style={{ background: COLORS.bg, padding: "clamp(24px, 3vw, 36px)" }}>
              <h4 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3,
                textTransform: "uppercase", color: COLORS.gold, marginBottom: 20, marginTop: 0,
              }}>Informações Técnicas</h4>
              {[
                ["Duração", "50 minutos"],
                ["Classificação", "12+"],
                ["Montagem", "3 horas"],
                ["Idioma", "Português"],
                ["Campo Artístico", "Teatro / Performance / Música"],
                ["Tipo", "Ensemble"],
              ].map(([label, value], i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "12px 0",
                  borderBottom: i < 5 ? `1px solid ${COLORS.grayDark}` : "none",
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.gray }}>{label}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.cream, fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Photo gallery placeholder */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 8, marginTop: 50,
            opacity: inView ? 1 : 0, transition: "opacity 1s ease 0.7s",
          }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                aspectRatio: i === 1 ? "4/5" : i === 2 ? "1/1" : "3/4",
                background: `linear-gradient(${135 + i * 30}deg, #1a1008, #2a1a0c)`,
                border: `1px solid ${COLORS.grayDark}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.gray, letterSpacing: 1 }}>FOTO {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// PRÊMIOS Section
function Premios() {
  const [ref, inView] = useInView();
  const awards = [
    "Melhor Espetáculo — Categoria Regional",
    "Destaque em Atriz / Performer",
    "Destaque em Trilha Sonora e Composição Original",
    "Destaque em Dramaturgia",
    "Destaque em Direção",
    "Prêmio Especial do Júri — Teatro Negro e Dramaturgia Afro-Brasileira em MT",
  ];
  const festivals = [
    { year: "2025", name: "2° Festival Rainha Terê" },
    { year: "2023", name: "25° Festival Satyrianas — São Paulo" },
    { year: "2023", name: "1° Festival Luis Carlos Ribeiro" },
    { year: "2022", name: "17° Festival Velha Joana" },
    { year: "2022", name: "1° Festival de Teatro de Rondonópolis" },
    { year: "2022", name: "SESC Rondonópolis — Lei Aldir Blanc" },
    { year: "2022", name: "Casa das Pretas — Cuiabá" },
    { year: "2022", name: "Espaço Cultural Cafuá — Chapada dos Guimarães" },
    { year: "2022", name: "Beco Cultural — Rondonópolis" },
  ];
  return (
    <section id="premios" style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)",
      background: COLORS.bg,
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTitle title="Prêmios & Festivais" subtitle="Trajetória" />
        <div ref={ref}>
          {/* Awards highlight */}
          <div style={{
            background: `linear-gradient(135deg, #1a1008, ${COLORS.bgAlt})`,
            border: `1px solid ${COLORS.gold}33`,
            padding: "clamp(30px, 4vw, 50px)", marginBottom: 50,
            position: "relative", overflow: "hidden",
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.2s",
          }}>
            <div style={{ position: "absolute", top: -30, right: -30, opacity: 0.08 }}>
              <AdinkraSymbol size={150} color={COLORS.gold} />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 3,
                textTransform: "uppercase", color: COLORS.gold, marginBottom: 8,
              }}>
                XV Festival Velha Joana · 2022
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 3vw, 30px)",
                color: COLORS.cream, margin: "0 0 24px", fontWeight: 700,
              }}>
                6 Prêmios e Destaques
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
                {awards.map((a, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)",
                    transition: `all 0.5s ease ${0.3 + i * 0.08}s`,
                  }}>
                    <StarDecor size={10} color={COLORS.gold} style={{ marginTop: 5, flexShrink: 0 }} />
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                      color: COLORS.cream, lineHeight: 1.5,
                    }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Festival timeline */}
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 3,
            textTransform: "uppercase", color: COLORS.gold, marginBottom: 24,
          }}>Histórico de Apresentações</h3>
          <div>
            {festivals.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "baseline", gap: 20,
                padding: "16px 0",
                borderBottom: `1px solid ${COLORS.grayDark}`,
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.5s ease ${0.4 + i * 0.06}s`,
              }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 20,
                  color: COLORS.gold, fontWeight: 700, minWidth: 55,
                }}>{f.year}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                  color: COLORS.cream,
                }}>{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// IMPRENSA Section
function Imprensa() {
  const [ref, inView] = useInView();
  return (
    <section id="imprensa" style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)",
      background: COLORS.bgAlt,
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTitle title="Imprensa" subtitle="Na Mídia" />
        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20,
        }}>
          {/* Crítica */}
          <div style={{
            background: COLORS.bg, border: `1px solid ${COLORS.grayDark}`,
            padding: "clamp(28px, 3vw, 40px)", position: "relative",
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.2s",
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 60, color: COLORS.gold,
              lineHeight: 1, position: "absolute", top: 20, left: 28, opacity: 0.3,
            }}>"</div>
            <div style={{ paddingTop: 30 }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 2,
                textTransform: "uppercase", color: COLORS.gold,
              }}>Crítica · Festival Satyrianas 2023</span>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: 17,
                color: COLORS.cream, lineHeight: 1.7, margin: "16px 0", fontStyle: "italic",
              }}>
                "Gestação de Cam é uma construção abundante, pujante e necessária da memória-território de mulheres negras e do firmamento e importância de suas existências."
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.gray, margin: 0 }}>
                — Tiago Horbatow, Deus Ateu
              </p>
            </div>
          </div>
          {/* Matérias */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 16,
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.4s",
          }}>
            {[
              { source: "Notícia em Foco MT", title: "Gestação de CAM estreia nesta quarta, espetáculo contemplado na Lei Aldir Blanc", year: "2021" },
              { source: "Agora MT", title: "Espetáculo 'Gestação de Cam' estreia em formato online", year: "2021" },
            ].map((m, i) => (
              <div key={i} style={{
                background: COLORS.bg, border: `1px solid ${COLORS.grayDark}`,
                padding: 24, cursor: "pointer", transition: "all 0.3s",
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 2,
                  textTransform: "uppercase", color: COLORS.gold,
                }}>{m.source} · {m.year}</span>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                  color: COLORS.cream, lineHeight: 1.5, margin: "10px 0 0",
                }}>{m.title}</p>
              </div>
            ))}
            {/* Download release */}
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.gold}15, ${COLORS.gold}08)`,
              border: `1px solid ${COLORS.gold}33`,
              padding: 24, display: "flex", alignItems: "center", gap: 16,
              cursor: "pointer",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: `${COLORS.gold}22`, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>📄</div>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.cream, margin: "0 0 4px", fontWeight: 600 }}>
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
  );
}

// BLOG Section
const BLOG_POSTS = [
  {
    id: 1,
    category: "Reflexão",
    tag: "Dramaturgia",
    title: "A Memória Como Resistência: Reflexões sobre Gestação de Cam",
    excerpt: "Em Gestação de Cam, a memória não é apenas recordação — é ato político. Três mulheres que despertam sem nome carregam no corpo a história de todas as que vieram antes. Este texto explora como a dramaturgia converte o esquecimento imposto em semente de recriação.",
    author: "Camila Zenzele Pinho",
    date: "Fevereiro 2025",
    readTime: "6 min",
  },
  {
    id: 2,
    category: "Pensamento",
    tag: "Teoria",
    title: "Afroperspectivismo no Teatro: O que é e por que importa",
    excerpt: "O termo afroperspectividade surge da filosofia de Renato Noguera e propõe um giro epistêmico: colocar as perspectivas africanas e afro-diaspóricas no centro, não como exotismo, mas como método. Entenda como o Coletivo Gestação aplica esse conceito à cena.",
    author: "Camila Zenzele Pinho",
    date: "Outubro 2024",
    readTime: "8 min",
  },
  {
    id: 3,
    category: "Bastidores",
    tag: "Festival",
    title: "Festival Satyrianas 2023: Nossa Experiência em São Paulo",
    excerpt: "Levar Gestação de Cam a um dos maiores festivais universitários de teatro do Brasil foi uma prova de fé coletiva. Aqui contamos os desafios da viagem, o encontro com outros grupos negros e o que voltou diferente em cada uma de nós.",
    author: "Larissa Fernanda de Andrade",
    date: "Novembro 2023",
    readTime: "5 min",
  },
  {
    id: 4,
    category: "Ancestralidade",
    tag: "Pesquisa",
    title: "Cam e a Mitologia: A Maldição Reinterpretada",
    excerpt: "A figura bíblica de Cam foi usada por séculos para justificar a escravidão. Nossa dramaturgia se recusa a aceitar essa narrativa. Aqui detalhamos o processo de reescrita mítica que dá origem ao espetáculo.",
    author: "Camila Zenzele Pinho",
    date: "Março 2023",
    readTime: "10 min",
  },
  {
    id: 5,
    category: "Processo Criativo",
    tag: "Música",
    title: "Música Como Medicina: A Trilha Sonora de Nega Lu",
    excerpt: "As canções compostas por Nega Lu para Gestação de Cam não são ornamento — são estrutura dramatúrgica. Cada tema musical corresponde a um estágio da jornada das personagens e carrega em si uma intenção de cura.",
    author: "Sara Alves Timótheo",
    date: "Janeiro 2023",
    readTime: "7 min",
  },
];

function BlogCard({ post, featured = false, inView, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.bg,
        border: `1px solid ${hovered ? COLORS.gold + "55" : COLORS.grayDark}`,
        padding: featured ? "clamp(28px, 3vw, 44px)" : 28,
        display: "flex", flexDirection: "column", gap: 16,
        cursor: "pointer", transition: "border-color 0.3s, transform 0.3s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}s`,
        transitionProperty: "opacity, transform, border-color",
        transitionDuration: "0.6s, 0.3s, 0.3s",
      }}
    >
      {/* Tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 2,
          textTransform: "uppercase", color: COLORS.gold,
        }}>{post.category}</span>
        <span style={{ width: 20, height: 1, background: COLORS.grayDark }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 1,
          textTransform: "uppercase", color: COLORS.gray,
        }}>{post.tag}</span>
      </div>
      {/* Title */}
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: featured ? "clamp(22px, 2.5vw, 28px)" : "clamp(16px, 2vw, 19px)",
        color: COLORS.cream, fontWeight: 700, lineHeight: 1.3, margin: 0,
      }}>
        {post.title}
      </h3>
      {/* Excerpt */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: featured ? 15 : 13,
        color: COLORS.gray, lineHeight: 1.75, margin: 0, flexGrow: 1,
      }}>
        {post.excerpt}
      </p>
      {/* Footer */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 16, borderTop: `1px solid ${COLORS.grayDark}`,
        flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: COLORS.cream }}>{post.author}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.gray }}>{post.date} · {post.readTime} de leitura</span>
        </div>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 1.5,
          textTransform: "uppercase", color: COLORS.gold,
          display: "flex", alignItems: "center", gap: 6,
          opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s",
        }}>
          Ler mais <span style={{ fontSize: 14 }}>→</span>
        </span>
      </div>
    </div>
  );
}

function Blog() {
  const [ref, inView] = useInView();
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <section id="blog" style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)",
      background: COLORS.bgAlt,
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTitle title="Blog" subtitle="Textos & Reflexões" />
        <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Featured post */}
          <BlogCard post={featured} featured inView={inView} delay={0.1} />
          {/* Grid of remaining posts */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {rest.map((post, i) => (
              <BlogCard key={post.id} post={post} inView={inView} delay={0.2 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CONTATO Section
function Contato() {
  const [ref, inView] = useInView();
  return (
    <section id="contato" style={{
      padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)",
      background: COLORS.bg, position: "relative",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionTitle title="Contato" subtitle="Fale Conosco" />
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: COLORS.gray,
          textAlign: "center", lineHeight: 1.7, marginTop: -30, marginBottom: 50,
        }}>
          Quer levar <em style={{ color: COLORS.cream }}>Gestação de Cam</em> para seu festival, teatro ou espaço cultural? Entre em contato!
        </p>
        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.2s",
        }}>
          {[
            { icon: "✉️", label: "E-mail", value: "gestacaoproducao@gmail.com", href: "mailto:gestacaoproducao@gmail.com" },
            { icon: "📱", label: "WhatsApp", value: "+55 66 99244-3090", href: "https://wa.me/5566992443090" },
            { icon: "📸", label: "Instagram", value: "@coletivogestacao", href: "https://instagram.com/coletivogestacao" },
          ].map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{
              textDecoration: "none",
              background: COLORS.bgAlt, border: `1px solid ${COLORS.grayDark}`,
              padding: 28, textAlign: "center", transition: "all 0.3s",
              display: "block",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 2,
                textTransform: "uppercase", color: COLORS.gold,
              }}>{c.label}</span>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                color: COLORS.cream, margin: "8px 0 0",
              }}>{c.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{
      padding: "40px clamp(20px, 4vw, 60px)",
      background: COLORS.bg, borderTop: `1px solid ${COLORS.grayDark}`,
    }}>
      <div style={{
        maxWidth: 1000, margin: "0 auto",
        display: "flex", flexWrap: "wrap", justifyContent: "space-between",
        alignItems: "center", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AdinkraSymbol size={24} color={COLORS.gold} />
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: 14,
            color: COLORS.cream, fontWeight: 600,
          }}>Coletivo Gestação</span>
        </div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 12,
          color: COLORS.gray, margin: 0,
        }}>
          © 2025 Coletivo Gestação — Rondonópolis, MT
        </p>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  const [active, setActive] = useState("home");
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActive(id);
    }
  };
  useEffect(() => {
    const handler = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: COLORS.bg, color: COLORS.white, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: ${COLORS.gold}44; color: ${COLORS.cream}; }
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-hamburger { display: none !important; }
        }
        a:hover { opacity: 0.85; }
        button:hover { opacity: 0.9; }
      `}</style>
      <Nav active={active} onNav={scrollTo} />
      <Home onNav={scrollTo} />
      <Coletivo />
      <Espetaculo />
      <Premios />
      <Imprensa />
      <Blog />
      <Contato />
      <Footer />
    </div>
  );
}
