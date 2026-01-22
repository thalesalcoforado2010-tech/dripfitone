// data/products.ts
export type Gender = "male" | "female";

export type Size = "PP" | "P" | "M" | "G" | "GG";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: "BRL";
  gender: Gender;

  // Imagem principal (pode ser /public/...)
  heroImage: string;

  // Detalhes extras para a página do produto
  highlights: string[];
  details: string[];

  // Compra (mini-checkout)
  sizes?: Size[];
  defaultSize?: Size;

  // SEO
  seo?: {
    title?: string;
    description?: string;
  };
};

export const products: Product[] = [
  {
    slug: "dripfit-black-core-tee",
    name: "Black Core Tee",
    tagline: "Essencial, preciso, premium.",
    description:
      "Camiseta premium com caimento limpo, toque macio e presença silenciosa. Minimalismo com peso.",
    price: 159.9,
    currency: "BRL",
    gender: "male",
    heroImage: "/products/black-core-tee.jpg",
    highlights: [
      "Algodão premium com toque macio",
      "Caimento alinhado (sem excesso)",
      "Acabamento limpo e premium",
    ],
    details: [
      "Modelagem: regular premium",
      "Gola: reforçada e discreta",
      "Sensação: macia e estruturada",
    ],
    sizes: ["P", "M", "G", "GG"],
    defaultSize: "M",
    seo: {
      title: "Black Core Tee — DripFit One",
      description:
        "Camiseta premium minimalista, caimento alinhado e acabamento limpo. Essencial com presença silenciosa.",
    },
  },
  {
    slug: "dripfit-stone-overshirt",
    name: "Stone Overshirt",
    tagline: "Camadas com autoridade.",
    description:
      "Overshirt estruturada, textura elegante, feita pra elevar o look com sobriedade e impacto.",
    price: 279.9,
    currency: "BRL",
    gender: "male",
    heroImage: "/products/stone-overshirt.jpg",
    highlights: ["Estrutura premium", "Textura sofisticada", "Versatilidade total"],
    details: [
      "Modelagem: levemente ampla (premium)",
      "Construção: firme e confortável",
      "Uso: camisa ou terceira peça",
    ],
    sizes: ["P", "M", "G", "GG"],
    defaultSize: "M",
  },
  {
    slug: "dripfit-carbon-jogger",
    name: "Carbon Jogger",
    tagline: "Mobilidade limpa.",
    description:
      "Jogger premium com linha minimalista e conforto real. Feita pra movimento — sem ruído visual.",
    price: 219.9,
    currency: "BRL",
    gender: "male",
    heroImage: "/products/carbon-jogger.jpg",
    highlights: ["Conforto premium", "Linha minimalista", "Acabamento refinado"],
    details: ["Cós: firme e confortável", "Barra: ajuste clean", "Toque: macio"],
    sizes: ["P", "M", "G", "GG"],
    defaultSize: "M",
  },

  {
    slug: "dripfit-noir-sculpt-top",
    name: "Noir Sculpt Top",
    tagline: "Forma e presença.",
    description:
      "Top premium com construção que valoriza linhas e entrega segurança. Minimalismo que se impõe.",
    price: 149.9,
    currency: "BRL",
    gender: "female",
    heroImage: "/products/noir-sculpt-top.jpg",
    highlights: ["Sustentação confortável", "Linha limpa", "Toque premium"],
    details: [
      "Sensação: firme e macia",
      "Acabamento: limpo",
      "Uso: treino e lifestyle",
    ],
    sizes: ["PP", "P", "M", "G"],
    defaultSize: "M",
  },
  {
    slug: "dripfit-onyx-flow-legging",
    name: "Onyx Flow Legging",
    tagline: "Movimento sem distrações.",
    description:
      "Legging premium com compressão equilibrada e acabamento sofisticado. Elegante, técnica e atemporal.",
    price: 199.9,
    currency: "BRL",
    gender: "female",
    heroImage: "/products/onyx-flow-legging.jpg",
    highlights: ["Compressão equilibrada", "Cintura alta clean", "Acabamento premium"],
    details: ["Cós: cintura alta", "Construção: firme", "Mobilidade: alta"],
    sizes: ["PP", "P", "M", "G", "GG"],
    defaultSize: "M",
  },
  {
    slug: "dripfit-ivory-layer-hoodie",
    name: "Ivory Layer Hoodie",
    tagline: "Conforto com estética premium.",
    description:
      "Hoodie premium com textura macia e presença minimalista. Uma camada que resolve o look.",
    price: 259.9,
    currency: "BRL",
    gender: "female",
    heroImage: "/products/ivory-layer-hoodie.jpg",
    highlights: ["Toque macio", "Caimento premium", "Estética clean"],
    details: ["Modelagem: premium", "Punhos: firmes", "Uso: diário e pós-treino"],
    sizes: ["P", "M", "G", "GG"],
    defaultSize: "M",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getProductsByGender(gender: Gender) {
  return products.filter((p) => p.gender === gender);
}
