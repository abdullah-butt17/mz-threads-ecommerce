import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { formatPrice } from "@/lib/utils";
import { useAdminState } from "@/store/adminStore";
import {
  CLOTHING_SUBCATEGORIES,
  BEDSHEET_SUBCATEGORIES,
} from "@/data/categories";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().optional(),
  main: z.enum(["All", "Clothing", "Bed Sheets"]).optional(),
  sub: z.string().optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "rating"]).optional(),
});

export const Route = createFileRoute("/shop")({
  component: Shop,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — MZ Threads" },
      { name: "description", content: "Browse handcrafted luxury clothing (lawn, cotton, khaddar, silk, chiffon) and premium bed linens." },
    ],
  }),
});

const TABS = ["All Products", "Clothing", "Bed Sheets"] as const;

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products } = useAdminState();

  const initialTab: (typeof TABS)[number] =
    search.main === "Clothing" ? "Clothing" : search.main === "Bed Sheets" ? "Bed Sheets" : "All Products";

  const [tab, setTab] = useState<(typeof TABS)[number]>(initialTab);
  const [sub, setSub] = useState<string>(search.sub ?? "All");
  const [q, setQ] = useState(search.q ?? "");
  const [sort, setSort] = useState(search.sort ?? "featured");
  const [priceMax, setPriceMax] = useState<number | null>(null);

  const subOptions =
    tab === "Clothing" ? ["All", ...CLOTHING_SUBCATEGORIES] :
    tab === "Bed Sheets" ? ["All", ...BEDSHEET_SUBCATEGORIES] :
    [];

  const filtered = useMemo(() => {
    let list = products.slice();
    if (tab === "Clothing") list = list.filter((p) => p.mainCategory === "Clothing");
    else if (tab === "Bed Sheets") list = list.filter((p) => p.mainCategory === "Bed Sheets");
    if (sub !== "All") list = list.filter((p) => p.subCategory === sub);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) =>
        [p.name, p.subCategory, p.collection ?? "", p.material].some((f) => f.toLowerCase().includes(s)),
      );
    }
    if (priceMax !== null) {
      list = list.filter((p) => p.price <= priceMax);
    }
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [products, tab, sub, q, sort, priceMax]);

  const updateUrl = (patch: Partial<z.infer<typeof searchSchema>>) => {
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }) as never, replace: true });
  };

  const handleTab = (t: (typeof TABS)[number]) => {
    setTab(t);
    setSub("All");
    updateUrl({
      main: t === "Clothing" ? "Clothing" : t === "Bed Sheets" ? "Bed Sheets" : undefined,
      sub: undefined,
    });
  };

  return (
    <div>
      <section className="bg-[color:var(--cream)] py-20">
        <div className="container-luxe text-center">
          <SectionHeading
            eyebrow="The Collection"
            title="Shop MZ Threads"
            subtitle="Every piece is handmade to order. Filter below and message us on WhatsApp to reserve yours."
          />

          <div className="mt-10 inline-flex bg-white rounded-full p-1.5 shadow-[var(--shadow-card)] border border-border">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => handleTab(t)}
                className={`px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm tracking-wide transition-all ${
                  tab === t
                    ? "bg-[color:var(--emerald-deep)] text-[color:var(--cream)]"
                    : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {subOptions.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              {subOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSub(s); updateUrl({ sub: s === "All" ? undefined : s }); }}
                  className={`px-4 py-1.5 text-xs rounded-full border transition-all ${
                    sub === s
                      ? "bg-[color:var(--gold)] border-[color:var(--gold)] text-[color:var(--emerald-deep)] font-medium"
                      : "border-border bg-white hover:border-[color:var(--gold)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container-luxe py-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">
        <aside className="space-y-8 lg:sticky lg:top-28 h-fit">
          <div>
            <label className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)]">Search</label>
            <div className="relative mt-3">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--ink-soft)]" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); updateUrl({ q: e.target.value || undefined }); }}
                placeholder="Search products…"
                className="w-full pl-10 pr-9 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-[color:var(--emerald-brand)]"
              />
              {q && (
                <button
                  onClick={() => { setQ(""); updateUrl({ q: undefined }); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--ink-soft)]"
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)]">Sort</label>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value as never); updateUrl({ sort: e.target.value as never }); }}
              className="mt-3 w-full py-3 px-4 rounded-full border border-border bg-white text-sm outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)]">
                Price Range
              </label>
              <button
                type="button"
                onClick={() => setPriceMax(null)}
                className="text-xs text-[color:var(--ink-soft)] hover:text-[color:var(--emerald-brand)]"
              >
                Clear
              </button>
            </div>
            <p className="mt-2 text-xs text-[color:var(--ink-soft)]">
              {priceMax === null ? "Showing all products by default" : `Showing products up to ${formatPrice(priceMax)}`}
            </p>
            <input
              type="range"
              min={100}
              max={500}
              step={10}
              value={priceMax ?? 500}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full mt-4 accent-[color:var(--emerald-brand)]"
            />
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-[color:var(--ink-soft)]">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              {tab !== "All Products" && <> · <span className="text-[color:var(--emerald-brand)]">{tab}</span></>}
              {sub !== "All" && <> / <span>{sub}</span></>}
            </p>
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 border border-dashed border-border rounded-2xl"
            >
              <p className="font-display text-2xl text-[color:var(--emerald-deep)]">Nothing matches</p>
              <p className="text-sm text-[color:var(--ink-soft)] mt-2">Try a different category or clear the filters.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
