export interface ICategory {
    id: number;
    name: string;
}

export interface IProduct {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: ICategory;
    images: string[];
}