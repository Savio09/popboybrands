import ProductsPageHeader from "../../../_components/PageHeader";
import ProductForm from "../../../_components/Productform";
import { db } from "@/app/db/db";
export default async function AdminProductEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
  });
  return (
    <>
      <ProductsPageHeader>Edit Products</ProductsPageHeader>
      <ProductForm product={product} />
    </>
  );
}
