export type ProductStatus = "available" | "sold";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  size: string;
  price: number;
  image_url: string | null;
  status: ProductStatus;
  created_at: string;
}

/** Dados que o formulário de cadastro/edição envia. */
export type ProductInput = Omit<Product, "id" | "created_at" | "status"> & {
  status?: ProductStatus;
};
