'use client';

import { useState, useEffect, use } from 'react';
import { api, Product, ProductVariant } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Check, ShoppingCart } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params); // Unwrap params in Next.js 15+
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // Selection State
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await api.getProduct(slug);
                setProduct(data);
            } catch (err) {
                console.error("Failed to load product", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [slug]);

    // Derive available brands/models from variants
    const brands = product ? Array.from(new Set(product.variants.map(v => v.deviceBrand))) : [];

    const availableModels = product && selectedBrand
        ? product.variants.filter(v => v.deviceBrand === selectedBrand).map(v => v.deviceModel)
        : [];

    // Update selected variant when model changes
    useEffect(() => {
        if (product && selectedBrand && selectedModel) {
            const variant = product.variants.find(v =>
                v.deviceBrand === selectedBrand && v.deviceModel === selectedModel
            );
            setSelectedVariant(variant || null);
        }
    }, [selectedBrand, selectedModel, product]);

    if (loading) return <div className="container py-20 text-center">Loading...</div>;
    if (!product) return <div className="container py-20 text-center">Product not found</div>;

    return (
        <div className="container px-4 py-8 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

                {/* Left: Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative">
                        {product.images[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-neutral-100 dark:bg-neutral-800">
                                No Image
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col space-y-8">
                    <div>
                        <Badge variant="outline" className="mb-2 uppercase tracking-wide">{product.type}</Badge>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">{product.title}</h1>
                        <p className="text-xl text-muted-foreground">
                            {selectedVariant
                                ? `₹${selectedVariant.price.toLocaleString()}`
                                : `From ₹${Math.min(...product.variants.map(v => v.price)).toLocaleString()}`
                            }
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-semibold text-lg">Select Your Console</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Brand</label>
                                <Select onValueChange={(val) => {
                                    setSelectedBrand(val);
                                    setSelectedModel(''); // Reset model when brand changes
                                    setSelectedVariant(null);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {brands.map(b => (
                                            <SelectItem key={b} value={b}>{b}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Model</label>
                                <Select
                                    disabled={!selectedBrand}
                                    value={selectedModel}
                                    onValueChange={setSelectedModel}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableModels.map(m => (
                                            <SelectItem key={m} value={m}>{m}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {selectedVariant && (
                            <div className="p-4 bg-muted/40 rounded-lg flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span>In Stock for <strong>{selectedBrand} {selectedModel}</strong></span>
                            </div>
                        )}

                        <Button
                            size="lg"
                            className="w-full text-lg h-14"
                            disabled={!selectedVariant}
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>

                        {!selectedVariant && (
                            <p className="text-xs text-center text-muted-foreground">
                                Please select your console model to proceed.
                            </p>
                        )}
                    </div>

                    <div className="prose dark:prose-invert">
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description || "Premium quality skin designed for professional use. Protects faders & knobs while giving your gear a fresh look."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
