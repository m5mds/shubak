import type { Locale } from './i18n/types'

export interface BilingualText {
  ar: string
  en: string
}

export interface ServiceData {
  slug: string
  number: string
  title: BilingualText
  description: BilingualText
  subServices: BilingualText[]
  tools: string
}

export interface LocalizedServiceCard {
  id: string
  slug: string
  title: string
  description: string
  subs: string[]
  tools: string[]
}

export const services: ServiceData[] = [
  {
    slug: 'web-mobile',
    number: '01',
    title: {
      ar: 'تطوير الويب والموبايل',
      en: 'Web & Mobile Development',
    },
    description: {
      ar: 'تطبيقات متكاملة مبنية للتوسّع — من المنصات الرقمية إلى تطبيقات الهاتف.',
      en: 'Full-stack applications built for scale — from responsive platforms to native mobile experiences.',
    },
    subServices: [
      { ar: 'واجهات أمامية (React / Next.js)', en: 'Frontend Platforms (React / Next.js)' },
      { ar: 'واجهات خلفية وخدمات مصغّرة (Node / Python)', en: 'Backend APIs & Microservices (Node / Python)' },
      { ar: 'تطبيقات موبايل متعددة المنصات (Flutter / React Native)', en: 'Mobile & Cross-platform (Flutter / React Native)' },
      { ar: 'بنية تحتية سحابية و CI/CD', en: 'Cloud Infrastructure & CI/CD' },
    ],
    tools: 'React, Next.js, Flutter, Node.js, Python, AWS, Docker',
  },
  {
    slug: 'ai-solutions',
    number: '02',
    title: {
      ar: 'حلول الذكاء الاصطناعي',
      en: 'AI Solutions',
    },
    description: {
      ar: 'ذكاء اصطناعي جاهز للإنتاج — من تطبيقات النماذج اللغوية إلى الرؤية الحاسوبية والأتمتة الذكية.',
      en: 'Production-ready AI — from LLM-powered apps to computer vision and intelligent automation.',
    },
    subServices: [
      { ar: 'تطبيقات النماذج اللغوية الكبيرة و RAG', en: 'LLM Applications & RAG Systems' },
      { ar: 'أنظمة الرؤية الحاسوبية', en: 'Computer Vision Pipelines' },
      { ar: 'ضبط النماذج وتحسين الأداء', en: 'Model Fine-tuning & Optimization' },
      { ar: 'وكلاء ذكاء اصطناعي وأتمتة سير العمل', en: 'AI Agents & Workflow Automation' },
    ],
    tools: 'Python, PyTorch, OpenAI, LangChain, HuggingFace',
  },
  {
    slug: 'automation-devops',
    number: '03',
    title: {
      ar: 'الأتمتة و DevOps',
      en: 'Automation & DevOps',
    },
    description: {
      ar: 'بنية تحتية تدير نفسها — أنابيب نشر مؤتمتة، مراقبة، ونشر بدون توقّف.',
      en: 'Infrastructure that runs itself — automated pipelines, monitoring, and zero-downtime deployment.',
    },
    subServices: [
      { ar: 'تصميم أنابيب CI/CD', en: 'CI/CD Pipeline Design' },
      { ar: 'إدارة الحاويات (Docker / Kubernetes)', en: 'Container Orchestration (Docker / Kubernetes)' },
      { ar: 'البنية التحتية ككود (Terraform / Pulumi)', en: 'Infrastructure as Code (Terraform / Pulumi)' },
      { ar: 'المراقبة والتنبيهات', en: 'Monitoring, Logging & Alerting' },
    ],
    tools: 'Docker, Kubernetes, Terraform, GitHub Actions, AWS, GCP',
  },
  {
    slug: 'ui-ux-design',
    number: '04',
    title: {
      ar: 'تصميم واجهات المستخدم',
      en: 'UI/UX Design',
    },
    description: {
      ar: 'واجهات مبنية على البحث والتحليل — من الاكتشاف إلى أنظمة تصميم جاهزة للتطوير.',
      en: 'Research-driven interfaces from discovery to pixel-perfect systems developers can build.',
    },
    subServices: [
      { ar: 'بحث المستخدمين واستراتيجية المنتج', en: 'User Research & Strategy' },
      { ar: 'نماذج أولية تفاعلية', en: 'Wireframes & Interactive Prototypes' },
      { ar: 'أنظمة تصميم ومكتبات مكوّنات', en: 'Design Systems & Component Libraries' },
      { ar: 'تسليم للمطوّرين ومراجعة الجودة', en: 'Developer Handoff & QA' },
    ],
    tools: 'Figma, Framer, Adobe CC',
  },
]

/** Helper — returns the service matching a given slug, or undefined */
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug)
}

/** Helper — returns localised field value */
export function localise(field: BilingualText, locale: Locale): string {
  return field[locale]
}

export function getLocalizedServiceList(locale: Locale): LocalizedServiceCard[] {
  return services.map((service) => ({
    id: service.number,
    slug: service.slug,
    title: localise(service.title, locale),
    description: localise(service.description, locale),
    subs: service.subServices.map((subService) => localise(subService, locale)),
    tools: service.tools.split(', '),
  }))
}
