import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { SectionHeading } from "@/components/SectionHeading";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { useAdminState } from "@/store/adminStore";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — MZ Threads" },
      { name: "description", content: "The story behind MZ Threads: a heritage atelier of handmade clothing and luxury textiles." },
      { property: "og:title", content: "About MZ Threads" },
      { property: "og:description", content: "A heritage atelier where every thread is placed with intention." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const TIMELINE = [
  { year: "The Origin", title: "A grandmother's loom", text: "MZ Threads began in a small room with a wooden loom, an oil lamp, and a family recipe for dye." },
  { year: "The Craft", title: "Learning by hand", text: "Three generations later, every technique — from zardozi to hand-hemming — is still taught mouth-to-ear." },
  { year: "The Atelier", title: "Opening our doors", text: "We opened a private atelier to share our craft with a small, devoted circle of clients around the world." },
  { year: "Today", title: "Made for you", text: "Every piece is made to order, packaged by hand, and shipped with a handwritten note." },
];

const VALUES = [
  { title: "Mission", text: "To keep heritage textile craft alive by making it desirable for the modern woman and home." },
  { title: "Vision", text: "A world where the maker is known, the material is honored, and slow is celebrated." },
  { title: "Values", text: "Craft over speed. Quality over quantity. People over process." },
];

function About() {
  const { settings } = useAdminState();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-[color:var(--emerald-deep)] text-[color:var(--cream)]">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container-luxe relative text-center max-w-3xl mx-auto">
          <motion.span initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="eyebrow">Our Story</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-5xl md:text-7xl font-display"
          >
            Made slowly. <br /> Made <em className="text-[color:var(--gold)] not-italic">beautifully.</em>
          </motion.h1>
          <div className="gold-divider" />
          <p className="mt-6 text-[color:var(--cream)]/80 text-lg leading-relaxed">
            MZ Threads is a small atelier devoted to heritage craft — handmade clothing, embroidered dresses, cultural wear, and luxury home textiles for those who value the maker as much as the made.
          </p>
        </div>
      </section>

      {/* Story with image */}
      <section className="container-luxe py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="aspect-[4/5] rounded-2xl overflow-hidden"
        >
          <img
            src="https://res.cloudinary.com/ntx8ixhh/image/upload/v1784817814/images_jimpgw.jpg"
            alt="Artisan working on handmade clothing"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div>
          <span className="eyebrow">The Atelier</span>
          <h2 className="text-3xl md:text-5xl font-display mt-3 text-[color:var(--emerald-deep)]">
            A quiet devotion to craft
          </h2>
          <div className="mt-6 space-y-4 text-[color:var(--ink-soft)] leading-relaxed">
            <p>Every MZ Threads piece begins with a conversation — between an artisan and a fabric, between tradition and taste, between us and you.</p>
            <p>We work with pure silks, hand-loomed cottons, and Belgian linens. Our embroiderers thread each motif by hand, so no two pieces are identical. It's a slower way to make clothing. We believe it's a better one.</p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[{n:"12+", l:"Years of craft"},{n:"90hr", l:"Per statement piece"},{n:"100%", l:"Handmade"}].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-display text-[color:var(--emerald-brand)]">{s.n}</div>
                <div className="text-xs uppercase tracking-[0.24em] text-[color:var(--ink-soft)] mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[color:var(--cream)] py-24">
        <div className="container-luxe">
          <SectionHeading eyebrow="What We Stand For" title="Mission · Vision · Values" />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-10 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-2xl font-display text-[color:var(--emerald-deep)]">{v.title}</h3>
                <div className="w-10 h-px bg-[color:var(--gold)] my-4" />
                <p className="text-[color:var(--ink-soft)] leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-luxe py-24">
        <SectionHeading eyebrow="Our Journey" title="A Handmade Tradition" />
        <div className="mt-16 relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[color:var(--gold)]/40" />
          <div className="space-y-14">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-14 md:items-center"
              >
                {i % 2 === 0 ? (
                  <>
                    {/* Right side text */}
                    <div className="md:col-start-2 md:text-left">
                      <span className="eyebrow">{t.year}</span>
                      <h3 className="text-2xl font-display mt-2 text-[color:var(--emerald-deep)]">
                        {t.title}
                      </h3>
                      <p className="text-[color:var(--ink-soft)] mt-2 leading-relaxed">
                        {t.text}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left side text */}
                    <div className="md:col-start-1 md:text-right">
                      <span className="eyebrow">{t.year}</span>
                      <h3 className="text-2xl font-display mt-2 text-[color:var(--emerald-deep)]">
                        {t.title}
                      </h3>
                      <p className="text-[color:var(--ink-soft)] mt-2 leading-relaxed">
                        {t.text}
                      </p>
                    </div>
                  </>
                )}

                {/* Center dot */}
                <span className="absolute left-4 md:left-1/2 top-2 w-3 h-3 rounded-full bg-[color:var(--gold)] -translate-x-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-luxe pb-24">
        <div className="rounded-3xl bg-[color:var(--emerald-deep)] text-[color:var(--cream)] px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display">Ready to find your piece?</h2>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/shop" className="btn-gold">Explore the Collection</Link>
            <a
              href={generalWhatsAppUrl(undefined, settings.whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
