export type Discipline = 'Development' | 'Design' | 'Infrastructure';

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  year: string;
  role: string;
  disciplines: Discipline[];
  description: string;
  stack: string[];
  liveUrl: string;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: 'afrovoy',
    index: '01',
    name: 'AfroVoy',
    year: '2025/2026',
    role: 'Full-stack developer',
    disciplines: ['Development', 'Design', 'Infrastructure'],
    description: 'Diaspora travel marketplace connecting travellers with Lagos stays and experiences.',
    stack: ['Next.js', 'Laravel'],
    liveUrl: 'https://afrovoy.com/',
    sections: [
      {
        heading: 'Overview',
        body: 'A digital bridge designed specifically for the African diaspora, streamlining how travellers discover, vet, and book authenticated short-term stays, boutique accommodation, and cultural experiences across Lagos.'
      },
      {
        heading: 'Architecture',
        body: 'Engineered with a high-performance Next.js presentation tier backed by Laravel APIs, handling booking reservation state, currency reconciliation, and merchant onboarding across regional banking rails.'
      }
    ]
  },
  {
    slug: 'hpm-electric',
    index: '02',
    name: 'HPM Electric',
    year: '2026',
    role: 'Full-stack developer',
    disciplines: ['Development', 'Infrastructure'],
    description: 'Astro site for a Pennsylvania electrical contractor, with a programmatic page matrix generating every service and service-area combination.',
    stack: ['Astro', 'TypeScript', 'Programmatic SEO', 'Schema.org'],
    liveUrl: 'https://www.hpmelectric.com/',
    sections: [
      {
        heading: 'Problem',
        body: 'A local contractor competing on search across eight townships needed depth of coverage no hand-built site could maintain.'
      },
      {
        heading: 'Build',
        body: 'Four service categories, roughly twenty sub-services and eight service areas generated from structured content into individually optimised landing pages, each with its own metadata, schema markup and localised copy.'
      },
      {
        heading: 'Detail',
        body: 'Lead capture appears at three points on every page (inline form, sticky call button, floating widget) so intent is never more than one tap from an enquiry.'
      }
    ]
  },
  {
    slug: 'thecampstack',
    index: '03',
    name: 'TheCampStack',
    year: '2026',
    role: 'Frontend developer',
    disciplines: ['Development'],
    description: 'Single-page React application for a camp software integration platform.',
    stack: ['React', 'JavaScript', 'SPA'],
    liveUrl: 'https://thecampstack.com/',
    sections: [
      {
        heading: 'System Architecture',
        body: 'A responsive single-page React application engineered to centralise youth and summer camp operations, unifying disparate scheduling platforms, camper registrations, and attendance reporting under one seamless operational interface.'
      },
      {
        heading: 'Interface Strategy',
        body: 'Constructed with a component architecture prioritizing rapid status recognition and touch-first usability for field staff operating outdoors on mobile and tablet devices.'
      }
    ]
  },
  {
    slug: 'district-9',
    index: '04',
    name: 'District 9 Branded Residences',
    year: '2026',
    role: 'Web developer',
    disciplines: ['Development', 'Design'],
    description: 'Sales site for a luxury branded-residence development in Abuja, built around investor lead capture.',
    stack: ['WordPress', 'Elementor', 'Gravity Forms'],
    liveUrl: 'https://district9brandedresidences.com/',
    sections: [
      {
        heading: 'Build',
        body: 'A two-step Expression of Interest form handling joint applicants, international address and country fields, identification details and document upload, with gated brochure and offer-letter downloads.'
      },
      {
        heading: 'Detail',
        body: "Unit-level pricing, an experiences sub-site and a booking flow for the development's beach amenity."
      }
    ]
  },
  {
    slug: 'all-grace',
    index: '05',
    name: 'All Grace African Market',
    year: '2026',
    role: 'Web developer',
    disciplines: ['Development', 'Design'],
    description: 'WooCommerce storefront for a UK African grocery retailer carrying several hundred SKUs.',
    stack: ['WordPress', 'WooCommerce', 'Elementor', 'Stripe'],
    liveUrl: 'https://allgraceafricanmarket.co.uk/',
    sections: [
      {
        heading: 'Problem',
        body: 'Customers in this market often prefer to complete an order over chat rather than checkout.'
      },
      {
        heading: 'Build',
        body: 'Every product carries both a standard add-to-cart and a Chat to Order action that opens WhatsApp pre-filled with the item name, price and URL, so the two paths run in parallel instead of competing.'
      },
      {
        heading: 'Detail',
        body: 'Fourteen merchandised category sections on the homepage, card and Stripe payments, and order tracking.'
      }
    ]
  },
  {
    slug: 'london-bible-academy',
    index: '06',
    name: 'London Bible Academy',
    year: '2026',
    role: 'Web developer',
    disciplines: ['Development'],
    description: 'Site and student portal for a UK-registered theological training charity.',
    stack: ['WordPress', 'Elementor', 'Membership', 'PayPal'],
    liveUrl: 'https://londonbibleacademy.com/',
    sections: [
      {
        heading: 'Build',
        body: 'Public marketing pages plus a gated layer with student registration, login and dashboard, alongside a course catalogue and resource library.'
      },
      {
        heading: 'Detail',
        body: 'PayPal donation flow supporting sponsored places for pastors.'
      }
    ]
  },
  {
    slug: 'aura-cayane',
    index: '07',
    name: 'Aura Cayane',
    year: '2025',
    role: 'Web developer',
    disciplines: ['Development', 'Design'],
    description: 'WooCommerce store for a fragrance brand selling into three currency markets.',
    stack: ['WordPress', 'WooCommerce', 'Elementor', 'Multi-currency'],
    liveUrl: 'https://auracayane.com/',
    sections: [
      {
        heading: 'Build',
        body: 'A currency switcher for naira, pound sterling and US dollar with customer accounts, wishlists and order tracking, plus quick-view product previews.'
      }
    ]
  },
  {
    slug: 'hytens',
    index: '08',
    name: 'HYTENS Solutions',
    year: '2026',
    role: 'Web developer',
    disciplines: ['Development', 'Design'],
    description: 'Corporate site for an enterprise ICT infrastructure provider.',
    stack: ['WordPress', 'Elementor'],
    liveUrl: 'https://hytens-services.com/',
    sections: [
      {
        heading: 'Build',
        body: 'Six service verticals and six industry segments structured so a visitor lands on their own sector quickly, with a quotation request as the single conversion goal throughout.'
      }
    ]
  },
  {
    slug: 'kunle-ilori-diamond',
    index: '09',
    name: 'Kúnlé Ìlòrí-Diamond',
    year: '2026',
    role: 'Web developer',
    disciplines: ['Development'],
    description: 'Personal site for a real estate entrepreneur with holdings across Dubai, the US, the UK and Nigeria.',
    stack: ['WordPress'],
    liveUrl: 'https://kunleiloridiamond.com/',
    sections: [
      {
        heading: 'Portfolio Architecture',
        body: 'Digital presence designed to articulate high-value international property holdings across the United Arab Emirates, North America, the United Kingdom, and West Africa, presenting executive credentials and portfolio acquisitions in an austere editorial layout.'
      },
      {
        heading: 'Investor Inquiries',
        body: 'Tailored lead pathways routing confidential acquisition inquiries directly to executive advisory staff.'
      }
    ]
  }
];
