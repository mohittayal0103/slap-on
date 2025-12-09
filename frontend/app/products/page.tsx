'use client';

import { useState, useEffect } from 'react';
import { api, Product } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Filters for now (Will be dynamic later)
    const brands = ['Pioneer DJ', 'Denon DJ', 'Numark', 'Native Instruments'];

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await api.getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    // Filter Logic
    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container px-4 py-8 md:py-12">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Shop Skins</h1>
                    <p className="text-muted-foreground mt-1">
                        {filteredProducts.length} Premium Designs
                    </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search designs..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Mobile Filter */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 space-y-4">
                                    <h4 className="font-semibold">Brand</h4>
                                    <div className="space-y-2">
                                        {brands.map(brand => (
                                            <div key={brand} className="flex items-center gap-2">
                                                <input type="checkbox" id={`m-${brand}`} className="rounded border-gray-300" />
                                                <label htmlFor={`m-${brand}`}>{brand}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Desktop Filter Sidebar */}
                <aside className="hidden md:block w-64 space-y-8 flex-shrink-0">
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Brand</h3>
                        <div className="space-y-3">
                            {brands.map(brand => (
                                <div key={brand} className="flex items-center gap-2">
                                    {/* Future: Add interactivity */}
                                    <div className="h-4 w-4 rounded border border-primary/20 bg-background" />
                                    <span className="text-sm font-medium">{brand}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-muted/40 rounded-lg">
                        <p className="text-xs text-muted-foreground">
                            Select your model in the product page to see the exact price.
                        </p>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}

                            {filteredProducts.length === 0 && (
                                <div className="col-span-full py-12 text-center text-muted-foreground">
                                    No designs found matching your criteria.
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
