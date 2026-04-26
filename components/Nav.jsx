'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { COLORS, COLORS_TERE } from '@/lib/constants'
import { AdinkraSymbol } from '@/components/Shared'

export default function Nav({ active, onNav }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileShowsOpen, setMobileShowsOpen] = useState(false)
  const closeTimeoutRef = useRef(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const labels = { home: 'Home', coletivo: 'O Coletivo', imprensa: 'Imprensa', blog: 'Blog', contato: 'Contato' }
  const isEspetaculosActive = pathname.startsWith('/espetaculos')

  const navBtnStyle = (s) => ({
    background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: active === s ? COLORS.gold : COLORS.gray,
    borderBottom: active === s ? `2px solid ${COLORS.gold}` : '2px solid transparent',
    paddingBottom: 4, transition: 'all 0.3s',
  })

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${COLORS.grayDark}` : 'none',
      transition: 'all 0.5s ease', padding: '0 clamp(20px, 4vw, 60px)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => onNav('home')}>
          <AdinkraSymbol size={32} color={COLORS.gold} />
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, color: COLORS.cream, fontWeight: 700, letterSpacing: 1 }}>
            COLETIVO GESTAÇÃO
          </span>
        </div>

        {/* Desktop menu */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="desktop-nav">
          <button style={navBtnStyle('home')} onClick={() => onNav('home')}>Home</button>
          <button style={navBtnStyle('coletivo')} onClick={() => onNav('coletivo')}>O Coletivo</button>

          {/* Espetáculos dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => { clearTimeout(closeTimeoutRef.current); setDropdownOpen(true) }}
            onMouseLeave={() => { closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150) }}>
            <button style={{
              ...navBtnStyle('_espetaculos'),
              color: isEspetaculosActive ? COLORS.gold : COLORS.gray,
              borderBottom: isEspetaculosActive ? `2px solid ${COLORS.gold}` : '2px solid transparent',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              Espetáculos
              <span style={{
                fontSize: 8, display: 'inline-block',
                transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}>▼</span>
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 12px)', left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(10,10,10,0.98)',
                border: `1px solid ${COLORS.grayDark}`,
                backdropFilter: 'blur(12px)',
                minWidth: 220, padding: '8px 0',
                zIndex: 200, animation: 'fadeIn 0.15s ease',
              }}>
                <Link href="/espetaculos/gestacao-de-cam" onClick={() => setDropdownOpen(false)} style={{
                  display: 'flex', flexDirection: 'column', gap: 3,
                  textDecoration: 'none', padding: '12px 20px',
                  color: pathname === '/espetaculos/gestacao-de-cam' ? COLORS.gold : COLORS.cream,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <span style={{ fontSize: 13, letterSpacing: 0.5 }}>Gestação de Cam</span>
                  <span style={{ fontSize: 10, color: COLORS.gray, letterSpacing: 1, textTransform: 'uppercase' }}>Teatro · 2021</span>
                </Link>
                <div style={{ height: 1, background: COLORS.grayDark, margin: '4px 12px' }} />
                <Link href="/espetaculos/rainha-tere" onClick={() => setDropdownOpen(false)} style={{
                  display: 'flex', flexDirection: 'column', gap: 3,
                  textDecoration: 'none', padding: '12px 20px',
                  color: pathname === '/espetaculos/rainha-tere' ? COLORS_TERE.yellow : COLORS.cream,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <span style={{ fontSize: 13, letterSpacing: 0.5 }}>Festival Rainha Terê</span>
                  <span style={{ fontSize: 10, color: COLORS.gray, letterSpacing: 1, textTransform: 'uppercase' }}>Festival · 2024–2025</span>
                </Link>
              </div>
            )}
          </div>

          <button style={navBtnStyle('imprensa')} onClick={() => onNav('imprensa')}>Imprensa</button>
          <button style={navBtnStyle('blog')} onClick={() => onNav('blog')}>Blog</button>
          <button style={navBtnStyle('contato')} onClick={() => onNav('contato')}>Contato</button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
          flexDirection: 'column', gap: 5, padding: 8,
        }} className="mobile-hamburger">
          <span style={{ width: 24, height: 2, background: COLORS.cream, display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ width: 24, height: 2, background: COLORS.cream, display: 'block', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 24, height: 2, background: COLORS.cream, display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 70, left: 0, right: 0, background: 'rgba(10,10,10,0.98)',
          padding: '20px 30px', display: 'flex', flexDirection: 'column', gap: 16,
          borderBottom: `1px solid ${COLORS.grayDark}`, zIndex: 150,
        }}>
          {['home', 'coletivo'].map(s => (
            <button key={s} onClick={() => { onNav(s); setMenuOpen(false) }} style={{
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, letterSpacing: 1.5,
              textTransform: 'uppercase', color: active === s ? COLORS.gold : COLORS.cream,
            }}>{labels[s]}</button>
          ))}
          {/* Mobile Espetáculos accordion */}
          <div>
            <button onClick={() => setMobileShowsOpen(!mobileShowsOpen)} style={{
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: isEspetaculosActive ? COLORS.gold : COLORS.cream,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              Espetáculos <span style={{ fontSize: 10 }}>{mobileShowsOpen ? '▲' : '▼'}</span>
            </button>
            {mobileShowsOpen && (
              <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                <Link href="/espetaculos/gestacao-de-cam" onClick={() => { setMenuOpen(false); setMobileShowsOpen(false) }} style={{
                  textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: pathname === '/espetaculos/gestacao-de-cam' ? COLORS.gold : COLORS.gray,
                }}>→ Gestação de Cam</Link>
                <Link href="/espetaculos/rainha-tere" onClick={() => { setMenuOpen(false); setMobileShowsOpen(false) }} style={{
                  textDecoration: 'none',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  color: pathname === '/espetaculos/rainha-tere' ? COLORS_TERE.yellow : COLORS.gray,
                }}>→ Festival Rainha Terê</Link>
              </div>
            )}
          </div>
          {['imprensa', 'blog', 'contato'].map(s => (
            <button key={s} onClick={() => { onNav(s); setMenuOpen(false) }} style={{
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, letterSpacing: 1.5,
              textTransform: 'uppercase', color: active === s ? COLORS.gold : COLORS.cream,
            }}>{labels[s]}</button>
          ))}
        </div>
      )}
    </nav>
  )
}
