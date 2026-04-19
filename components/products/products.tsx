import { IProduct } from "@/types/product";
import ProductCard from "./product-card/ProductCard";
import styles from "./products.module.css";

interface ProductsProps {
  products: IProduct[];
  title:string;
}

export default function Products({ products,title="Curated Collection"  }: ProductsProps) {
  return (
    <section id="products-section" className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.mainTitle}> {title} </h2>
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