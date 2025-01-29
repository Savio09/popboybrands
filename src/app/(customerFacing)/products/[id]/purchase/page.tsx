import { db } from "@/app/db/db";
import { notFound } from "next/navigation";

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });
  if (product === null) return notFound();
  return (
    <div>
      <h1>Hello mate.</h1>
    </div>
  );
}
