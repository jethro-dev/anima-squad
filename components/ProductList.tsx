import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../typings";
import ProductCard from "@components/ProductCard";
import { prisma } from "@lib/prisma";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
