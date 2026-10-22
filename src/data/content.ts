// Single source of truth for every piece of copy on the site, in English and Spanish.
// Dates and figures must match the CV (public/freddy-bautista-cv.pdf) and LinkedIn exactly.

export type Lang = 'en' | 'es';
export const langs: Lang[] = ['en', 'es'];

export const site = {
  name: 'Freddy Bautista Baquero',
  url: 'https://freddybautista.me',
};

export const links = {
  email: 'freddybautistadev@gmail.com',
  github: 'https://github.com/FreddyB200',
  linkedin: 'https://www.linkedin.com/in/freddy-bautista-baquero',
  resume: '/freddy-bautista-cv.pdf',
};

/** Start of professional experience (first job). Used to compute the exact time worked. */
export const careerStart = '2024-02';

export function monthsSince(start: string, now: Date = new Date()): number {
  const [y, m] = start.split('-').map(Number);
  return Math.max(0, (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m));
}

const units = {
  en: { y: ['year', 'years'], m: ['month', 'months'], sep: ', ' },
  es: { y: ['año', 'años'], m: ['mes', 'meses'], sep: ', ' },
} as const;

export function formatDuration(months: number, lang: Lang): string {
  const u = units[lang];
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} ${u.y[y === 1 ? 0 : 1]}`);
  if (m > 0 || y === 0) parts.push(`${m} ${u.m[m === 1 ? 0 : 1]}`);
  return parts.join(u.sep);
}

export const durationUnits = units;

export interface Job {
  dates: string;
  company: string;
  role: string;
  place: string;
  story: string[];
  tags: string[];
}

export interface SkillGroup {
  title: string;
  note: string;
  items: string[];
}

export interface Podium {
  name: string;
  subtitle: string;
  place: string;
  event: string;
  context?: string;
  role: string;
  stats: { value: string; label: string }[];
  description: string;
  links: { label: string; href: string }[];
}

export interface Copy {
  htmlLang: string;
  ogLocale: string;
  meta: { title: string; description: string; ogAlt: string };
  ui: {
    skip: string;
    resume: string;
    resumeShort: string;
    themeToDark: string;
    themeToLight: string;
    langLabel: string;
    navLabel: string;
    contact: string;
    backToTop: string;
  };
  nav: { label: string; href: string }[];
  hero: { eyebrow: string; headline: string[]; paragraphs: string[]; photoAlt: string };
  stats: { label: string; value: string; note?: string }[];
  experience: {
    label: string;
    title: string;
    range: string;
    durationSuffix: string;
    technologies: string;
    jobs: Job[];
  };
  skills: { label: string; title: string; groups: SkillGroup[] };
  competitions: { label: string; title: string; hostLabel: string; roleLabel: string; list: Podium[] };
  credentials: {
    label: string;
    title: string;
    educationHeading: string;
    languagesHeading: string;
    credentialsHeading: string;
    education: { title: string; place: string; dates: string }[];
    spoken: { name: string; level: string; href?: string; hrefLabel?: string }[];
    items: { title: string; detail: string }[];
  };
  footer: { headline: string; rights: string };
}

const en: Copy = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  meta: {
    title: 'Freddy Bautista | Backend & Infrastructure Engineer',
    description:
      'Backend and infrastructure engineer building real-time payment systems at BBVA. Java, Spring Boot, Python, Docker, Linux. Three Top-2 finishes in LATAM engineering competitions.',
    ogAlt: 'Freddy Bautista. I build backend systems that are not allowed to fail.',
  },
  ui: {
    skip: 'Skip to content',
    resume: 'Résumé, PDF',
    resumeShort: 'CV',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',
    langLabel: 'Language',
    navLabel: 'Primary',
    contact: 'Contact',
    backToTop: 'Back to top',
  },
  nav: [
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Competitions', href: '#competitions' },
    { label: 'Credentials', href: '#credentials' },
  ],
  hero: {
    eyebrow: 'Backend & Infrastructure Engineer · Java · Python · Secure by design',
    headline: ['I build backend systems', 'that are not allowed', 'to fail'],
    paragraphs: [
      "I'm a backend and infrastructure engineer. Today I work on BBVA's instant payments rail (ACH, Bre-B and Redeban), where a transaction has a few hundred milliseconds to resolve and \"we'll fix it tomorrow\" isn't an option. I work in Java and Spring Boot, and I had to certify in a secure development standard before touching the codebase.",
      "Before banking I ran production systems with much smaller teams and much less margin: a 24/7 camera streaming service, ERP and billing modules, and Linux servers I was personally on the hook for at 2am. That's where I learned that the interesting part of this job isn't the code. It's designing for the moment things break. I've also placed Top 2 in three LATAM engineering competitions.",
    ],
    photoAlt: 'Freddy Bautista working on a laptop',
  },
  stats: [
    { label: 'Currently', value: 'BBVA', note: 'Real-time payments project, via Inetum' },
    { label: 'Years building', value: '4 years', note: 'Professional + independent work' },
    { label: 'Core stack', value: 'Java · Python · AWS' },
    { label: 'Based in', value: 'Bogotá, Colombia' },
  ],
  experience: {
    label: '01 / Career',
    title: 'Experience',
    range: '2024 – Present',
    durationSuffix: 'of professional experience',
    technologies: 'Technologies',
    jobs: [
      {
        dates: 'Jun 2026 – Present',
        company: 'BBVA Colombia (via Inetum)',
        role: 'Backend Java Developer, Instant Payments',
        place: 'Bogotá · Remote',
        story: [
          'I work on the instant payments side of BBVA Colombia, building the backend services behind real-time transfers through ACH, Bre-B and Redeban. The architecture is distributed and event-driven, with orchestration libraries and integration with the host system, so a lot of my work is thinking about what happens between services when something fails.',
          'I test everything with JUnit and Mockito, and SonarQube gates every change on coverage, new code smells and complexity. Peer review, small focused methods and static-analysis rules (like never catching NullPointerException) are simply how we write code. We ship in Scrum, with release planning, rollback plans and production-readiness checklists, and when a payment goes wrong across services I trace it end to end and check the database evidence to find where.',
        ],
        tags: [
          'Java',
          'Event-driven architecture',
          'Distributed systems',
          'Oracle',
          'JUnit',
          'Mockito',
          'Maven',
          'SonarQube',
          'Scrum',
          'Clean Code',
          'Code Review',
        ],
      },
      {
        dates: 'Feb 2025 – Feb 2026',
        company: 'ESCOLE Experiencias Educativas',
        role: 'Fullstack Developer',
        place: 'Bogotá · On-site',
        story: [
          "The part of ESCOLE I'm proudest of is an equipment management platform that ended up being used by more than five entire departments, shipped with tests and documentation. Around it I owned the production backend end to end: REST APIs on Docker, Linux servers, and fixing incidents when they happened.",
          'I also built a 24/7 streaming service in FastAPI for 16 cameras (RTSP to HLS), and I introduced Git into projects that had never used it.',
        ],
        tags: ['React', 'Google Apps Script', 'Python', 'FastAPI', 'Docker', 'Linux', 'PostgreSQL'],
      },
      {
        dates: 'Feb 2024 – Feb 2025',
        company: 'Serviportenal SAS',
        role: 'Java Developer',
        place: 'Bogotá · Remote',
        story: [
          'I built a multi-module ERP in Java 17 and Spring Boot with JPA/Hibernate, covering billing, contracts and clients. I designed the PostgreSQL schema and the REST API against OpenAPI contracts, and I gathered the requirements directly with the business, delivering on the dates we committed to.',
        ],
        tags: ['Java 17', 'Spring Boot', 'JPA/Hibernate', 'PostgreSQL', 'OpenAPI'],
      },
    ],
  },
  skills: {
    label: '02 / Technical skills',
    title: 'Grouped by real depth',
    groups: [
      {
        title: 'Production',
        note: 'Used in systems that serve real users, and in products shipped under competition conditions',
        items: [
          'Java 17', 'Spring Boot', 'Spring Security', 'REST / OpenAPI', 'JPA/Hibernate', 'Python',
          'FastAPI', 'PostgreSQL', 'Docker', 'Linux', 'Git', 'Maven', 'JUnit', 'Mockito',
          'React', 'TypeScript', 'Supabase', 'n8n', 'LLM integrations (OpenAI, Gemini, LiteLLM)',
        ],
      },
      {
        title: 'Infrastructure & practices',
        note: 'How the work gets shipped and kept alive',
        items: [
          'CI/CD', 'Jenkins', 'Artifactory', 'Bash', 'SonarQube', 'Secure SDLC', 'Code review',
          'Agile / Scrum', 'Redis', 'Oracle SQL', 'AWS fundamentals',
        ],
      },
      {
        title: 'Working knowledge',
        note: 'Used on projects, not yet at production depth',
        items: ['Go', 'Rust'],
      },
    ],
  },
  competitions: {
    label: 'Podium finishes · 2026',
    title: 'Competitive engineering',
    hostLabel: 'Event',
    roleLabel: 'Role',
    list: [
      {
        name: 'EcoSentinel',
        subtitle: 'Energy Prediction Platform',
        place: 'Top 2',
        event: 'IAMinds Hackathon 2026 · LATAM-wide, organized by Indra Group',
        context:
          "Built for UPTC (Universidad Pedagógica y Tecnológica de Colombia). Held at the launch of NovaIA, Indra's first AI Center of Excellence in Colombia.",
        role: 'Tech Lead & Backend Developer',
        stats: [
          { value: '80', label: 'teams' },
          { value: '283', label: 'participants' },
          { value: '275k+', label: 'records processed' },
        ],
        description:
          'System design and backend architecture for an energy consumption prediction platform for UPTC: 20 machine-learning forecasting models across 4 university campuses (31,500+ students), queried over WhatsApp, with LLM-assisted root cause analysis for operational anomalies. Built in 36 hours.',
        links: [
          {
            label: 'GitHub',
            href: 'https://github.com/Olinky-HackDay-Indra-Hackaton/ecosentinel-uptc',
          },
        ],
      },
      {
        name: 'Roxy',
        subtitle: 'Security Gateway for AI Agents',
        place: 'Top 2',
        event: 'Platanus Hack 26 · Bogotá · AI Security track',
        role: 'Backend Developer',
        stats: [
          { value: '100', label: 'teams selected' },
          { value: '300+', label: 'applicants' },
        ],
        description:
          'A security layer enforcing delegation-chain authorization for AI agents calling MCP servers: a deterministic Rust decision engine with Z3-based formal policy auditing. Authorization treated as a property you can prove, not a runtime guess.',
        links: [
          { label: 'GitHub', href: 'https://github.com/FreddyB200/Roxy' },
          { label: 'PyPI SDK', href: 'https://pypi.org/project/roxy-guard/' },
          { label: 'Landing', href: 'https://landing.roxygt.lat' },
        ],
      },
      {
        name: 'Adkio',
        subtitle: 'AI Campaign Agent',
        place: 'Top 2',
        event: 'The GTM Hackathon 2026 · 30x',
        context: 'Colombia & Mexico. Organized by 30x, co-founded by Andrés Bilbao (Rappi co-founder).',
        role: 'Tech Lead',
        stats: [
          { value: '50', label: 'teams' },
          { value: '300+', label: 'participants' },
          { value: '36h', label: 'to build it' },
        ],
        description:
          'Architecture and backend for an AI agent that launches ad campaigns from natural language. FastAPI, React/TypeScript, Supabase with pgvector for RAG, LiteLLM.',
        links: [],
      },
    ],
  },
  credentials: {
    label: '03 / Background',
    title: 'Education & credentials',
    educationHeading: 'Education',
    languagesHeading: 'Languages',
    credentialsHeading: 'Credentials & distinctions',
    education: [
      {
        title: 'Systems Engineering, undergraduate',
        place: 'Fundación Universitaria Compensar · Bogotá',
        dates: '2024 – Present',
      },
      { title: 'Software Analysis & Development Technology', place: 'SENA', dates: '2025 – 2027' },
    ],
    spoken: [
      { name: 'Español', level: 'Native' },
      {
        name: 'English',
        level: 'C1/C2 reading & listening, EF SET 76/100',
        href: 'https://cert.efset.org/en/kL3mbC',
        hrefLabel: 'EF SET certificate',
      },
    ],
    items: [
      { title: 'Secure Development Certification', detail: 'BBVA internal standard, 88.37/100' },
      { title: 'Makers Fellowship 2026', detail: 'Coding Track, <1% acceptance rate' },
      { title: 'Aspire Leaders Program', detail: 'Founded at Harvard University by HBS professors' },
      {
        title: 'Oracle',
        detail: 'Database Programming with SQL (2025–2031), Database Foundations, Database Design',
      },
      { title: 'Cisco PCAP', detail: 'Programming Essentials in Python' },
      { title: 'Scrum Fundamentals Certified', detail: 'Vabro.ai & VMEdu' },
    ],
  },
  footer: {
    headline: "Systems that can't afford downtime? Let's talk.",
    rights: 'Bogotá, Colombia',
  },
};

const es: Copy = {
  htmlLang: 'es',
  ogLocale: 'es_CO',
  meta: {
    title: 'Freddy Bautista | Ingeniero de Backend e Infraestructura',
    description:
      'Ingeniero de backend e infraestructura que construye sistemas de pagos en tiempo real en BBVA. Java, Spring Boot, Python, Docker, Linux. Tres podios Top 2 en competencias de ingeniería en LATAM.',
    ogAlt: 'Freddy Bautista. Construyo sistemas backend que no tienen permitido fallar.',
  },
  ui: {
    skip: 'Saltar al contenido',
    resume: 'CV, PDF',
    resumeShort: 'CV',
    themeToDark: 'Cambiar a modo oscuro',
    themeToLight: 'Cambiar a modo claro',
    langLabel: 'Idioma',
    navLabel: 'Principal',
    contact: 'Contacto',
    backToTop: 'Volver arriba',
  },
  nav: [
    { label: 'Experiencia', href: '#experience' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Competencias', href: '#competitions' },
    { label: 'Credenciales', href: '#credentials' },
  ],
  hero: {
    eyebrow: 'Ingeniero de Backend e Infraestructura · Java · Python · Seguridad desde el diseño',
    headline: ['Construyo sistemas', 'backend que no tienen', 'permitido fallar'],
    paragraphs: [
      'Soy ingeniero de backend e infraestructura. Hoy trabajo en el riel de pagos inmediatos de BBVA (ACH, Bre-B y Redeban), donde una transacción tiene unos cientos de milisegundos para resolverse y «lo arreglamos mañana» no es una opción. Trabajo con Java y Spring Boot, y tuve que certificarme en un estándar de desarrollo seguro antes de tocar el código.',
      'Antes de la banca operé sistemas en producción con equipos mucho más pequeños y mucho menos margen: un servicio de streaming de cámaras 24/7, módulos de ERP y facturación, y servidores Linux de los que respondía yo personalmente a las 2 a. m. Ahí aprendí que lo interesante de este oficio no es el código. Es diseñar para el momento en que las cosas fallan. También quedé en el Top 2 de tres competencias de ingeniería en LATAM.',
    ],
    photoAlt: 'Freddy Bautista trabajando en un portátil',
  },
  stats: [
    { label: 'Actualmente', value: 'BBVA', note: 'Proyecto de pagos en tiempo real, vía Inetum' },
    { label: 'Años construyendo', value: '4 años', note: 'Trabajo profesional + independiente' },
    { label: 'Stack principal', value: 'Java · Python · AWS' },
    { label: 'Ubicación', value: 'Bogotá, Colombia' },
  ],
  experience: {
    label: '01 / Carrera',
    title: 'Experiencia',
    range: '2024 – Actualidad',
    durationSuffix: 'de experiencia profesional',
    technologies: 'Tecnologías',
    jobs: [
      {
        dates: 'Jun 2026 – Actualidad',
        company: 'BBVA Colombia (vía Inetum)',
        role: 'Backend Java Developer, Pagos Inmediatos',
        place: 'Bogotá · Remoto',
        story: [
          'Trabajo en pagos inmediatos de BBVA Colombia, construyendo los servicios backend detrás de las transferencias en tiempo real por ACH, Bre-B y Redeban. La arquitectura es distribuida y orientada a eventos, con librerías de orquestación e integración con el host, así que buena parte de mi trabajo es pensar qué pasa entre servicios cuando algo falla.',
          'Pruebo todo con JUnit y Mockito, y SonarQube revisa cada cambio en cobertura, code smells nuevos y complejidad. La revisión entre pares, los métodos pequeños y las reglas de análisis estático (como no capturar NullPointerException) son simplemente la forma de escribir código. Entregamos en Scrum, con planeación de releases, planes de rollback y checklists de preparación para producción, y cuando un pago falla entre servicios lo sigo de punta a punta y reviso la evidencia en base de datos para encontrar dónde.',
        ],
        tags: [
          'Java',
          'Event-driven architecture',
          'Distributed systems',
          'Oracle',
          'JUnit',
          'Mockito',
          'Maven',
          'SonarQube',
          'Scrum',
          'Clean Code',
          'Code Review',
        ],
      },
      {
        dates: 'Feb 2025 – Feb 2026',
        company: 'ESCOLE Experiencias Educativas',
        role: 'Desarrollador Fullstack',
        place: 'Bogotá · Presencial',
        story: [
          'Lo que más orgullo me da de ESCOLE es una plataforma de gestión de equipos que terminaron usando más de cinco departamentos completos, entregada con pruebas y documentación. Alrededor de ella fui responsable del backend en producción de punta a punta: APIs REST en Docker, servidores Linux y la resolución de incidentes cuando ocurrían.',
          'También construí un servicio de streaming 24/7 en FastAPI para 16 cámaras (RTSP a HLS) y llevé Git a proyectos que nunca lo habían usado.',
        ],
        tags: ['React', 'Google Apps Script', 'Python', 'FastAPI', 'Docker', 'Linux', 'PostgreSQL'],
      },
      {
        dates: 'Feb 2024 – Feb 2025',
        company: 'Serviportenal SAS',
        role: 'Desarrollador Java',
        place: 'Bogotá · Remoto',
        story: [
          'Construí un ERP multimódulo en Java 17 y Spring Boot con JPA/Hibernate que cubre facturación, contratos y clientes. Diseñé el esquema de PostgreSQL y la API REST sobre contratos OpenAPI, y levanté los requisitos directamente con el negocio, entregando en las fechas comprometidas.',
        ],
        tags: ['Java 17', 'Spring Boot', 'JPA/Hibernate', 'PostgreSQL', 'OpenAPI'],
      },
    ],
  },
  skills: {
    label: '02 / Habilidades técnicas',
    title: 'Agrupadas por profundidad real',
    groups: [
      {
        title: 'Producción',
        note: 'Usadas en sistemas con usuarios reales y en productos entregados bajo condiciones de competencia',
        items: [
          'Java 17', 'Spring Boot', 'Spring Security', 'REST / OpenAPI', 'JPA/Hibernate', 'Python',
          'FastAPI', 'PostgreSQL', 'Docker', 'Linux', 'Git', 'Maven', 'JUnit', 'Mockito',
          'React', 'TypeScript', 'Supabase', 'n8n', 'Integraciones LLM (OpenAI, Gemini, LiteLLM)',
        ],
      },
      {
        title: 'Infraestructura y prácticas',
        note: 'Cómo se entrega el trabajo y se mantiene vivo',
        items: [
          'CI/CD', 'Jenkins', 'Artifactory', 'Bash', 'SonarQube', 'Secure SDLC', 'Code review',
          'Agile / Scrum', 'Redis', 'Oracle SQL', 'Fundamentos de AWS',
        ],
      },
      {
        title: 'Conocimiento práctico',
        note: 'Usadas en proyectos, aún sin profundidad de producción',
        items: ['Go', 'Rust'],
      },
    ],
  },
  competitions: {
    label: 'Podios · 2026',
    title: 'Ingeniería competitiva',
    hostLabel: 'Evento',
    roleLabel: 'Rol',
    list: [
      {
        name: 'EcoSentinel',
        subtitle: 'Plataforma de predicción energética',
        place: 'Top 2',
        event: 'IAMinds Hackathon 2026 · alcance LATAM, organizado por Indra Group',
        context:
          'Construido para la UPTC (Universidad Pedagógica y Tecnológica de Colombia). Realizado durante el lanzamiento de NovaIA, el primer Centro de Excelencia en IA de Indra en Colombia.',
        role: 'Tech Lead y Desarrollador Backend',
        stats: [
          { value: '80', label: 'equipos' },
          { value: '283', label: 'participantes' },
          { value: '275k+', label: 'registros procesados' },
        ],
        description:
          'Diseño del sistema y arquitectura backend de una plataforma de predicción de consumo energético para la UPTC: 20 modelos de machine learning para 4 sedes universitarias (más de 31.500 estudiantes), consultable por WhatsApp, con análisis de causa raíz asistido por LLM para anomalías operativas. Construida en 36 horas.',
        links: [
          {
            label: 'GitHub',
            href: 'https://github.com/Olinky-HackDay-Indra-Hackaton/ecosentinel-uptc',
          },
        ],
      },
      {
        name: 'Roxy',
        subtitle: 'Gateway de seguridad para agentes de IA',
        place: 'Top 2',
        event: 'Platanus Hack 26 · Bogotá · Track AI Security',
        role: 'Desarrollador Backend',
        stats: [
          { value: '100', label: 'equipos seleccionados' },
          { value: '300+', label: 'postulantes' },
        ],
        description:
          'Una capa de seguridad que aplica autorización por cadena de delegación a agentes de IA que llaman servidores MCP: un motor de decisión determinista en Rust con auditoría formal de políticas basada en Z3. La autorización tratada como una propiedad demostrable, no como una corazonada en tiempo de ejecución.',
        links: [
          { label: 'GitHub', href: 'https://github.com/FreddyB200/Roxy' },
          { label: 'SDK en PyPI', href: 'https://pypi.org/project/roxy-guard/' },
          { label: 'Landing', href: 'https://landing.roxygt.lat' },
        ],
      },
      {
        name: 'Adkio',
        subtitle: 'Agente de campañas con IA',
        place: 'Top 2',
        event: 'The GTM Hackathon 2026 · 30x',
        context: 'Colombia y México. Organizado por 30x, cofundado por Andrés Bilbao (cofundador de Rappi).',
        role: 'Tech Lead',
        stats: [
          { value: '50', label: 'equipos' },
          { value: '300+', label: 'participantes' },
          { value: '36 h', label: 'para construirlo' },
        ],
        description:
          'Arquitectura y backend de un agente de IA que lanza campañas publicitarias a partir de lenguaje natural. FastAPI, React/TypeScript, Supabase con pgvector para RAG, LiteLLM.',
        links: [],
      },
    ],
  },
  credentials: {
    label: '03 / Trayectoria',
    title: 'Educación y credenciales',
    educationHeading: 'Educación',
    languagesHeading: 'Idiomas',
    credentialsHeading: 'Credenciales y distinciones',
    education: [
      {
        title: 'Ingeniería de Sistemas, pregrado',
        place: 'Fundación Universitaria Compensar · Bogotá',
        dates: '2024 – Actualidad',
      },
      { title: 'Tecnología en Análisis y Desarrollo de Software', place: 'SENA', dates: '2025 – 2027' },
    ],
    spoken: [
      { name: 'Español', level: 'Nativo' },
      {
        name: 'English',
        level: 'C1/C2 lectura y escucha, EF SET 76/100',
        href: 'https://cert.efset.org/en/kL3mbC',
        hrefLabel: 'Certificado EF SET',
      },
    ],
    items: [
      { title: 'Certificación en Desarrollo Seguro', detail: 'Estándar interno de BBVA, 88,37/100' },
      { title: 'Makers Fellowship 2026', detail: 'Coding Track, tasa de aceptación <1%' },
      { title: 'Aspire Leaders Program', detail: 'Fundado en Harvard University por profesores de HBS' },
      {
        title: 'Oracle',
        detail: 'Database Programming with SQL (2025–2031), Database Foundations, Database Design',
      },
      { title: 'Cisco PCAP', detail: 'Programming Essentials in Python' },
      { title: 'Scrum Fundamentals Certified', detail: 'Vabro.ai y VMEdu' },
    ],
  },
  footer: {
    headline: '¿Sistemas que no pueden permitirse caídas? Hablemos.',
    rights: 'Bogotá, Colombia',
  },
};

export const copy: Record<Lang, Copy> = { en, es };

/** Path of a page for a given language (English lives at the root). */
export const pathFor = (lang: Lang) => (lang === 'en' ? '/' : '/es/');
