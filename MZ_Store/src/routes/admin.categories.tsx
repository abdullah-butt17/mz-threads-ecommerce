import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from "react-icons/fi";
import { AdminShell, AdminCard } from "@/components/admin/AdminShell";
import { adminStore, useAdminState, type CategoryEntry } from "@/store/adminStore";

export const Route = createFileRoute("/admin/categories")({
  component: CategoriesPage,
  head: () => ({ meta: [{ title: "Categories — MZ Admin" }, { name: "robots", content: "noindex" }] }),
});

function CategoriesPage() {
  const { categories } = useAdminState();
  const [editing, setEditing] = useState<CategoryEntry | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const clothing = categories.filter((c) => c.main === "Clothing");
  const beds = categories.filter((c) => c.main === "Bed Sheets");

  return (
    <AdminShell title="Categories">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[color:var(--ink-soft)]">{categories.length} categories</p>
        <button onClick={() => setCreating(true)} className="btn-primary text-sm">
          <FiPlus /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategorySection title="Clothing" items={clothing} onEdit={setEditing} onDelete={setDeleteId} />
        <CategorySection title="Bed Sheets" items={beds} onEdit={setEditing} onDelete={setDeleteId} />
      </div>

      <AnimatePresence>
        {(creating || editing) && (
          <Modal
            title={creating ? "Add Category" : "Edit Category"}
            onClose={() => { setCreating(false); setEditing(null); }}
          >
            <CategoryFormBody
              initial={editing}
              onSave={(data) => {
                if (editing) adminStore.updateCategory(editing.id, data);
                else adminStore.addCategory({ id: `cat-${Date.now()}`, ...data });
                setCreating(false); setEditing(null);
              }}
            />
          </Modal>
        )}
        {deleteId && (
          <Modal title="Delete category?" onClose={() => setDeleteId(null)}>
            <p className="text-sm text-[color:var(--ink-soft)]">
              This will remove the category from the admin taxonomy. Existing products keep their labels.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 rounded-full border border-border text-sm">Cancel</button>
              <button
                onClick={() => { adminStore.deleteCategory(deleteId!); setDeleteId(null); }}
                className="px-5 py-2.5 rounded-full bg-red-600 text-white text-sm hover:bg-red-700"
              >Delete</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}

function CategorySection({
  title, items, onEdit, onDelete,
}: { title: string; items: CategoryEntry[]; onEdit: (c: CategoryEntry) => void; onDelete: (id: string) => void }) {
  return (
    <AdminCard className="p-6">
      <h2 className="font-display text-xl text-[color:var(--emerald-deep)] mb-4">{title}</h2>
      <ul className="divide-y divide-border">
        {items.map((c) => (
          <li key={c.id} className="flex items-center justify-between py-2.5">
            <span className="text-sm">{c.name}</span>
            <div className="flex gap-1">
              <button onClick={() => onEdit(c)} className="p-2 rounded-lg hover:bg-[color:var(--cream)] text-[color:var(--emerald-brand)]"><FiEdit2 /></button>
              <button onClick={() => onDelete(c.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><FiTrash2 /></button>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="py-6 text-center text-sm text-[color:var(--ink-soft)]">No categories yet.</li>}
      </ul>
    </AdminCard>
  );
}

function CategoryFormBody({ initial, onSave }: { initial: CategoryEntry | null; onSave: (c: Omit<CategoryEntry, "id">) => void }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [main, setMain] = useState<CategoryEntry["main"]>(initial?.main ?? "Clothing");
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (name.trim()) onSave({ name: name.trim(), main }); }} className="space-y-4">
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">Category Name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} required
          className="mt-2 w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm outline-none focus:border-[color:var(--emerald-brand)]" />
      </label>
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">Main Category</span>
        <select value={main} onChange={(e) => setMain(e.target.value as CategoryEntry["main"])}
          className="mt-2 w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm outline-none">
          <option>Clothing</option>
          <option>Bed Sheets</option>
        </select>
      </label>
      <div className="flex justify-end">
        <button className="btn-primary text-sm"><FiSave /> Save</button>
      </div>
    </form>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl text-[color:var(--emerald-deep)]">{title}</h3>
          <button onClick={onClose} className="p-1"><FiX /></button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
