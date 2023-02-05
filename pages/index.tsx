import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Layout from "@layout/Layout";
import { ReactElement, useState } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import next, { GetStaticProps } from "next";
import { prisma } from "@lib/prisma";
import { Banner as BannerType, Product } from "typings";
import Link from "next/link";
import Banner from "@components/Banner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ShopByCategory from "@components/ShopByCategory";
import NewArrivals from "@components/NewArrivals";
import ShopByCollection from "@components/ShopByCollection";

type Props = {
  products: Product[];
};
const inter = Inter({ subsets: ["latin"] });

const banners: BannerType[] = [
  {
    img: "banner-1.jpg",
    title: "Spring Collection is here",
    description:
      "The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now to be okay to be the greatest you.",
  },
  {
    img: "banner-2.jpg",
    title: "Autumn Collection is here",
    description:
      "The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now to be okay to be the greatest you.",
  },
];

export default function Home({ products }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);

  console.log({ products });
  const next = () => {
    if (currentIndex < banners.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: any) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }
    if (diff < 5) {
      prev();
    }

    setTouchPosition(null);
  };

  if (typeof window !== "undefined") {
    // Client-side-only code
    const { height, width } = useWindowDimensions();
  }

  console.log({ currentIndex });
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* home page wrapper */}
      <div>
        {/* banner/hero */}
        <Banner banners={banners} />
        <div className="max-w-7xl mx-auto py-10 flex flex-col gap-10 md:gap-16 lg:gap-20 px-6">
          {/* Shop by Category */}
          <ShopByCategory />
          {/* New arrivals */}
          <NewArrivals />
          {/* ShopByCollection */}
          <ShopByCollection />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await prisma.product.findMany({
    take: 8,
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }, // will be passed to the page component as props
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
