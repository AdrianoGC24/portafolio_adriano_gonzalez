import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { portfolio, type Language } from '../data/portfolio'

export function About({ language }: { language: Language }) {
  const copy = portfolio.copy[language]
  return (
    <section id="sobre-mi" className="section section-tinted" aria-labelledby="about-title">
      <div className="shell">
        <div className="about-copy">
          <h2 id="about-title">{copy.aboutTitle}</h2>
          <div>{copy.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <dl className="metric-grid">
          {portfolio.metrics.map(metric => (
            <div className="metric" key={metric.value}>
              <dt>{metric.label[language]}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Stack({ language }: { language: Language }) {
  const copy = portfolio.copy[language]
  const [paused, setPaused] = useState(false)
  const label = paused ? copy.playStack : copy.pauseStack
  const ControlIcon = paused ? Play : Pause
  const groups = [
    portfolio.technologies.filter((_, index) => index % 2 === 0),
    portfolio.technologies.filter((_, index) => index % 2 === 1),
  ]

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="shell">
        <div className="section-heading stack-heading">
          <div>
            <h2 id="stack-title">{copy.stackTitle}</h2>
            <p>{copy.stackIntro}</p>
          </div>
          <button className="icon-button motion-control" type="button" aria-label={label} title={label} onClick={() => setPaused(!paused)}>
            <ControlIcon size={18} aria-hidden="true" />
          </button>
        </div>
        <div className={`stack-marquees ${paused ? 'stack-paused' : ''}`}>
          {groups.filter(group => group.length > 0).map((group, row) => (
            <div className="marquee" key={row}>
              <div className="marquee-track hover:[animation-play-state:paused]">
                {[false, true].map(duplicate => (
                  <ul key={String(duplicate)} aria-hidden={duplicate || undefined} className={`marquee-group ${duplicate ? 'marquee-clone' : ''}`}>
                    {group.map(technology => (
                      <li className="tech-pill" key={technology.name}>
                        <img src={technology.logo} width={24} height={24} alt="" onError={event => { event.currentTarget.hidden = true }} />
                        <span>{technology.name}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
