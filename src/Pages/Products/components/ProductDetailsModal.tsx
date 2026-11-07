import type { Product } from "@/types/product";
import {
  CategoryTag,
  CloseButton,
  DetailsContent,
  DetailImage,
  ErrorBanner,
  Modal,
  ModalHeader,
  Overlay,
  Price,
  StateMessage,
} from "../ProductsPage.styles";

type ProductDetailsModalProps = {
  isOpen: boolean;
  product: Product | null;
  loading: boolean;
  error: string | null;
  t: {
    details: string;
    close: string;
    loadingProducts: string;
    noProducts: string;
    rating: string;
    reviews: string;
  };
  onClose: () => void;
};

function ProductDetailsModal({
  isOpen,
  product,
  loading,
  error,
  t,
  onClose,
}: ProductDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <h2>{t.details}</h2>

          <CloseButton type="button" onClick={onClose} aria-label={t.close}>
            ×
          </CloseButton>
        </ModalHeader>

        {loading ? (
          <StateMessage>{t.loadingProducts}</StateMessage>
        ) : !product ? (
          <StateMessage>{t.noProducts}</StateMessage>
        ) : (
          <DetailsContent>
            <DetailImage src={product.image} alt={product.title} />

            <h3>{product.title}</h3>

            <CategoryTag>{product.category}</CategoryTag>

            <Price>${product.price.toFixed(2)}</Price>

            <p>{product.description}</p>

            <small>
              {t.rating}: {product.rating?.rate ?? "—"} / 5{" · "}
              {t.reviews}: {product.rating?.count ?? "—"}
            </small>
          </DetailsContent>
        )}

        {error && <ErrorBanner role="alert">{error}</ErrorBanner>}
      </Modal>
    </Overlay>
  );
}

export default ProductDetailsModal;
