import { useEffect, useState } from 'react'
import { Code2, Menu, Moon, Sun, X } from 'lucide-react'
import { portfolio, type Language } from '../data/portfolio'

interface HeaderProps {
  language: Language
  setLanguage: (language: Language) => void
  dark: boolean
  setDark: (dark: boolean) => void
}

export function Header({ language, setLanguage, dark, setDark }: HeaderProps) {
  const copy = portfolio.copy[language]
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      document.getElementById('menu-toggle')?.focus()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const ThemeIcon = dark ? Sun : Moon
  const MenuIcon = menuOpen ? X : Menu
  const themeLabel = dark ? copy.light : copy.dark

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">{copy.skip}</a>
      <div className="shell header-inner">
        <a href="#inicio" className="brand" aria-label={`${portfolio.brand}.${portfolio.domain} · ${copy.home}`} onClick={() => setMenuOpen(false)}>
          <span className="brand-icon"><Code2 size={17} aria-hidden="true" /></span>
          <span>{portfolio.brand}<span className="brand-dot">.</span>{portfolio.domain}</span>
        </a>
        <nav aria-label={copy.navigation} id="main-navigation" className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {portfolio.sections.map(section => (
            <a key={section.id} href={`#${section.id}`} onClick={() => setMenuOpen(false)}>
              {section.label[language]}
            </a>
          ))}
        </nav>
        <div className="nav-controls">
          <div className="languages" role="group" aria-label={copy.language}>
            {(Object.keys(portfolio.languages) as Language[]).map(option => (
              <button key={option} type="button" aria-pressed={language === option} onClick={() => setLanguage(option)}>
                {portfolio.languages[option]}
              </button>
            ))}
          </div>
          <button className="icon-button theme-toggle" type="button" aria-label={themeLabel} title={themeLabel} onClick={() => setDark(!dark)}>
            <ThemeIcon size={18} aria-hidden="true" />
          </button>
          <button
            id="menu-toggle"
            className="icon-button menu-button"
            type="button"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
