import type { MainCategory } from "./categories";

export type Product = {
  id: string;
  name: string;
  /** Legacy display label — kept for backward compat with existing UI. */
  category: string;
  mainCategory: MainCategory;
  subCategory: string;
  collection?: string;
  price: number;
  salePrice?: number;
  rating: number;
  image: string;
  gallery: string[];
  description: string;
  material: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
};

/** Legacy display categories used by homepage cards. */
export const CATEGORIES = [
  "Lawn",
  "Embroidered Lawn",
  "Silk",
  "Luxury Bed Sheets",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "royal-emerald-gown",
    name: "Royal Emerald Embroidered Gown",
    category: "Embroidered Lawn",
    mainCategory: "Clothing",
    subCategory: "Lawn",
    collection: "Embroidered Lawn",
    price: 289,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=1400&q=80",
    ],
    description:
      "A regal statement piece featuring intricate hand embroidery in metallic gold thread. Crafted over 90 hours by master artisans.",
    material: "Pure silk with zardozi embroidery",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Emerald", "Onyx", "Ivory"],
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: "ivory-linen-kaftan",
    name: "Ivory Linen Heritage Kaftan",
    category: "Linen",
    mainCategory: "Clothing",
    subCategory: "Linen",
    price: 165,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Effortless elegance in breathable European linen with delicate tone-on-tone embroidery.",
    material: "100% Belgian linen",
    sizes: ["S", "M", "L"],
    colors: ["Ivory", "Sand", "Sage"],
    inStock: true,
    featured: true,
  },
  {
    id: "midnight-silk-bedset",
    name: "Midnight Silk Bed Set",
    category: "Luxury Bed Sheets",
    mainCategory: "Bed Sheets",
    subCategory: "Luxury Bed Sheets",
    price: 349,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "A four-piece mulberry silk bed set finished with hand-rolled gold piping.",
    material: "22 Momme mulberry silk",
    sizes: ["Queen", "King", "Super King"],
    colors: ["Midnight", "Champagne", "Emerald"],
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: "gold-thread-shawl",
    name: "Gold Thread Ceremonial Shawl",
    category: "Silk",
    mainCategory: "Clothing",
    subCategory: "Silk",
    price: 220,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1596993100471-c3905dafa78e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596993100471-c3905dafa78e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "A featherweight pashmina shawl embellished with fine gold-thread Mughal motifs.",
    material: "Cashmere-silk blend",
    sizes: ["One Size"],
    colors: ["Emerald", "Burgundy", "Cream"],
    inStock: true,
    featured: true,
  },
  {
    id: "peach-blossom-dress",
    name: "Peach Blossom Embroidered Dress",
    category: "Chiffon",
    mainCategory: "Clothing",
    subCategory: "Chiffon",
    price: 198,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1400&q=80"],
    description: "Soft peach chiffon layered over silk, with delicate floral thread work.",
    material: "Chiffon over silk lining",
    sizes: ["S", "M", "L"],
    colors: ["Peach", "Ivory"],
    inStock: true,
    isNew: true,
  },
  {
    id: "artisan-cotton-tunic",
    name: "Artisan Hand-loomed Tunic",
    category: "Premium Cotton",
    mainCategory: "Clothing",
    subCategory: "Cotton",
    collection: "Premium Cotton",
    price: 128,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571908599407-cdb918ed83bf?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1571908599407-cdb918ed83bf?auto=format&fit=crop&w=1400&q=80"],
    description: "Woven on traditional pit looms and finished with hand-stitched wooden buttons.",
    material: "Hand-loomed organic cotton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Natural", "Charcoal"],
    inStock: true,
  },
  {
    id: "ivory-cotton-bedset",
    name: "Ivory Egyptian Cotton Set",
    category: "Cotton Bed Sheets",
    mainCategory: "Bed Sheets",
    subCategory: "Cotton Bed Sheets",
    price: 189,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1400&q=80"],
    description: "800 thread-count long-staple Egyptian cotton with hand-embroidered scalloped edges.",
    material: "800TC Egyptian cotton",
    sizes: ["Queen", "King"],
    colors: ["Ivory", "Blush", "Sage"],
    inStock: true,
  },
  {
    id: "obsidian-velvet-jacket",
    name: "Obsidian Velvet Statement Jacket",
    category: "Velvet",
    mainCategory: "Clothing",
    subCategory: "Velvet",
    price: 415,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1400&q=80"],
    description: "Deep obsidian velvet tailored with a modern cut, lined in cream satin.",
    material: "Italian silk velvet",
    sizes: ["S", "M", "L"],
    colors: ["Obsidian", "Emerald"],
    inStock: false,
    isNew: true,
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
