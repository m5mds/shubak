export type Locale = 'ar' | 'en';

export interface Dictionary {
  site: {
    brand: string;
  };
  nav: {
    brand: string;
    services: string;
    about: string;
    contact: string;
    startProject: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    badge: string;
    heading1: string;
    heading2: string;
    highlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    sectionTag: string;
    sectionHeading: string;
    summary: string;
    cardAction: string;
  };
  about: {
    sectionTag: string;
    sectionHeading: string;
    statement: string;
    points: Array<{
      title: string;
      description: string;
    }>;
  };
  process: {
    sectionTag: string;
    sectionHeading: string;
    summary: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  cta: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    button: string;
    primaryAction: string;
    secondaryAction: string;
    highlights: string[];
    proofStrip: Array<{
      label: string;
      value: string;
    }>;
    storyEyebrow: string;
    storyBlocks: Array<{
      title: string;
      description: string;
    }>;
    trustLine: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    successMessage: string;
    requiredFields: string;
    invalidEmail: string;
    errorMessage: string;
    rateLimited: string;
    retry: string;
  };
  projects: {
    sectionTag: string;
    sectionHeading: string;
    subtitle: string;
    playVideo: string;
    closeModal: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  notFound: {
    code: string;
    title: string;
    backHome: string;
  };
  footer: {
    tagline: string;
    servicesCol: string;
    companyCol: string;
    connectCol: string;
    aboutLink: string;
    contactLink: string;
    copyright: string;
    location: string;
    global: string;
    connectItems: Array<{ label: string; href: string }>;
  };
}
