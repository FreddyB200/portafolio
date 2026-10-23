// Single source of truth for every piece of copy on the site, in English and Spanish.
// Dates and figures must match the CV (public/freddy-bautista-cv.pdf) and LinkedIn exactly.

export type Lang = 'en' | 'es';
export const langs: Lang[] = ['en', 'es'];

export const site = {
  name: 'Freddy Bautista Baquero',
  url: 'https://freddybautista.me',
};

export const links = {
  github: 'https://github.com/FreddyB200',
  linkedin: 'https://www.linkedin.com/in/freddy-bautista-baquero',
  resume: '/freddy-bautista-cv.pdf',
};

/**
 * The email address never appears in the HTML. It is stored reversed + base64 and only decoded
 * in the browser when a visitor clicks "Email me" or "Copy" (keeps scrapers from harvesting it).
 */
export const emailToken = Buffer.from('freddybautistadev@gmail.com'.split('').reverse().join('')).toString('base64');

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
  /** Optional architecture flow, drawn in HTML so it reads well on phones. */
  diagram?: { label: string; steps: { title: string; detail: string }[]; footnote?: string };
  /** Optional proof, shown in a closed "Evidence" disclosure (organizer page, video, post, photos). */
  evidence?: { label: string; href: string }[];
  /** File names inside src/assets/evidence/ */
  images?: { file: string; alt: string }[];
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
    hide: string;
    show: string;
    emailMe: string;
    copy: string;
    copied: string;
    copyEmailLabel: string;
    noJs: string;
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
  competitions: { label: string; title: string; hostLabel: string; roleLabel: string; evidenceLabel: string; list: Podium[] };
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
    hide: 'Hide',
    show: 'Show',
    emailMe: 'Email me',
    copy: 'Copy email',
    copied: 'Copied',
    copyEmailLabel: 'Copy email address to clipboard',
    noJs: 'The email address needs JavaScript. Reach me on LinkedIn instead.',
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
      "I work on BBVA's instant payments rail (ACH, Bre-B and Redeban), where a transaction has a few hundred milliseconds to resolve and \"we'll fix it tomorrow\" isn't an option. Java and Spring Boot, with a secure development certification earned before touching the codebase.",
      'Before banking I ran production systems with small teams: a 24/7 camera streaming service, ERP and billing modules, Linux servers. It taught me to design for the moment things break. Top 2 in three LATAM engineering competitions.',
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
          'I build the backend services behind real-time transfers over ACH, Bre-B and Redeban, in a distributed, event-driven architecture. Every change is tested (JUnit, Mockito), gated by SonarQube and shipped with a rollback plan; when a payment fails across services, I trace it end to end.',
        ],
        tags: ['Java', 'Event-driven architecture', 'Distributed systems', 'Oracle', 'JUnit', 'SonarQube', 'Scrum'],
      },
      {
        dates: 'Feb 2025 – Feb 2026',
        company: 'ESCOLE Experiencias Educativas',
        role: 'Fullstack Developer',
        place: 'Bogotá · On-site',
        story: [
          'I built an equipment management platform that more than five departments adopted, shipped with tests and documentation, and owned the production backend end to end: REST APIs on Docker, Linux servers, incidents. I also built a 24/7 streaming service in FastAPI for 16 cameras.',
        ],
        tags: ['React', 'Google Apps Script', 'FastAPI', 'Docker', 'Linux', 'PostgreSQL'],
      },
      {
        dates: 'Feb 2024 – Feb 2025',
        company: 'Serviportenal SAS',
        role: 'Java Developer',
        place: 'Bogotá · Remote',
        story: [
          'I built a multi-module ERP in Java 17 and Spring Boot (billing, contracts, clients): PostgreSQL schema, REST API against OpenAPI contracts, and requirements gathered directly with the business.',
        ],
        tags: ['Java 17', 'Spring Boot', 'PostgreSQL', 'OpenAPI'],
      },
    ],
  },
  skills: {
    label: '02 / Technical skills',
    title: 'Grouped by real depth',
    groups: [
      {
        title: 'Production',
        note: 'Real users and shipped products',
        items: [
          'Java 17', 'Spring Boot', 'Spring Security', 'REST / OpenAPI', 'JPA/Hibernate', 'Python',
          'FastAPI', 'PostgreSQL', 'Docker', 'Linux', 'React', 'TypeScript', 'Supabase', 'n8n',
          'LLM integrations (OpenAI, Gemini, LiteLLM)',
        ],
      },
      {
        title: 'Infrastructure & practices',
        note: 'How the work ships and stays alive',
        items: [
          'CI/CD', 'Jenkins', 'Artifactory', 'Git', 'Bash', 'SonarQube', 'JUnit / Mockito', 'Secure SDLC',
          'Redis', 'Oracle SQL', 'AWS fundamentals',
        ],
      },
      {
        title: 'Working knowledge',
        note: 'Used on projects, not yet in production',
        items: ['Go', 'Rust'],
      },
    ],
  },
  competitions: {
    label: 'Podium finishes · 2026',
    title: 'Competitive engineering',
    hostLabel: 'Event',
    roleLabel: 'Role',
    evidenceLabel: 'Evidence',
    list: [
      {
        name: 'EcoSentinel',
        subtitle: 'Energy Prediction Platform',
        place: 'Top 2',
        event: 'IAMinds Hackathon 2026 · LATAM · Indra Group',
        context:
          "Built for UPTC, at the launch of Indra's NovaIA AI Center of Excellence.",
        role: 'Tech Lead & Backend Developer',
        stats: [
          { value: '80', label: 'teams' },
          { value: '283', label: 'participants' },
          { value: '275k+', label: 'records processed' },
        ],
        description:
          'Backend architecture for an energy prediction platform serving 4 campuses and 31,500+ students: 20 ML forecasting models, queried over WhatsApp, with LLM-assisted root-cause analysis of anomalies. Built in 36 hours.',
        links: [
          {
            label: 'GitHub',
            href: 'https://github.com/Olinky-HackDay-Indra-Hackaton/ecosentinel-uptc',
          },
        ],
        evidence: [{ label: 'NovaIA launch coverage (Forbes Colombia)', href: 'https://forbes.co/2026/02/19/ia/inauguran-centro-de-inteligencia-artificial-en-tunja-operara-para-america-latina' }],
        diagram: {
          label: 'How a WhatsApp question becomes a forecast',
          steps: [
            { title: 'WhatsApp', detail: 'Text or voice note from a campus manager' },
            { title: 'Evolution API + n8n', detail: 'Whisper transcribes audio, GPT-4o-mini detects intent' },
            { title: 'FastAPI', detail: '20 Prophet models (4 campuses × 5 sectors), Z-score anomaly detector, Gemini recommendations' },
            { title: 'Supabase PostgreSQL', detail: 'Consumption data and model outputs' },
          ],
          footnote: 'A Streamlit + Plotly dashboard queries the same FastAPI directly. Deployed with Docker Compose.',
        },
      },
      {
        name: 'Roxy',
        subtitle: 'Security Gateway for AI Agents',
        place: 'Top 2',
        event: 'Platanus Hack 26 · Bogotá · AI Security track',
        role: 'Backend Developer',
        stats: [
          { value: '100', label: 'participants selected' },
          { value: '300+', label: 'applicants' },
        ],
        description:
          'A security layer that authorizes what AI agents can do when calling MCP servers: a deterministic Rust decision engine with Z3-based formal policy auditing.',
        links: [
          { label: 'GitHub', href: 'https://github.com/FreddyB200/Roxy' },
          { label: 'PyPI SDK', href: 'https://pypi.org/project/roxy-guard/' },
          { label: 'Landing', href: 'https://landing.roxygt.lat' },
        ],
        diagram: {
          label: 'What happens to every agent call',
          steps: [
            { title: 'AI agent', detail: 'Calls an MCP server, never holding its credentials' },
            { title: 'Gateway (Go)', detail: 'Intercepts the call and asks the verifier before anything runs' },
            { title: 'Verifier (Rust + Z3)', detail: 'Deterministic verdict on a policy frozen from natural-language rules; Z3 audits the policy for loopholes' },
            { title: 'MCP server', detail: 'Credentials are injected only if approved; otherwise the caller gets a 403' },
          ],
          footnote: 'Every verdict is logged to a live dashboard and anchored on Solana devnet. Infrastructure in Terraform behind CloudFront.',
        },
      },
      {
        name: 'Adkio',
        subtitle: 'AI Campaign Agent',
        place: 'Top 2',
        event: 'The GTM Hackathon 2026 · 30x',
        context: 'Colombia & Mexico, organized by 30x.',
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
      { title: 'Aspire Leaders Program', detail: 'Leadership program founded at Harvard' },
      {
        title: 'Oracle',
        detail: 'Database Programming with SQL (2025–2031), Database Foundations',
      },
      { title: 'Cisco PCAP', detail: 'Programming Essentials in Python' },
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
    hide: 'Ocultar',
    show: 'Mostrar',
    emailMe: 'Escríbeme',
    copy: 'Copiar correo',
    copied: 'Copiado',
    copyEmailLabel: 'Copiar el correo al portapapeles',
    noJs: 'El correo necesita JavaScript. Escríbeme por LinkedIn.',
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
      'Trabajo en el riel de pagos inmediatos de BBVA (ACH, Bre-B y Redeban), donde una transacción tiene unos cientos de milisegundos para resolverse y «lo arreglamos mañana» no es una opción. Java y Spring Boot, con una certificación en desarrollo seguro obtenida antes de tocar el código.',
      'Antes de la banca operé sistemas en producción con equipos pequeños: un servicio de streaming de cámaras 24/7, módulos de ERP y facturación, servidores Linux. Me enseñó a diseñar para el momento en que las cosas fallan. Top 2 en tres competencias de ingeniería en LATAM.',
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
          'Construyo los servicios backend detrás de las transferencias en tiempo real por ACH, Bre-B y Redeban, en una arquitectura distribuida y orientada a eventos. Cada cambio se prueba (JUnit, Mockito), pasa por SonarQube y sale con plan de rollback; cuando un pago falla entre servicios, lo sigo de punta a punta.',
        ],
        tags: ['Java', 'Event-driven architecture', 'Distributed systems', 'Oracle', 'JUnit', 'SonarQube', 'Scrum'],
      },
      {
        dates: 'Feb 2025 – Feb 2026',
        company: 'ESCOLE Experiencias Educativas',
        role: 'Desarrollador Fullstack',
        place: 'Bogotá · Presencial',
        story: [
          'Construí una plataforma de gestión de equipos que más de cinco departamentos adoptaron, entregada con pruebas y documentación, y fui responsable del backend en producción de punta a punta: APIs REST en Docker, servidores Linux e incidentes. También construí un servicio de streaming 24/7 en FastAPI para 16 cámaras.',
        ],
        tags: ['React', 'Google Apps Script', 'FastAPI', 'Docker', 'Linux', 'PostgreSQL'],
      },
      {
        dates: 'Feb 2024 – Feb 2025',
        company: 'Serviportenal SAS',
        role: 'Desarrollador Java',
        place: 'Bogotá · Remoto',
        story: [
          'Construí un ERP multimódulo en Java 17 y Spring Boot (facturación, contratos, clientes): esquema de PostgreSQL, API REST sobre contratos OpenAPI y requisitos levantados directamente con el negocio.',
        ],
        tags: ['Java 17', 'Spring Boot', 'PostgreSQL', 'OpenAPI'],
      },
    ],
  },
  skills: {
    label: '02 / Habilidades técnicas',
    title: 'Agrupadas por profundidad real',
    groups: [
      {
        title: 'Producción',
        note: 'Usuarios reales y productos entregados',
        items: [
          'Java 17', 'Spring Boot', 'Spring Security', 'REST / OpenAPI', 'JPA/Hibernate', 'Python',
          'FastAPI', 'PostgreSQL', 'Docker', 'Linux', 'React', 'TypeScript', 'Supabase', 'n8n',
          'Integraciones LLM (OpenAI, Gemini, LiteLLM)',
        ],
      },
      {
        title: 'Infraestructura y prácticas',
        note: 'Cómo se entrega y se mantiene vivo',
        items: [
          'CI/CD', 'Jenkins', 'Artifactory', 'Git', 'Bash', 'SonarQube', 'JUnit / Mockito', 'Secure SDLC',
          'Redis', 'Oracle SQL', 'Fundamentos de AWS',
        ],
      },
      {
        title: 'Conocimiento práctico',
        note: 'En proyectos, aún no en producción',
        items: ['Go', 'Rust'],
      },
    ],
  },
  competitions: {
    label: 'Podios · 2026',
    title: 'Ingeniería competitiva',
    hostLabel: 'Evento',
    roleLabel: 'Rol',
    evidenceLabel: 'Evidencia',
    list: [
      {
        name: 'EcoSentinel',
        subtitle: 'Plataforma de predicción energética',
        place: 'Top 2',
        event: 'IAMinds Hackathon 2026 · LATAM · Indra Group',
        context:
          'Construido para la UPTC, en el lanzamiento de NovaIA, el Centro de Excelencia en IA de Indra.',
        role: 'Tech Lead y Desarrollador Backend',
        stats: [
          { value: '80', label: 'equipos' },
          { value: '283', label: 'participantes' },
          { value: '275k+', label: 'registros procesados' },
        ],
        description:
          'Arquitectura backend de una plataforma de predicción energética para 4 sedes y más de 31.500 estudiantes: 20 modelos de ML, consultable por WhatsApp, con análisis de causa raíz de anomalías asistido por LLM. Construida en 36 horas.',
        links: [
          {
            label: 'GitHub',
            href: 'https://github.com/Olinky-HackDay-Indra-Hackaton/ecosentinel-uptc',
          },
        ],
        evidence: [{ label: 'Lanzamiento de NovaIA (Forbes Colombia)', href: 'https://forbes.co/2026/02/19/ia/inauguran-centro-de-inteligencia-artificial-en-tunja-operara-para-america-latina' }],
        diagram: {
          label: 'Cómo una pregunta por WhatsApp se convierte en un pronóstico',
          steps: [
            { title: 'WhatsApp', detail: 'Texto o nota de voz de un responsable de sede' },
            { title: 'Evolution API + n8n', detail: 'Whisper transcribe el audio, GPT-4o-mini detecta la intención' },
            { title: 'FastAPI', detail: '20 modelos Prophet (4 sedes × 5 sectores), detector de anomalías por Z-score, recomendaciones con Gemini' },
            { title: 'Supabase PostgreSQL', detail: 'Datos de consumo y resultados de los modelos' },
          ],
          footnote: 'Un dashboard en Streamlit + Plotly consulta el mismo FastAPI directamente. Desplegado con Docker Compose.',
        },
      },
      {
        name: 'Roxy',
        subtitle: 'Gateway de seguridad para agentes de IA',
        place: 'Top 2',
        event: 'Platanus Hack 26 · Bogotá · Track AI Security',
        role: 'Desarrollador Backend',
        stats: [
          { value: '100', label: 'participantes seleccionados' },
          { value: '300+', label: 'postulantes' },
        ],
        description:
          'Una capa de seguridad que autoriza lo que los agentes de IA pueden hacer al llamar servidores MCP: un motor de decisión determinista en Rust con auditoría formal de políticas basada en Z3.',
        links: [
          { label: 'GitHub', href: 'https://github.com/FreddyB200/Roxy' },
          { label: 'SDK en PyPI', href: 'https://pypi.org/project/roxy-guard/' },
          { label: 'Landing', href: 'https://landing.roxygt.lat' },
        ],
        diagram: {
          label: 'Qué pasa con cada llamada de un agente',
          steps: [
            { title: 'Agente de IA', detail: 'Llama a un servidor MCP sin tener nunca sus credenciales' },
            { title: 'Gateway (Go)', detail: 'Intercepta la llamada y consulta al verificador antes de ejecutar nada' },
            { title: 'Verificador (Rust + Z3)', detail: 'Veredicto determinista sobre una política congelada a partir de reglas en lenguaje natural; Z3 audita la política en busca de huecos' },
            { title: 'Servidor MCP', detail: 'Las credenciales se inyectan solo si se aprueba; si no, quien llama recibe un 403' },
          ],
          footnote: 'Cada veredicto queda en un dashboard en vivo y anclado en Solana devnet. Infraestructura en Terraform detrás de CloudFront.',
        },
      },
      {
        name: 'Adkio',
        subtitle: 'Agente de campañas con IA',
        place: 'Top 2',
        event: 'The GTM Hackathon 2026 · 30x',
        context: 'Colombia y México, organizado por 30x.',
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
      { title: 'Aspire Leaders Program', detail: 'Programa de liderazgo fundado en Harvard' },
      {
        title: 'Oracle',
        detail: 'Database Programming with SQL (2025–2031), Database Foundations',
      },
      { title: 'Cisco PCAP', detail: 'Programming Essentials in Python' },
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
