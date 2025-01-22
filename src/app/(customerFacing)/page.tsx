import { Button } from "@/components/ui/button";
import { db } from "../db/db";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "../../components/ProductCard";
import { Suspense } from "react";

async function getMostPopularProducts() {
  // This function will be called to get the newest products
  return await db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      orders: { _count: "desc" },
    },
    take: 6,
  });
}

async function getNewestProducts() {
  // This function will be called to get the newest products
  return await db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
}

// function wait(duration: number) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }

export default function LandingPage() {
  return (
    <>
      <main className="space-y-12">
        <ProductGridSection
          title="Most Popular Products"
          productsFetcher={getMostPopularProducts}
        />
        <ProductGridSection
          title="Newest Products"
          productsFetcher={getNewestProducts}
        />
      </main>
    </>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link className="space-x-2" href="/products">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

export async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
