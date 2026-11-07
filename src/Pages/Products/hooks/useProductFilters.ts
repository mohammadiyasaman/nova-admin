import { useMemo } from "react";
import type { Product } from "@/types/product";

const PAGE_SIZE = 8;

type UseProductFiltersProps = {
  products: Product[];
  search: string;
  category: string;
  sort: string;
  currentPage: number;
};

export function useProductFilters({
  products,
  search,
  category,
  sort,
  currentPage,
}: UseProductFiltersProps) {
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory = !category || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return {
    filteredProducts,
    visibleProducts,
    totalPages,
  };
}
