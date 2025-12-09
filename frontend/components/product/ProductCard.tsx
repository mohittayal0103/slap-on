import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/api';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    // Calculate price range
    const prices = product.variants.map(v => v.price);
    const minPrice = Math.min(...prices);

    return (
        <Link href={`/products/${product.slug}`} className="group h-full">
            <Card className="h-full border-0 shadow-none bg-transparent hover:bg-muted/30 transition-colors rounded-xl overflow-hidden">
                <div className="aspect-square relative bg-muted overflow-hidden">
                    {/* Placeholder for real image */}
                    {product.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-neutral-100 dark:bg-neutral-800">
                            No Image
                        </div>
                    )}

                    {product.tags && product.tags.includes('Best Seller') && (
                        <Badge className="absolute top-2 left-2" variant="secondary">
                            Best Seller
                        </Badge>
                    )}
                </div>

                <CardContent className="pt-4 px-2">
                    <h3 className="font-semibold text-lg leading-tight group-hover:underline decoration-1 underline-offset-4">
                        {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize mt-1">
                        {product.type}
                    </p>
                </CardContent>

                <CardFooter className="px-2 pb-4 pt-0">
                    <p className="font-medium">
                        ₹{minPrice.toLocaleString()}
                        {prices.length > 1 && <span className="text-muted-foreground font-normal ml-1 text-sm">+</span>}
                    </p>
                </CardFooter>
            </Card>
        </Link>
    );
}
