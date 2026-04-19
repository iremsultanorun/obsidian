import { IProduct } from "@/types/product";
import styles from "./home.module.css";
import BentoGrid from "@/app/_components/bento-grid/BentoGrid";
import Hero from "./_components/hero/Hero";
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
console.log(products)

}
catch(err) {
  console.error(err)
}
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero/>
        <Products products={products} />
        <BentoGrid/>
      </main>
    </div>
  );
}
