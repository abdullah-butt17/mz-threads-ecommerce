import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaWhatsapp, FaStar, FaAward, FaTruck, FaHeart, FaGem, FaHandsHelping } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { formatPrice } from "@/lib/utils";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { useAdminState } from "@/store/adminStore";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "MZ Threads — Handcrafted Luxury Clothing & Home Textiles" },
      { name: "description", content: "Discover handmade embroidered dresses, luxury clothing, and premium bed linens at MZ Threads. Order directly on WhatsApp." },
    ],
  }),
});

const CATEGORY_IMAGES: Record<string, string> = {
  "Lawn": "https://res.cloudinary.com/ntx8ixhh/image/upload/v1784719269/images_blbm6t.jpg",
  "Embroidered Lawn": "https://res.cloudinary.com/ntx8ixhh/image/upload/v1784812296/U5065SU-3PC-014-3PieceLawnSuit-Embroidered_Unstitched_5_vydoxq.jpg",
  "Silk": "https://res.cloudinary.com/ntx8ixhh/image/upload/v1784194409/images_1_z0oirz.jpg",
  "Premium Bed Sheets": "https://res.cloudinary.com/ntx8ixhh/image/upload/v1784193208/images3_izgxu8.jpg",
};

const CATEGORY_ITEMS = ["Lawn", "Embroidered Lawn", "Silk", "Premium Bed Sheets"] as const;

const FEATURES = [
  { Icon: FaGem, title: "Premium Quality", desc: "Only the finest silks, linens & cottons." },
  { Icon: FaHandsHelping, title: "Handmade", desc: "Every piece touched by master artisans." },
  { Icon: FaTruck, title: "Fast Delivery", desc: "Carefully packaged & shipped worldwide." },
  { Icon: FaHeart, title: "Customer Care", desc: "Personal styling on WhatsApp, always." },
  { Icon: FaAward, title: "Luxury Design", desc: "Heritage motifs, contemporary silhouettes." },
];

const TESTIMONIALS = [
  { name: "Amina S.", role: "Dubai", text: "The emerald gown took my breath away — the embroidery is unlike anything I've seen from an atelier." },
  { name: "Yasmin R.", role: "London", text: "My silk bed set arrived beautifully packaged. The quality rivals brands three times the price." },
  { name: "Layla K.", role: "Karachi", text: "MZ Threads styled me for my sister's wedding. Effortless, personal, and truly luxurious." },
];

function Home() {
  const { products, settings } = useAdminState();
  const featured = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--emerald-deep)]/95 via-[color:var(--emerald-deep)]/70 to-[color:var(--emerald-deep)]/30" />
        </div>

        <div className="container-luxe relative min-h-[86vh] flex items-center py-24">
          <div className="max-w-2xl text-[color:var(--cream)]">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[color:var(--gold)] eyebrow"
            >
              MZ Threads · Est. Heritage
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="mt-6 text-5xl md:text-7xl lg:text-8xl font-display leading-[1.05]"
            >
              Where Tradition <br />
              Meets <em className="text-[color:var(--gold)] not-italic">Elegance</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="mt-8 text-lg text-[color:var(--cream)]/85 max-w-lg leading-relaxed"
            >
              A private atelier of handcrafted clothing, embroidered heirlooms, and luxury home textiles — made slowly, made beautifully.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/shop" className="btn-gold">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[color:var(--cream)]/60 text-xs tracking-[0.3em] uppercase"
        >
          Scroll
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Curated Collections"
            title="Explore Our Categories"
            subtitle="Four worlds of craft, one philosophy of quiet luxury."
          />
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORY_ITEMS.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  to="/shop"
                  search={{ category: cat } as never}
                  className="group block relative aspect-[3/4] rounded-2xl overflow-hidden"
                >
                  <img
                    src={CATEGORY_IMAGES[cat]}
                    alt={cat}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--emerald-deep)]/90 via-transparent to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 text-[color:var(--cream)]">
                    <h3 className="text-xl font-display">{cat}</h3>
                    <div className="mt-2 flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[color:var(--gold)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      Explore <FiArrowRight />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24 bg-[color:var(--cream)]">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Signature Pieces"
            title="Featured Products"
            subtitle="Our most beloved creations, handpicked by the atelier."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS - horizontal */}
      <section className="py-24 bg-white">
        <div className="container-luxe">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="eyebrow">Just Arrived</span>
              <h2 className="text-3xl md:text-5xl font-display mt-3 text-[color:var(--emerald-deep)]">
                New Arrivals
              </h2>
            </div>
            <Link to="/shop" className="text-sm underline underline-offset-4 hover:text-[color:var(--gold)]">
              View all
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-5 px-5 [scrollbar-width:thin]">
            {newArrivals.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="min-w-[280px] md:min-w-[360px] snap-start"
              >
                <Link to="/product/$id" params={{ id: p.id }} className="group block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[color:var(--cream)]">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute top-4 left-4 bg-[color:var(--gold)] text-[color:var(--emerald-deep)] text-[10px] tracking-[0.24em] uppercase px-3 py-1 rounded-full font-semibold">
                      New
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-[color:var(--gold)]">{p.category}</span>
                      <h3 className="text-lg font-display mt-1">{p.name}</h3>
                    </div>
                    <span className="text-[color:var(--emerald-brand)] font-medium">{formatPrice(p.price)}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-[color:var(--emerald-deep)] text-[color:var(--cream)]">
        <div className="container-luxe">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">The MZ Promise</span>
            <h2 className="text-3xl md:text-5xl font-display mt-3">Why Choose Us</h2>
            <div className="gold-divider" />
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-8">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full border border-[color:var(--gold)]/40 flex items-center justify-center text-[color:var(--gold)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-lg font-display">{title}</h3>
                <p className="mt-2 text-sm text-[color:var(--cream)]/70 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[color:var(--cream)]">
        <div className="container-luxe">
          <SectionHeading eyebrow="Kind Words" title="What Our Clients Say" />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-[var(--shadow-card)]"
              >
                <div className="flex text-[color:var(--gold)] gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => <FaStar key={k} className="w-3.5 h-3.5" />)}
                </div>
                <p className="text-[color:var(--ink)] leading-relaxed font-display text-lg">
                  "{t.text}"
                </p>
                <footer className="mt-6 text-sm">
                  <span className="font-medium text-[color:var(--emerald-deep)]">{t.name}</span>
                  <span className="text-[color:var(--ink-soft)]"> · {t.role}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="py-24 bg-white">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl bg-[color:var(--emerald-deep)] px-8 md:px-16 py-16 md:py-24"
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[color:var(--gold)]/15 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[color:var(--emerald-brand)]/40 blur-3xl" />
            <div className="relative text-center max-w-2xl mx-auto text-[color:var(--cream)]">
              <span className="eyebrow">Personal Styling</span>
              <h2 className="text-3xl md:text-5xl font-display mt-3">Order Directly on WhatsApp</h2>
              <div className="gold-divider" />
              <p className="mt-4 text-[color:var(--cream)]/80 leading-relaxed">
                Skip the checkout. Message us for personal styling, custom sizing, and heartfelt service — one artisan to one client.
              </p>
              <a href={generalWhatsAppUrl(undefined, settings.whatsapp)} target="_blank" rel="noreferrer" className="btn-gold mt-8">
                <FaWhatsapp className="w-5 h-5" /> Chat with us on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
