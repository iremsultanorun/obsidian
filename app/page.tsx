import { IProduct } from "@/types/product";
import Hero from "./_components/hero/Hero";
import styles from "./home.module.css";
import Products from "@/components/products/Products";

export default async function Home() {
 const BASE_URL:string="https://dummyjson.com/products"
let products:IProduct[]=[]

 try {
 const response=await fetch(BASE_URL)

if(!response.ok){
  throw new Error("Veriler çekilmedi")
}

const data=await response.json()
products=data.products.slice(0,16)

}
catch(err) {
  console.error(err)
}
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero/>
        <Products products={products} />
      </main>
    </div>
  );
}
