import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden py-24 md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center gap-8">
          <div className="space-y-4 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Protect Your Gear. <br /> In Style.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto">
              Premium skins for DJ consoles. Precision cut, easy to apply, and guaranteed to turn heads in the booth.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <Button size="lg" className="h-12 px-8 text-lg rounded-full" asChild>
              <Link href="/products">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full">
              View Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Features / How it works */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Premium Materials</h3>
              <p className="text-muted-foreground">
                3M vinyl that protects against scratches and spills without leaving residue.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Easy Application</h3>
              <p className="text-muted-foreground">
                Air-release technology ensures a bubble-free install every time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Precision Fit</h3>
              <p className="text-muted-foreground">
                Laser-cut to perfection for over 40+ console models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Mockup */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Drops</h2>
            <p className="text-muted-foreground max-w-[600px]">
              Our most popular designs, curated for the modern DJ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mock Products */}
            {['OG Black', 'Carbon Fiber', 'Acid Acid', 'Retro Wave'].map((item, i) => (
              <Link href={`/products/og-black`} key={i} className="group transition-all hover:scale-[1.02]">
                <Card className="border-0 shadow-none bg-transparent">
                  <div className="aspect-square rounded-2xl bg-muted overflow-hidden relative">
                    {/* Placeholder for Image */}
                    <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-muted-foreground">
                      Product Image
                    </div>
                  </div>
                  <CardContent className="pt-4 px-0 space-y-1">
                    <h3 className="font-semibold text-lg">{item}</h3>
                    <p className="text-sm text-muted-foreground">From ₹1,200</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <Button variant="ghost" size="lg" asChild>
              <Link href="/products">View All Designs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
