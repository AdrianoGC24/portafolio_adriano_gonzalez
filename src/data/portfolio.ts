export type Language = 'es' | 'en'
export type Localized = Record<Language, string>

type SocialId = 'linkedin' | 'github' | 'email' | 'instagram'
type ProjectIcon = 'plane' | 'smartphone' | 'heart'
type ProjectAction =
  | { type: 'docs' | 'repo' | 'site'; href: string | Localized }
  | { type: 'video'; src: string }

interface Project {
  id: string
  icon: ProjectIcon
  name: string
  title: Localized
  status: Localized
  description: Localized
  image: string
  imageAlt: Localized
  tags: string[]
  actions: ProjectAction[]
  featured?: boolean
}

interface Technology {
  name: string
  logo: string
}

const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/portafolio_adriano_gonzalez/'
const asset = (file: string) => `${base.replace(/\/$/, '')}/assets/${encodeURI(file)}`
const devicon = (directory: string, file = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${directory}/${directory}-${file}.svg`

const email = 'adrianogonzalezcera002@gmail.com'
const name = 'Adriano González'

// Agrega una tecnología en una línea: { name: 'Nombre', logo: devicon('carpeta', 'variante') }.
const technologies: Technology[] = [
  { name: 'Python', logo: devicon('python') },
  { name: 'FastAPI', logo: devicon('fastapi') },
  { name: 'Apache Airflow', logo: devicon('apacheairflow') },
  { name: 'Apache Spark', logo: devicon('apachespark') },
  { name: 'Pandas', logo: devicon('pandas') },
  { name: 'RabbitMQ', logo: devicon('rabbitmq') },
  // Power BI no está en Devicon. Se usa el SVG oficial de Microsoft.
  { name: 'Power BI', logo: asset('power-bi.svg') },
  { name: 'PostgreSQL', logo: devicon('postgresql') },
  { name: 'MySQL', logo: devicon('mysql') },
  { name: 'MongoDB', logo: devicon('mongodb') },
  { name: 'SQLAlchemy', logo: devicon('sqlalchemy') },
  { name: 'AWS', logo: devicon('amazonwebservices') },
  { name: 'Docker', logo: devicon('docker') },
  { name: 'Git', logo: devicon('git') },
  { name: 'GitHub Actions', logo: devicon('githubactions') },
  { name: 'HTML5', logo: devicon('html5') },
  { name: 'CSS3', logo: devicon('css3') },
  { name: 'JavaScript', logo: devicon('javascript') },
  { name: 'Flutter', logo: devicon('flutter') },
]

// Agrega una ficha aquí con sus traducciones, imagen, tecnologías y acciones.
const projects: Project[] = [
  {
    id: 'vueladata',
    icon: 'plane',
    name: 'VuelaData',
    title: { es: 'Plataforma analítica y operativa aeronáutica', en: 'Aviation analytics and operations platform' },
    status: { es: 'Proyecto destacado', en: 'Featured project' },
    description: {
      es: 'Plataforma híbrida OLTP + OLAP en AWS para gestionar ~380 vuelos diarios y 5,8 millones de registros históricos. Integra ingesta serverless con Lambda (OpenSky y Open-Meteo), RabbitMQ Fanout, API REST y workers en FastAPI, PostgreSQL 16 en RDS, S3 Medallion, Airflow, Spark, Glue, Athena y Power BI.',
      en: 'Hybrid OLTP + OLAP platform on AWS for ~380 daily flights and 5.8 million historical records. It uses serverless Lambda ingestion (OpenSky and Open-Meteo), RabbitMQ Fanout, a REST API and workers in FastAPI, PostgreSQL 16 on RDS, S3 Medallion, Airflow, Spark, Glue, Athena, and Power BI.',
    },
    image: asset('vueladata-arquitectura-aws.png'),
    imageAlt: { es: 'Diagrama de arquitectura AWS de VuelaData', en: 'VuelaData AWS architecture diagram' },
    tags: ['AWS', 'FastAPI', 'PostgreSQL', 'Airflow', 'Spark', 'Power BI'],
    actions: [
      { type: 'docs', href: { es: 'https://vueladata.github.io/documentacion/es/docs/', en: 'https://vueladata.github.io/documentacion/docs/' } },
      { type: 'video', src: asset('vueladata-demo.mp4') },
      { type: 'repo', href: 'https://github.com/orgs/VuelaData/repositories' },
    ],
    featured: true,
  },
  {
    id: 'bankos',
    icon: 'smartphone',
    name: 'BankOs',
    title: { es: 'App financiera móvil', en: 'Mobile finance app' },
    status: { es: 'En desarrollo · Demo de interfaz', en: 'In development · UI showcase' },
    description: {
      es: 'Aplicación móvil en Flutter enfocada en una experiencia financiera moderna con dashboard de balance, tarjetas y movimientos.',
      en: 'A Flutter app for a modern banking experience with a dashboard for balances, cards, and transactions.',
    },
    image: asset('bankos-mobile-demo-android.png'),
    imageAlt: { es: 'Capturas de una transferencia simulada en BankOs para Android', en: 'Screenshots of a simulated transfer in BankOs for Android' },
    tags: ['Flutter', 'FastAPI', 'PostgreSQL', 'Redis'],
    actions: [{ type: 'repo', href: 'https://github.com/BankOs-project' }],
  },
  {
    id: 'fundacion-anda',
    icon: 'heart',
    name: 'Fundación Anda',
    title: { es: 'Sitio web institucional', en: 'Nonprofit website' },
    status: { es: 'Impacto social · Desarrollo web', en: 'Social impact · Web development' },
    description: {
      es: 'Plataforma web para la Fundación Anda que da visibilidad a sus proyectos sociales y facilita encontrar canales de apoyo.',
      en: 'A website for Fundación Anda that gives its social projects visibility and makes it easier to find ways to help.',
    },
    image: asset('fundacion-anda-vistas-web.png'),
    imageAlt: { es: 'Capturas de escritorio y móvil del sitio de Fundación Anda', en: 'Desktop and mobile screenshots of the Fundación Anda website' },
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    actions: [{ type: 'site', href: 'https://adrianogc24.github.io/Fundacion-Anda/' }],
  },
]

interface Social {
  id: SocialId
  label: Localized
  href: string
  detail: string
  placeholder?: boolean
}

const socials: Social[] = [
  { id: 'linkedin', label: { es: 'LinkedIn', en: 'LinkedIn' }, href: 'https://www.linkedin.com/in/adriano-de-jesus-gonzalez-cera/', detail: '/in/adriano-de-jesus-gonzalez-cera' },
  { id: 'github', label: { es: 'GitHub', en: 'GitHub' }, href: 'https://github.com/AdrianoGC24', detail: '@AdrianoGC24' },
  { id: 'email', label: { es: 'Correo', en: 'Email' }, href: `mailto:${email}`, detail: email },
  // Instagram: reemplaza el enlace y el usuario, y elimina placeholder cuando tengas tu perfil.
  { id: 'instagram', label: { es: 'Instagram', en: 'Instagram' }, href: 'https://instagram.com/tu_usuario', detail: '@tu_usuario', placeholder: true },
]

const experience = [
  {
    role: { es: 'Líder de equipo · Desarrollador backend y datos', en: 'Team Lead · Backend & Data Developer' },
    company: { es: 'Riwi', en: 'Riwi' },
    dates: { es: 'Sep 2026 – Nov 2026', en: 'Sep 2026 – Nov 2026' },
    description: {
      es: 'Lideré el equipo y diseñé la arquitectura de VuelaData en AWS con FastAPI, Airflow, Spark, RabbitMQ y Power BI.',
      en: 'I led the team and designed VuelaData’s architecture on AWS with FastAPI, Airflow, Spark, RabbitMQ, and Power BI.',
    },
  },
  {
    role: { es: 'Desarrollador full stack · Backend y datos', en: 'Full Stack Developer · Backend & Data' },
    company: { es: 'Riwi', en: 'Riwi' },
    dates: { es: 'Jun 2026 – Ago 2026', en: 'Jun 2026 – Aug 2026' },
    description: {
      es: 'Desarrollé una plataforma web educativa gamificada con arquitectura relacional en PostgreSQL, FastAPI, SQLAlchemy y documentación en Swagger.',
      en: 'I built a gamified learning platform with a relational PostgreSQL architecture, FastAPI, SQLAlchemy, and Swagger documentation.',
    },
  },
  {
    role: { es: 'Estratega de e-commerce y marketing digital', en: 'E-commerce & Digital Marketing Strategist' },
    company: { es: 'Independiente', en: 'Independent' },
    dates: { es: 'Ene 2024 – Dic 2025', en: 'Jan 2024 – Dec 2025' },
    description: {
      es: 'Gestioné operaciones en Colombia y Perú y optimicé más de 30 campañas en Meta Ads. Mejoré la conversión en un 25 % y reduje el CPA en un 30 %.',
      en: 'I managed operations in Colombia and Peru and optimized over 30 Meta Ads campaigns, increasing conversion by 25% and reducing CPA by 30%.',
    },
  },
]

const education = [
  { title: { es: 'Desarrollador con énfasis en Análisis de Datos', en: 'Software Development with a Focus on Data Analysis' }, school: 'Riwi', year: '2026' },
  { title: { es: 'Certificado de Competencia Laboral en Desarrollo de Software', en: 'Occupational Competency Certificate in Software Development' }, school: 'SENA', year: '2026' },
  { title: { es: 'Técnico Auxiliar Administrativo', en: 'Technical Certificate in Administrative Assistance' }, school: 'System Center', year: '2020' },
]

export const portfolio = {
  brand: 'Adriano',
  domain: 'dev',
  name,
  location: 'Barranquilla, Colombia',
  email,
  languages: { es: 'ES', en: 'EN' } satisfies Record<Language, string>,
  profile: { image: asset('profile.png'), fallback: asset('profile-placeholder.svg') },
  cv: {
    es: asset('Adriano De Jesús González Cera.pdf'),
    en: asset('Adriano De Jesús González Cera.pdf'),
  },
  socials,
  technologies,
  projects,
  experience,
  education,
  sections: [
    { id: 'sobre-mi', label: { es: 'Sobre mí', en: 'About' } },
    { id: 'stack', label: { es: 'Stack', en: 'Stack' } },
    { id: 'proyectos', label: { es: 'Proyectos', en: 'Projects' } },
    { id: 'experiencia', label: { es: 'Experiencia', en: 'Experience' } },
    { id: 'contacto', label: { es: 'Contacto', en: 'Contact' } },
  ],
  metrics: [
    { value: '100%', label: { es: 'Automatización de pipelines ETL/ELT', en: 'ETL/ELT pipeline automation' } },
    { value: '−70%', label: { es: 'Reducción en tiempos de procesamiento', en: 'Reduction in processing time' } },
    { value: '−85%', label: { es: 'Reducción en retrasos de compensaciones', en: 'Reduction in compensation delays' } },
    { value: '+25%', label: { es: 'Mejora en conversión e-commerce (−30% CPA)', en: 'E-commerce conversion lift (−30% CPA)' } },
  ],
  copy: {
    es: {
      title: `${name} · Portafolio de ingeniería de datos y software`,
      description: 'Portafolio de Adriano González, desarrollador de software con énfasis en análisis e ingeniería de datos en Barranquilla, Colombia.',
      skip: 'Ir al contenido',
      home: 'Inicio',
      navigation: 'Navegación principal',
      language: 'Idioma',
      light: 'Activar modo claro',
      dark: 'Activar modo oscuro',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      availability: 'Disponible para oportunidades',
      specialty: 'Ingeniería de Datos y Desarrollo de Software',
      role: 'Desarrollador de Software con énfasis en Análisis e Ingeniería de Datos.',
      intro: 'Diseño arquitecturas escalables en AWS, pipelines ETL/ELT y aplicaciones web y móviles que conectan la ingeniería con el impacto de negocio.',
      profileAlt: 'Retrato de Adriano González',
      projectsCta: 'Ver Proyectos',
      cv: 'Descargar CV',
      aboutTitle: 'Sobre mí',
      about: [
        'Soy desarrollador Full Stack enfocado en Análisis e Ingeniería de Datos en formación en Riwi (Barranquilla, Colombia). He liderado equipos ágiles para construir APIs REST, bases de datos SQL/NoSQL y pipelines de datos en AWS.',
        'Mi experiencia como estratega de e-commerce y marketing digital en Colombia y Perú, donde gestioné más de 30 campañas en Meta Ads, me enseñó a entender el negocio detrás de cada dato y a construir software orientado a resultados.',
      ],
      stackTitle: 'Stack técnico',
      stackIntro: 'Herramientas que uso para construir desde la ingesta de datos hasta la interfaz.',
      pauseStack: 'Pausar carrusel',
      playStack: 'Reanudar carrusel',
      projectsTitle: 'Proyectos destacados',
      experienceTitle: 'Experiencia y formación',
      educationTitle: 'Formación',
      contactTitle: 'Contacto',
      contactIntro: 'Cuéntame sobre tu proyecto o la oportunidad que tienes en mente.',
      action: { docs: 'Documentación técnica', video: 'Ver video demo', repo: 'Ver repositorio', site: 'Ver proyecto' },
      videoUnavailable: 'El video de demostración aún no está disponible.',
      close: 'Cerrar',
      imageUnavailable: 'Imagen no disponible',
      placeholder: 'Perfil pendiente',
      formName: 'Nombre',
      formEmail: 'Correo',
      formMessage: 'Mensaje',
      send: 'Enviar',
      formNote: 'Se abrirá un borrador en tu aplicación de correo.',
      draft: 'Borrador preparado. Envíalo desde tu aplicación de correo.',
      subject: 'Contacto desde el portafolio',
      copyEmail: 'Copiar correo',
      copied: 'Correo copiado',
      copyError: 'Selecciona y copia la dirección de correo.',
      selectEmail: 'Dirección de correo para copiar',
      rights: 'Todos los derechos reservados.',
    },
    en: {
      title: `${name} · Data Engineering and Software Portfolio`,
      description: 'Portfolio of Adriano González, a software developer focused on data analysis and engineering in Barranquilla, Colombia.',
      skip: 'Skip to content',
      home: 'Home',
      navigation: 'Primary navigation',
      language: 'Language',
      light: 'Enable light mode',
      dark: 'Enable dark mode',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      availability: 'Available for opportunities',
      specialty: 'Data Engineering & Software Development',
      role: 'Software Developer focused on Data Analysis & Engineering.',
      intro: 'I design scalable AWS architectures, ETL/ELT pipelines, and web and mobile applications that connect engineering to business outcomes.',
      profileAlt: 'Portrait of Adriano González',
      projectsCta: 'View Projects',
      cv: 'Download Résumé',
      aboutTitle: 'About me',
      about: [
        'I’m a full-stack developer training in Data Analysis and Engineering at Riwi in Barranquilla, Colombia. I’ve led agile teams building REST APIs, SQL and NoSQL databases, and data pipelines on AWS.',
        'Working as an e-commerce and digital marketing strategist in Colombia and Peru, where I managed more than 30 Meta Ads campaigns, taught me to understand the business behind the data and build software around measurable outcomes.',
      ],
      stackTitle: 'Technical stack',
      stackIntro: 'Tools I use to build everything from data ingestion to the user interface.',
      pauseStack: 'Pause carousel',
      playStack: 'Resume carousel',
      projectsTitle: 'Featured projects',
      experienceTitle: 'Experience & Education',
      educationTitle: 'Education',
      contactTitle: 'Contact',
      contactIntro: 'Tell me about your project or the opportunity you have in mind.',
      action: { docs: 'Technical documentation', video: 'Watch demo', repo: 'View repository', site: 'View project' },
      videoUnavailable: 'The demo video is not available yet.',
      close: 'Close',
      imageUnavailable: 'Image unavailable',
      placeholder: 'Profile pending',
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Message',
      send: 'Send',
      formNote: 'This opens a draft in your email app.',
      draft: 'Draft ready. Send it from your email app.',
      subject: 'Portfolio inquiry',
      copyEmail: 'Copy email',
      copied: 'Email copied',
      copyError: 'Select and copy the email address.',
      selectEmail: 'Email address to copy',
      rights: 'All rights reserved.',
    },
  },
}



