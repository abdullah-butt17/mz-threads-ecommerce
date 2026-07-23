import api from "./axios";

import type { Product } from "@/data/products";

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
  pagination?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export type ApiListResponse<T> = ApiResponse<T[]>;

export type ApiProduct = {
  _id: string;
  slug?: string;

  name: string;

  mainCategory: string;
  subCategory: string;
  collection?: string;

  description: string;

  material?: string;

  availableSizes?: string[];

  availableColors?: string[];

  price: number;

  salePrice?: number;

  stockStatus?: "in_stock" | "out_of_stock" | "limited";

  featured?: boolean;

  images?: {
    url: string;
    publicId: string;
  }[];
};

export type ApiCategory = {
  _id: string;
  mainCategory: string;
  subCategory: string;
};

export type ApiSettings = {
  businessName?: string;

  whatsappNumber?: string;

  address?: string;

  email?: string;

  facebook?: string;

  instagram?: string;

  tiktok?: string;

  logo?: string;

  deliveryCharges?: number;

  returnPolicy?: string;
};

export type AuthUser = {
  _id: string;

  name: string;

  email: string;

  role: string;
};

//
// PRODUCTS
//

export const getProducts = async (params?: Record<string, unknown>) => {
  const res = await api.get<ApiListResponse<ApiProduct>>("/products", {
    params,
  });

  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await api.get<ApiResponse<ApiProduct>>(`/products/${id}`);

  return res.data;
};

export const createProduct = async (payload: Record<string, unknown>) => {
  const res = await api.post<ApiResponse<ApiProduct>>(
    "/products",
    payload
  );

  return res.data;
};

export const updateProduct = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const res = await api.put<ApiResponse<ApiProduct>>(
    `/products/${id}`,
    payload
  );

  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await api.delete(`/products/${id}`);

  return res.data;
};

//
// CATEGORIES
//

export const getCategories = async () => {
  const res = await api.get<ApiListResponse<ApiCategory>>("/categories");

  return res.data;
};

export const createCategory = async (payload: Record<string, unknown>) => {
  const res = await api.post("/categories", payload);

  return res.data;
};

export const updateCategory = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const res = await api.put(`/categories/${id}`, payload);

  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await api.delete(`/categories/${id}`);

  return res.data;
};

//
// AUTH
//

export const login = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await api.post<
    ApiResponse<{
      user: AuthUser;
    }>
  >("/auth/login", payload);

  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");

  return res.data;
};

export const getMe = async () => {
  const res = await api.get<
    ApiResponse<{
      user: AuthUser;
    }>
  >("/auth/me");

  return res.data;
};

//
// SETTINGS
//

export const getSettings = async () => {
  const res = await api.get<ApiResponse<ApiSettings>>("/settings");

  return res.data;
};

export const updateSettings = async (
  payload: Record<string, unknown>
) => {

  console.log("SETTINGS PAYLOAD:", payload);

  const res = await api.put<ApiResponse<ApiSettings>>(
    "/settings",
    payload
  );

  return res.data;
};

//
// IMAGE UPLOAD
//

export const uploadImages = async (files: File[]) => {
  const form = new FormData();

  files.forEach((f) => form.append("images", f));

  const res = await api.post(
    "/upload",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

//
// Mapping
//

export function mapProductFromApi(product: ApiProduct): Product {
  return {
    id: product._id,

    name: product.name,

    category: product.collection || product.subCategory,

    mainCategory:
      product.mainCategory === "Bed Sheets"
        ? "Bed Sheets"
        : "Clothing",

    subCategory: product.subCategory,

    collection: product.collection,

    description: product.description,

    material: product.material || "",

    sizes: product.availableSizes || [],

    colors: product.availableColors || [],

    price: product.price,

    salePrice: product.salePrice,

    rating: 5,

    image: product.images?.[0]?.url || "",

    gallery:
      product.images?.map((i) => i.url) || [],

    inStock: product.stockStatus !== "out_of_stock",

    featured: product.featured ?? false,

    isNew: false,
  };
}