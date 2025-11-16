// src/api/products.ts
import axiosClient from "./axiosClient";

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  reviews: Review[];
}

export const productsApi = {
  // جلب كل المنتجات
  getAll: () => axiosClient.get<{ products: Product[] }>("/products"),

  // جلب منتج محدد بالـ id
  getById: (id: number) => axiosClient.get<Product>(`/products/${id}`),

  // البحث عن منتج
  search: (query: string) =>
    axiosClient.get<{ products: Product[] }>(`/products/search?q=${query}`),

  // منتجات حسب الفئة
  getByCategory: (category: string) =>
    axiosClient.get<{ products: Product[] }>(`/products/category/${category}`),

  // إضافة منتج (dummyjson بيقبل POST تجريبي)
  create: (data: Partial<Product>) => axiosClient.post("/products/add", data),

  // تحديث منتج
  update: (id: number, data: Partial<Product>) =>
    axiosClient.put(`/products/${id}`, data),

  // حذف منتج
  delete: (id: number) => axiosClient.delete(`/products/${id}`),
};
