import { useSyncExternalStore } from "react";
import { PRODUCTS as SEED_PRODUCTS, type Product } from "@/data/products";
import {
  CLOTHING_SUBCATEGORIES,
  BEDSHEET_SUBCATEGORIES,
} from "@/data/categories";
import {
  createProduct as createProductApi,
  deleteProduct as deleteProductApi,
  getCategories,
  getProducts,
  getMe,
  getSettings,
  login as loginApi,
  logout as logoutApi,
  mapProductFromApi,
  updateProduct as updateProductApi,
  updateSettings as updateSettingsApi,
  type ApiCategory,
  type ApiSettings,
} from "@/api/api";

export type BusinessSettings = {
  businessName: string;
  whatsapp: string;
  address: string;
  email: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  logo?: string;
};

export type CategoryEntry = {
  id: string;
  name: string;
  main: "Clothing" | "Bed Sheets";
};

type State = {
  products: Product[];
  categories: CategoryEntry[];
  settings: BusinessSettings;
  authed: boolean;
};

const seedCategories: CategoryEntry[] = [
  ...CLOTHING_SUBCATEGORIES.map((n) => ({ id: `c-${n}`, name: n, main: "Clothing" as const })),
  ...BEDSHEET_SUBCATEGORIES.map((n) => ({ id: `b-${n}`, name: n, main: "Bed Sheets" as const })),
];

const seedSettings: BusinessSettings = {
  businessName: "MZ Threads",
  whatsapp: "+92 300 0000000",
  address: "Lahore, Pakistan",
  email: "hello@mzthreads.com",
  facebook: "https://facebook.com/mzthreads",
  instagram: "https://instagram.com/mzthreads",
  tiktok: "https://tiktok.com/@mzthreads",
};

let state: State = {
  products: [...SEED_PRODUCTS],
  categories: seedCategories,
  settings: seedSettings,
  authed: false,
};

const listeners = new Set<() => void>();
const KEY = "mz_admin_state_v1";
let hydrated = false;
let bootstrapDone = false;
let bootstrapPromise: Promise<void> | null = null;
let authCheckPromise: Promise<boolean> | null = null;

function persist() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function mapCategoryFromApi(category: ApiCategory): CategoryEntry {
  return {
    id: category._id,
    name: category.subCategory,
    main: category.mainCategory === "Bed Sheets" ? "Bed Sheets" : "Clothing",
  };
}

function mapSettingsFromApi(settings: ApiSettings): BusinessSettings {
  return {
    businessName: settings.businessName ?? state.settings.businessName,
    whatsapp: settings.whatsappNumber ?? state.settings.whatsapp,
    address: settings.address ?? state.settings.address,
    email: settings.email ?? state.settings.email,
    facebook: settings.facebook ?? state.settings.facebook,
    instagram: settings.instagram ?? state.settings.instagram,
    tiktok: settings.tiktok ?? state.settings.tiktok,
    logo: settings.logo ?? state.settings.logo,
  };
}

async function bootstrapFromApi() {
  if (bootstrapDone || typeof window === "undefined") return;
  if (bootstrapPromise) return bootstrapPromise;

  bootstrapPromise = (async () => {
    try {
      const [productsResponse, categoriesResponse, settingsResponse] = await Promise.all([
        getProducts({ limit: 100 }),
        getCategories(),
        getSettings(),
      ]);

      const nextProducts = (productsResponse.data ?? []).map(mapProductFromApi);
      const nextCategories = (categoriesResponse.data ?? []).map(mapCategoryFromApi);
      const nextSettings = mapSettingsFromApi(settingsResponse.data);

      state = {
        ...state,
        products: nextProducts,
        categories: nextCategories.length > 0 ? nextCategories : state.categories,
        settings: nextSettings,
      };
      emit();
    } catch (error) {
      console.error("Failed to load storefront data from the API", error);
    } finally {
      bootstrapDone = true;
    }
  })();

  return bootstrapPromise;
}

async function verifySession() {
  if (typeof window === "undefined") return false;
  if (authCheckPromise) return authCheckPromise;

  authCheckPromise = (async () => {
    try {
      const response = await getMe();
      const nextAuthed = Boolean(response?.data?.user);
      state = { ...state, authed: nextAuthed };
      emit();
      return nextAuthed;
    } catch {
      state = { ...state, authed: false };
      emit();
      return false;
    }
  })();

  return authCheckPromise;
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;

  window.setTimeout(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>;
        state = { ...state, ...parsed };
        emit();
      }
    } catch { /* ignore */ }

    void verifySession().finally(() => {
      void bootstrapFromApi();
    });
  }, 0);
}

export const adminStore = {
  subscribe(l: () => void) {
    hydrate();
    listeners.add(l);
    return () => { listeners.delete(l); };
  },
  get() { return state; },
  getServer() { return state; },
  async login(email: string, password: string) {
    try {
      const response = await loginApi({ email, password });
      if (response.success) {
        state = { ...state, authed: true };
        emit();
        await verifySession();
      }
      return response;
    } catch (error) {
      console.error("Admin login failed", error);
      throw error;
    }
  },
  async logout() {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Admin logout failed", error);
    }
    state = { ...state, authed: false };
    emit();
  },
  async addProduct(p: Product) {
    const fallbackImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80";
    const imageCandidates = [p.image, ...(p.gallery ?? []), fallbackImage].filter(Boolean) as string[];
    const imageUrl = imageCandidates[0] ?? fallbackImage;

    const payload = {
      name: p.name,
      mainCategory: p.mainCategory,
      subCategory: p.subCategory,
      collection: p.collection || undefined,
      description: p.description,
      material: p.material || undefined,
      availableSizes: p.sizes,
      availableColors: p.colors,
      price: p.price,
      salePrice: p.salePrice,
      stockStatus: p.inStock ? "in_stock" : "out_of_stock",
      featured: Boolean(p.featured),
      images: [
        {
          url: imageUrl,
          publicId: `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "product"}-${Date.now()}`,
        },
      ],
    };

    const response = await createProductApi(payload);
    const created = mapProductFromApi(response.data);
    state = { ...state, products: [created, ...state.products] };
    emit();
    return created;
  },
  async updateProduct(id: string, patch: Product) {
    const fallbackImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80";
    const imageCandidates = [patch.image, ...(patch.gallery ?? []), fallbackImage].filter(Boolean) as string[];
    const imageUrl = imageCandidates[0] ?? fallbackImage;

    const payload = {
      name: patch.name,
      mainCategory: patch.mainCategory,
      subCategory: patch.subCategory,
      collection: patch.collection || undefined,
      description: patch.description,
      material: patch.material || undefined,
      availableSizes: patch.sizes,
      availableColors: patch.colors,
      price: patch.price,
      salePrice: patch.salePrice,
      stockStatus: patch.inStock ? "in_stock" : "out_of_stock",
      featured: Boolean(patch.featured),
      images: [
        {
          url: imageUrl,
          publicId: `${patch.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "product"}-${Date.now()}`,
        },
      ],
    };

    const response = await updateProductApi(id, payload);
    const updated = mapProductFromApi(response.data);
    state = { ...state, products: state.products.map((p) => (p.id === id ? updated : p)) };
    emit();
    return updated;
  },
  async deleteProduct(id: string) {
    await deleteProductApi(id);
    state = { ...state, products: state.products.filter((p) => p.id !== id) };
    emit();
  },
  addCategory(c: CategoryEntry) {
    state = { ...state, categories: [c, ...state.categories] };
    emit();
  },
  updateCategory(id: string, patch: Partial<CategoryEntry>) {
    state = { ...state, categories: state.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)) };
    emit();
  },
  deleteCategory(id: string) {
    state = { ...state, categories: state.categories.filter((c) => c.id !== id) };
    emit();
  },
  async updateSettings(patch: Partial<BusinessSettings>) {
    const payload = {
      businessName: patch.businessName,
      whatsappNumber: patch.whatsapp,
      address: patch.address,
      email: patch.email,
      facebook: patch.facebook,
      instagram: patch.instagram,
      tiktok: patch.tiktok,
      logo: patch.logo,
    };

    const response = await updateSettingsApi(payload);
    state = { ...state, settings: mapSettingsFromApi(response.data) };
    emit();
  },
};

export function useAdminState(): State {
  return useSyncExternalStore(adminStore.subscribe, adminStore.get, adminStore.getServer);
}
