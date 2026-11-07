import type { Product } from "@/types/product";
import {
  CategoryTag,
  Image,
  Price,
  ProductCell,
  ProductTitle,
  SecondaryButton,
  StateMessage,
  Table,
  TableCard,
  TableWrapper,
} from "../ProductsPage.styles";

type ProductsTableProps = {
  products: Product[];
  loading: boolean;
  t: {
    productName: string;
    category: string;
    price: string;
    actions: string;
    details: string;
    loadingProducts: string;
    noProducts: string;
  };
  onDetails: (product: Product) => void;
};

function ProductsTable({
  products,
  loading,
  t,
  onDetails,
}: ProductsTableProps) {
  return (
    <TableCard>
      {loading && products.length === 0 ? (
        <StateMessage>{t.loadingProducts}</StateMessage>
      ) : products.length === 0 ? (
        <StateMessage>{t.noProducts}</StateMessage>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>{t.productName}</th>
                <th>{t.category}</th>
                <th>{t.price}</th>
                <th>{t.actions}</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <ProductCell>
                      <Image src={product.image} alt={product.title} />
                      <ProductTitle>{product.title}</ProductTitle>
                    </ProductCell>
                  </td>

                  <td>
                    <CategoryTag>{product.category}</CategoryTag>
                  </td>

                  <td>
                    <Price>${product.price.toFixed(2)}</Price>
                  </td>

                  <td>
                    <SecondaryButton
                      type="button"
                      onClick={() => onDetails(product)}
                    >
                      {t.details}
                    </SecondaryButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </TableCard>
  );
}

export default ProductsTable;
