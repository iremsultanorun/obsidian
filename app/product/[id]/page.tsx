import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Star } from "lucide-react";
import styles from "./product.module.css";
import { IProductDetail } from "@/types/product";
import Products from "@/components/products/Products";
import DetailGallery from "./_components/DetailGallery"

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const BASE_URL = `https://dummyjson.com/products/${id}`;

  let product: IProductDetail | null = null;
  let relatedProducts = [];

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Ürün bulunamadı");
    product = await response.json();

    const relatedRes = await fetch(`https://dummyjson.com/products/category/${product?.category}`);
    const relatedData = await relatedRes.json();

    relatedProducts = relatedData.products
      .filter((item: any) => item.id !== Number(id))
      .slice(0, 4);

  } catch (err) {
    console.error(err);
    return <div className={styles.error}>Product not found.</div>;
  }

  if (!product) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <DetailGallery images={product.images} title={product.title}/>

        <div className={styles.infoSection}>
          <header className={styles.header}>
            <span className={styles.categoryTag}>{product.category}</span>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.ratingRow}>
              <Star size={16} fill="#FFD700" color="#FFD700" />
              <span>{product.rating}</span>
              <span className={styles.stockStatus}>
                {product.stock > 0 ? `• ${product.stock} in stock` : "• Out of stock"}
              </span>
            </div>
          </header>

          <div className={styles.priceContainer}>
            <div className={styles.priceRow}>
              <span className={styles.price}>${product.price}</span>
              {product.discountPercentage && <span className={styles.discountBadge}>-{product.discountPercentage}%</span>}
            </div>
            <p className={styles.description}>{product.description}</p>
          </div>

          <div className={styles.actions}>
            <button className={styles.addCartBtn}><ShoppingCart size={20} /> ADD TO BAG</button>
            <button className={styles.wishlistBtn}><Heart size={22} /></button>
          </div>

          <div className={styles.trustSignals}>
            <div className={styles.signal}><Truck size={20} /><div><strong>Express Delivery</strong><span>2-4 business days</span></div></div>
            <div className={styles.signal}><RotateCcw size={20} /><div><strong>Easy Returns</strong><span>30-day window</span></div></div>
            <div className={styles.signal}><ShieldCheck size={20} /><div><strong>Onyx Secure</strong><span>Warranty guaranteed</span></div></div>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <Products products={relatedProducts} title="Similar Products" />
        </section>
      )}
    </div>
  );
}