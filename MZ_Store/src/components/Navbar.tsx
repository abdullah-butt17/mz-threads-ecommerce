import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { useAdminState } from "@/store/adminStore";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { settings } = useAdminState();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-border/60">
      <div className="container-luxe flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-display tracking-wide text-[color:var(--emerald-brand)]">
            MZ
          </span>
          <span className="h-6 w-px bg-[color:var(--gold)]/50" />
          <span className="text-xs uppercase tracking-[0.32em] text-[color:var(--ink-soft)] group-hover:text-[color:var(--gold)] transition-colors">
            Threads
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l, i) => (
            <Link
              key={i}
              to={l.to}
              className="text-sm tracking-wide text-[color:var(--ink)] hover:text-[color:var(--gold)] transition-colors relative"
              activeProps={{ className: "text-[color:var(--gold)]" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="p-2 rounded-full hover:bg-[color:var(--cream)] transition-colors"
          >
            <FiSearch className="w-5 h-5" />
          </button>
          <a
            href={generalWhatsAppUrl(undefined, settings.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary hidden md:inline-flex text-sm !py-2.5 !px-5"
          >
            <FaWhatsapp className="w-4 h-4" />
            Order Now
          </a>
          <button
            aria-label="Menu"
            className="lg:hidden p-2"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="container-luxe py-4 flex gap-3">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search handmade dresses, bed sets, embroidery…"
                className="flex-1 bg-transparent outline-none border-b border-border py-2 text-sm placeholder:text-[color:var(--ink-soft)]"
              />
              <Link
                to="/shop"
                search={{ q } as never}
                onClick={() => setSearchOpen(false)}
                className="btn-gold text-sm !py-2 !px-5"
              >
                Search
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden border-t border-border bg-white"
          >
            <div className="container-luxe py-6 flex flex-col gap-4">
              {links.map((l, i) => (
                <Link
                  key={i}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-base tracking-wide"
                >
                  {l.label}
                </Link>
              ))}
              <a href={generalWhatsAppUrl(undefined, settings.whatsapp)} className="btn-primary text-sm w-fit">
                <FaWhatsapp className="w-4 h-4" /> Order on WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
