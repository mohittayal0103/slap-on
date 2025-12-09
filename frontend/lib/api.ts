import axios from 'axios';

const API_URL = 'http://localhost:3002'; // Development URL

export interface ProductVariant {
    deviceBrand: string;
    deviceModel: string;
    price: number;
    isInStock: boolean;
}

export interface Product {
    _id: string;
    title: string;
    slug: string;
    type: string;
    description?: string;
    images: string[];
    tags?: string[];
    variants: ProductVariant[];
    isListed: boolean;
}

export const api = {
    getProducts: async (params?: { brand?: string; model?: string }) => {
        const res = await axios.get<Product[]>(`${API_URL}/products`, { params });
        return res.data;
    },

    getProduct: async (slug: string) => {
        const res = await axios.get<Product>(`${API_URL}/products/${slug}`);
        return res.data;
    }
};
