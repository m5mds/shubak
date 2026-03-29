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
      ar: 'تطوير تطبيقات الويب والجوال',
      en: 'Web & Mobile App Development',
    },
    description: {
      ar: 'نبني تطبيقات متكاملة من الفكرة إلى الإطلاق، مع تركيز على الأداء والاستقرار.',
      en: 'We build complete applications from idea to launch, focused on performance and stability.',
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
      ar: 'حلول ذكية مدعومة بالذكاء الاصطناعي',
      en: 'Smart Solutions Powered by AI',
    },
    description: {
      ar: 'نحوّل النماذج الذكية إلى أدوات عملية داخل منتجاتك.',
      en: 'We turn intelligent models into practical tools inside your products.',
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
      ar: 'الأتمتة',
      en: 'Automation',
    },
    description: {
      ar: 'نقوم بأتمتة العمليات لتقليل الجهد اليدوي وزيادة الكفاءة.',
      en: 'We automate processes to reduce manual effort and increase efficiency.',
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
      ar: 'تصميم واجهات المستخدم وتجربة المستخدم',
      en: 'UI/UX Design',
    },
    description: {
      ar: 'نصمم تجارب واضحة وسهلة الاستخدام مبنية على فهم المستخدم.',
      en: 'We design clear, easy-to-use experiences built on understanding your users.',
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
