import { SearchInput, Select, Toolbar } from "../ProductsPage.styles";

type ProductsToolbarProps = {
  search: string;
  category: string;
  sort: string;
  categories: string[];
  t: {
    productsSearch: string;
    allCategories: string;
    sortBy: string;
    sortDefault: string;
    sortPriceLow: string;
    sortPriceHigh: string;
  };
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

function ProductsToolbar({
  search,
  category,
  sort,
  categories,
  t,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ProductsToolbarProps) {
  return (
    <Toolbar>
      <SearchInput
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={t.productsSearch}
        aria-label={t.productsSearch}
      />

      <Select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label={t.allCategories}
      >
        <option value="">{t.allCategories}</option>

        {categories.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </Select>

      <Select
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
        aria-label={t.sortBy}
      >
        <option value="default">{t.sortDefault}</option>
        <option value="price-asc">{t.sortPriceLow}</option>
        <option value="price-desc">{t.sortPriceHigh}</option>
      </Select>
    </Toolbar>
  );
}

export default ProductsToolbar;
