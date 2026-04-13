import { IProduct } from "@/types/product";
import ProductCard from "./product-card/ProductCard";
import styles from "./Products.module.css";

interface ProductsProps {
  products: IProduct[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.mainTitle}>Curated Collection</h2>
        <p className={styles.subTitle}>Handpicked Architectural Silhouettes</p>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}