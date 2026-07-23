import { Link } from "@tanstack/react-router";
import {FaInstagram,FaFacebook,FaTiktok,FaWhatsapp,FaGithub,FaLinkedin,} from "react-icons/fa";
import { CATEGORIES } from "@/data/products";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { useAdminState } from "@/store/adminStore";
export function Footer() {
  const { settings } = useAdminState();
  return (
    <footer className="bg-[color:var(--emerald-deep)] text-[color:var(--cream)] mt-24">
      <div className="container-luxe py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-display">MZ</span>
            <span className="h-5 w-px bg-[color:var(--gold)]/60" />
            <span className="text-xs uppercase tracking-[0.32em]">Threads</span>
          </div>
          <p className="text-sm text-[color:var(--cream)]/70 leading-relaxed">
            Where tradition meets elegance. Handcrafted heritage textiles for the modern home and wardrobe.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              {
                Icon: FaInstagram,
                href: settings?.instagram,
                label: "Instagram",
              },
              {
                Icon: FaFacebook,
                href: settings?.facebook,
                label: "Facebook",
              },
              {
                Icon: FaTiktok,
                href: settings?.tiktok,
                label: "TikTok",
              },
              {
                Icon: FaWhatsapp,
                href: generalWhatsAppUrl(settings?.whatsapp),
                label: "WhatsApp",
              },
            ]
            .filter((social) => social.href)
            .map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-[color:var(--cream)]/20 flex items-center justify-center hover:bg-[color:var(--gold)] hover:text-[color:var(--emerald-deep)] hover:border-[color:var(--gold)] transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.28em] text-[color:var(--gold)] mb-5">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-[color:var(--cream)]/80">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-[color:var(--gold)] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.28em] text-[color:var(--gold)] mb-5">
            Categories
          </h4>
          <ul className="space-y-3 text-sm text-[color:var(--cream)]/80">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to="/shop"
                  search={{ category: c } as never}
                  className="hover:text-[color:var(--gold)] transition-colors"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.28em] text-[color:var(--gold)] mb-5">
            Newsletter
          </h4>
          <p className="text-sm text-[color:var(--cream)]/70 mb-4">
            Receive private previews of new collections.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border border-[color:var(--cream)]/25 rounded-full overflow-hidden"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-[color:var(--cream)]/50"
            />
            <button className="bg-[color:var(--gold)] text-[color:var(--emerald-deep)] px-5 text-sm font-medium hover:bg-[color:var(--gold-soft)] transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[color:var(--cream)]/10">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between items-center gap-5 text-xs text-[color:var(--cream)]/60">

          <p>
            © {new Date().getFullYear()} MZ Threads. All rights reserved.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-3">

            <span>
              Designed & Developed by{" "}
              <span className="text-[color:var(--gold)] font-medium">
                Abdullah Butt
              </span>
            </span>

            <div className="flex items-center gap-4">

              <a
                href="https://github.com/abdullah-butt17"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-[color:var(--gold)] transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/abdullah-butt-92939436a/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[color:var(--gold)] transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>

            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
