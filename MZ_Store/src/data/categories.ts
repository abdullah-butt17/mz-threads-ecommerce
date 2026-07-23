export type MainCategory = "Clothing" | "Bed Sheets";

export const MAIN_CATEGORIES: MainCategory[] = ["Clothing", "Bed Sheets"];

/** Clothing sub-categories with optional collection sets */
export const CLOTHING_TAXONOMY: Record<string, string[]> = {
  Lawn: ["Printed Lawn", "Embroidered Lawn", "Luxury Lawn"],
  Cotton: ["Printed Cotton", "Embroidered Cotton", "Premium Cotton"],
  Khaddar: ["Printed Khaddar", "Embroidered Khaddar", "Winter Khaddar"],
  Jacquard: ["Printed Jacquard", "Embroidered Jacquard", "Luxury Jacquard"],
  Linen: [],
  Chiffon: [],
  Silk: [],
  Organza: [],
  Velvet: [],
  Casual: [],
  Formal: [],
  "Party Wear": [],
  Bridal: [],
  Festive: [],
  Cultural: [],
};

export const CLOTHING_SUBCATEGORIES = Object.keys(CLOTHING_TAXONOMY);

export const BEDSHEET_SUBCATEGORIES = [
  "Cotton Bed Sheets",
  "Handmade Bed Sheets",
  "Embroidered Bed Sheets",
  "Printed Bed Sheets",
  "Luxury Bed Sheets",
  "Bridal Bed Sheets",
  "Kids Bed Sheets",
  "Premium Collection",
];

export function subcategoriesFor(main: MainCategory) {
  return main === "Clothing" ? CLOTHING_SUBCATEGORIES : BEDSHEET_SUBCATEGORIES;
}

export function collectionsFor(main: MainCategory, sub: string): string[] {
  if (main === "Clothing") return CLOTHING_TAXONOMY[sub] ?? [];
  return [];
}
