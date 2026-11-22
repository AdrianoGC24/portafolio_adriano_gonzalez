import { useEffect, useState } from 'react'
import { portfolio, type Language } from './data/portfolio'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About, Stack } from './components/AboutStack'
import { Projects } from './components/Projects'
import { Contact, Experience, Footer } from './components/ExperienceContact'

function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Keep the current preference in memory if browser storage is blocked.
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => document.documentElement.lang === 'en' ? 'en' : 'es')
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const copy = portfolio.copy[language]
    document.documentElement.lang = language
    document.title = copy.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description)
    savePreference('portfolio-language', language)
  }, [language])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    savePreference('portfolio-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <Header language={language} setLanguage={setLanguage} dark={dark} setDark={setDark} />
      <main id="main" tabIndex={-1}>
        <Hero language={language} />
        <About language={language} />
        <Stack language={language} />
        <Projects language={language} />
        <Experience language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </>
  )
}
