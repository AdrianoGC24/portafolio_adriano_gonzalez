import { useState, type FormEvent } from 'react'
import { BriefcaseBusiness, Check, Copy, GraduationCap, MapPin, Send } from 'lucide-react'
import { portfolio, type Language } from '../data/portfolio'
import { DownloadCv, socialIcons } from './Hero'

export function Experience({ language }: { language: Language }) {
  const copy = portfolio.copy[language]

  return (
    <section id="experiencia" className="section" aria-labelledby="experience-title">
      <div className="shell">
        <div className="section-heading"><h2 id="experience-title">{copy.experienceTitle}</h2></div>
        <div className="experience-grid">
          <ol className="timeline">
            {portfolio.experience.map(item => (
              <li key={item.role.es}>
                <span className="timeline-marker"><BriefcaseBusiness size={17} aria-hidden="true" /></span>
                <p className="time">{item.dates[language]}</p>
                <h3>{item.role[language]}</h3>
                <p className="company">{item.company[language]}</p>
                <p>{item.description[language]}</p>
              </li>
            ))}
          </ol>
          <aside className="education" aria-labelledby="education-title">
            <h3 id="education-title"><GraduationCap size={21} aria-hidden="true" /> {copy.educationTitle}</h3>
            <ul>
              {portfolio.education.map(item => (
                <li key={item.school}>
                  <strong>{item.title[language]}</strong>
                  <p>{item.school} <span aria-hidden="true">·</span> {item.year}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

export function Contact({ language }: { language: Language }) {
  const copy = portfolio.copy[language]
  const [hasDraft, setHasDraft] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name')).trim()
    const email = String(form.get('email')).trim()
    const message = String(form.get('message')).trim()
    const subject = encodeURIComponent(`${copy.subject} — ${name}`)
    const body = encodeURIComponent(`${message}\r\n\r\n${copy.formName}: ${name}\r\n${copy.formEmail}: ${email}`)

    setHasDraft(true)
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(portfolio.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <section id="contacto" className="section section-tinted" aria-labelledby="contact-title">
      <div className="shell">
        <div className="section-heading">
          <h2 id="contact-title">{copy.contactTitle}</h2>
          <p>{copy.contactIntro}</p>
        </div>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={prepareDraft} onChange={() => setHasDraft(false)}>
            <label htmlFor="contact-name">{copy.formName}</label>
            <input id="contact-name" name="name" autoComplete="name" pattern=".*\S.*" maxLength={100} required />
            <label htmlFor="contact-email">{copy.formEmail}</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
            <label htmlFor="contact-message">{copy.formMessage}</label>
            <textarea id="contact-message" name="message" rows={5} maxLength={1500} required
              onInput={event => { event.currentTarget.setCustomValidity(event.currentTarget.value && !event.currentTarget.value.trim() ? copy.formMessage : '') }}
            />
            <div className="form-actions">
              <button type="submit" className="button button-primary"><Send size={17} aria-hidden="true" />{copy.send}</button>
              <p className={hasDraft ? 'form-confirmation' : ''} role="status">
                {hasDraft && <Check size={17} aria-hidden="true" />}
                {hasDraft ? copy.draft : copy.formNote}
              </p>
            </div>
          </form>
          <div className="contact-links">
            <ul>
              {[...portfolio.socials].sort((first, second) => Number(second.id === 'email') - Number(first.id === 'email')).map(social => {
                const Icon = socialIcons[social.id]
                const isEmail = social.id === 'email'
                return (
                  <li className="contact-card" key={social.id}>
                    <a href={social.href} target={isEmail ? undefined : '_blank'} rel={isEmail ? undefined : 'noopener noreferrer'}>
                      <span className="contact-icon"><Icon size={18} aria-hidden="true" /></span>
                      <span><strong>{social.label[language]}</strong><span>{social.placeholder ? `${social.detail} · ${copy.placeholder}` : social.detail}</span></span>
                    </a>
                    {isEmail && <button type="button" className="icon-button copy-button" aria-label={copy.copyEmail} title={copy.copyEmail} onClick={copyEmail}>
                      {copyState === 'copied' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                    </button>}
                  </li>
                )
              })}
            </ul>
            <div className="copy-feedback" role="status">
              {copyState === 'copied' && copy.copied}
              {copyState === 'failed' && (
                <label>
                  {copy.copyError}
                  <input aria-label={copy.selectEmail} value={portfolio.email} readOnly onFocus={event => event.currentTarget.select()} />
                </label>
              )}
            </div>
            <DownloadCv language={language} className="contact-cv" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer({ language }: { language: Language }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>© {new Date().getFullYear()} {portfolio.name}. {portfolio.copy[language].rights}</p>
        <p><MapPin size={16} aria-hidden="true" /> {portfolio.location}</p>
      </div>
    </footer>
  )
}
