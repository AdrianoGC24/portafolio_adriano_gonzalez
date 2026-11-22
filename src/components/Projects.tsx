import { useEffect, useRef, useState } from 'react'
import { BookOpen, ExternalLink, Github, Heart, ImageOff, Plane, Play, Smartphone, X } from 'lucide-react'
import { portfolio, type Language } from '../data/portfolio'

type Project = (typeof portfolio.projects)[number]
const projectIcons = { plane: Plane, smartphone: Smartphone, heart: Heart }
const actionIcons = { docs: BookOpen, repo: Github, site: ExternalLink }

function ProjectImage({ project, language }: { project: Project; language: Language }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className="project-image-fallback"><ImageOff size={27} aria-hidden="true" />{portfolio.copy[language].imageUnavailable}</div>
  }

  return <img src={project.image} alt={project.imageAlt[language]} loading="lazy" decoding="async" onError={() => setFailed(true)} />
}

function VideoDialog({ src, title, language, onClose }: { src: string; title: string; language: Language; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [unavailable, setUnavailable] = useState(false)
  const copy = portfolio.copy[language]

  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
  }, [])

  return (
    <dialog
      className="video-dialog"
      ref={ref}
      aria-labelledby="video-title"
      onClose={onClose}
      onClick={event => { if (event.target === event.currentTarget) ref.current?.close() }}
    >
      <div className="dialog-inner">
        <div className="dialog-header">
          <h2 id="video-title">{title} · {copy.action.video}</h2>
          <button className="icon-button" type="button" aria-label={copy.close} onClick={() => ref.current?.close()}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {unavailable
          ? <p className="video-empty" role="status"><Play size={28} aria-hidden="true" />{copy.videoUnavailable}</p>
          : <video src={src} controls autoPlay playsInline preload="metadata" aria-label={title} onError={() => setUnavailable(true)} />}
      </div>
    </dialog>
  )
}

export function Projects({ language }: { language: Language }) {
  const copy = portfolio.copy[language]
  const [video, setVideo] = useState<{ src: string; title: string } | null>(null)
  const videoTrigger = useRef<HTMLButtonElement>(null)

  return (
    <section id="proyectos" className="section section-tinted" aria-labelledby="projects-title">
      <div className="shell">
        <div className="section-heading"><h2 id="projects-title">{copy.projectsTitle}</h2></div>
        <div className="project-grid">
          {portfolio.projects.map(project => {
            const Icon = projectIcons[project.icon]
            return (
              <article key={project.id} className={`project-card ${project.featured ? 'project-featured' : ''}`}>
                <div className="project-visual"><ProjectImage project={project} language={language} /></div>
                <div className="project-body">
                  <div className="project-status">
                    <span className="project-icon"><Icon size={18} aria-hidden="true" /></span>
                    <span>{project.status[language]}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p className="project-subtitle">{project.title[language]}</p>
                  <p className="project-description">{project.description[language]}</p>
                  <ul className="project-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                  <div className="project-actions">
                    {project.actions.map(action => {
                      if (action.type === 'video') {
                        return (
                          <button key={action.type} type="button" className="button button-secondary" onClick={event => {
                            videoTrigger.current = event.currentTarget
                            setVideo({ src: action.src, title: project.name })
                          }}>
                            <Play size={15} aria-hidden="true" />{copy.action.video}
                          </button>
                        )
                      }
                      const ActionIcon = actionIcons[action.type]
                      const href = typeof action.href === 'string' ? action.href : action.href[language]
                      return (
                        <a key={action.type} href={href} className="button button-secondary" target="_blank" rel="noopener noreferrer">
                          <ActionIcon size={15} aria-hidden="true" />{copy.action[action.type]}
                        </a>
                      )
                    })}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      {video && <VideoDialog {...video} language={language} onClose={() => {
        setVideo(null)
        videoTrigger.current?.focus()
      }} />}
    </section>
  )
}

