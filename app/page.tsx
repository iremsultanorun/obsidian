import { IProduct } from "@/types/product";
import Hero from "./_components/hero/Hero";
import styles from "./home.module.css";

export default async function Home() {
 const BASE_URL:string="https://api.escuelajs.co/api/v1/products"
let products:IProduct[]=[]

 try {
 const response=await fetch(BASE_URL)
if(!response.ok){
  throw new Error("Veriler çekilmedi")
}
const data=await response.json()
products=data.slide(0,9)
console.log(products)
}
catch(err) {
  console.error(err)
}
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero/>
      </main>
    </div>
  );
}
