import { formatPrice } from "@/lib/utils";

export function buildWhatsAppUrl(productName: string, price?: number, numberOverride?: string) {
  const number = numberOverride?.replace(/[^\d+]/g, "") || "923000000000";
  const msg = [
    "Hello,",
    "I am interested in this product.",
    "",
    `Product: ${productName}`,
    price !== undefined ? `Price: ${formatPrice(price)}` : null,
    "",
    "Please let me know if it is available.",
    "Thank you.",
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

export function generalWhatsAppUrl(message = "Hello, I would like to know more about MZ Threads.", numberOverride?: string) {
  const number = numberOverride?.replace(/[^\d+]/g, "") || "923000000000";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
