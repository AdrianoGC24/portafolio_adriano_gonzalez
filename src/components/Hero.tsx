import { useState } from 'react'
import { Download, Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { portfolio, type Language } from '../data/portfolio'

export const socialIcons = { linkedin: Linkedin, github: Github, email: Mail, instagram: Instagram }

export function DownloadCv({ language, className = '' }: { language: Language; className?: string }) {
  return (
    <a
      href={portfolio.cv[language]}
      download="Adriano De Jesús González Cera.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={`button button-secondary ${className}`}
    >
      <Download size={17} aria-hidden="true" />
      {portfolio.copy[language].cv}
    </a>
  )
}

export function Hero({ language }: { language: Language }) {
  const copy = portfolio.copy[language]
  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <section className="shell hero" id="inicio" aria-labelledby="hero-title">
      <div className="portrait-frame">
        <img
          className="portrait"
          src={hasPhoto ? portfolio.profile.image : portfolio.profile.fallback}
          alt={hasPhoto ? copy.profileAlt : ''}
          onError={hasPhoto ? () => setHasPhoto(false) : undefined}
          width={580}
          height={610}
          fetchPriority="high"
        />
      </div>
      <div className="hero-copy">
        <div className="availability">
          <span className="availability-dot" aria-hidden="true" />
          {copy.availability}
          <span className="availability-specialty"><span aria-hidden="true">·</span> {copy.specialty}</span>
        </div>
        <h1 id="hero-title">{portfolio.name}<span aria-hidden="true">.</span></h1>
        <p className="hero-role">{copy.role}</p>
        <p className="hero-description">{copy.intro}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#proyectos">{copy.projectsCta}</a>
          <DownloadCv language={language} />
        </div>
        <ul className="social-bar" aria-label={copy.contactTitle}>
          {portfolio.socials.map(social => {
            const Icon = socialIcons[social.id]
            const label = social.placeholder ? `${social.label[language]} · ${copy.placeholder}` : social.label[language]
            return (
              <li key={social.id}>
                <a
                  className="icon-button social-button"
                  href={social.href}
                  aria-label={label}
                  title={label}
                  target={social.id === 'email' ? undefined : '_blank'}
                  rel={social.id === 'email' ? undefined : 'noopener noreferrer'}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

