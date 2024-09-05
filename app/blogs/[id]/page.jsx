"use client";
import { assets, blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/Components/Footer";
import Link from "next/link";
import axios from "axios";

const page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBolgData = async () => {
    const response = await axios.get("/api/blog", {
      params: {
        id: params.id,
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchBolgData();
  }, []);

  return data ? (
    <>
      <div className="bg-red-200 py-5 px-5 md:px-12 lg:px-28 border-b-4 border-black">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={130}
              alt=""
              className="w-[130px] sm:w-auto"
            ></Image>
          </Link>
          <Link href={"/admin"}>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
            Get Started <Image src={assets.arrow} alt=""></Image>{" "}
          </button>
          </Link>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-4xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border-4 border-black rounded-full"
            src={data.authorImg}
            width={60}
            height={60}
            alt=""
          ></Image>
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-black"
          src={data.image}
          width={1280}
          height={720}
          alt=""
        ></Image>
        <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="" width={40}></Image>
            <Image src={assets.twitter_icon} alt="" width={40}></Image>
            <Image src={assets.googleplus_icon} alt="" width={40}></Image>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
