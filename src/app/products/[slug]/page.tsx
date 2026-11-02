import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCustomizer } from "@/components/products/ProductCustomizer";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowLeft, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | U and We Prints`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from the same category or best sellers
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex items-center gap-2 text-xs text-neutral-500">
        <Link href="/" className="hover:text-[#171717]">
          Home
        </Link>
        <span>/</span>
        <Link href="/gifts" className="hover:text-[#171717]">
          Gifts
        </Link>
        <span>/</span>
        <span className="text-neutral-900 font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </div>

      {/* Main Interactive Customizer Module */}
      <ProductCustomizer product={product} />

      {/* Features & Specs Section */}
      <div className="mt-16 pt-12 border-t border-[#171717]/10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-[#171717] mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E77A42]" />
            Product Highlights &amp; Craftsmanship
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-600 leading-relaxed">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E77A42] mt-1.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-[#171717]/10 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-[#171717] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Our Quality &amp; Satisfaction Promise
          </h3>
          <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
            <p>
              Every customized order is digitally proofed and color-adjusted before physical printing. If you have special crop requirements or text font preferences, our design team will verify the preview with you over WhatsApp.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[#E77A42] font-semibold">
              <HeartHandshake className="w-4 h-4" />
              <span>Studio located beside D-Mart, Bellary Road, Kurnool</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Showcase */}
      {related.length > 0 && (
        <div className="mt-20 pt-12 border-t border-[#171717]/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E77A42]">
                You May Also Like
              </span>
              <h3 className="text-2xl font-extrabold text-[#171717] tracking-tight mt-0.5">
                Complementary Personalized Gifts
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-[#171717] hover:text-[#E77A42] transition-colors"
            >
              Browse All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

