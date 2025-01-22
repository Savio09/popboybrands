"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addProduct, updateProduct } from "../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export default function ProductForm({ product }: { product?: Product | null }) {
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name"> Name </Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && (
          <div className="text-destructive" role="alert">
            {error.name}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents"> Price </Label>
        <Input
          type="text"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency(priceInCents || 0)}
        </div>
        {error.priceInCents && (
          <div className="text-destructive" role="alert">
            {error.priceInCents}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description"> Description </Label>
        <Textarea
          id="description"
          name="description"
          required
          className="w-full p-2 border rounded-md"
          placeholder="Describe the product here!"
          defaultValue={product?.description || ""}
        ></Textarea>
        {error.description && (
          <div className="text-destructive" role="alert">
            {error.description}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file"> File Name </Label>
        <Input type="file" id="file" name="file" required={product == null} />
        {product != null && (
          <div className="text-muted-foreground">{product.filePath}</div>
        )}
        {error.file && (
          <div className="text-destructive" role="alert">
            {error.file}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image"> Image Name </Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && (
          <Image
            src={product.imagePath}
            height={400}
            width={400}
            alt="Product Image"
          />
        )}
        {error.image && (
          <div className="text-destructive" role="alert">
            {error.image}
          </div>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
