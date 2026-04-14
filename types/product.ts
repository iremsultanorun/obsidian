export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    images: string[];
}

export interface IProductDetail extends IProduct{
    rating:number,
    stock:number,
    discountPercentage:number,
}