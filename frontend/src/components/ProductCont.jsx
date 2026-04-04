import React from "react";

import ProductCard from "./Card";

import { useState, useEffect } from "react";

import { getUserFromToken } from "../utils/auth";

const ProductHeader = () => {

  const user = getUserFromToken()

  const [products, setproducts] = useState([])

  useEffect(() => {

    const gettingProducts = async () => {

      const res = await fetch("http://127.0.0.1:3000/api/products/getProducts")

      const data = await res.json()

      setproducts(data.products)

    }

    gettingProducts()



  }, [])



  return (

    <div className="bg-white w-[98%]  mx-auto p-4 md:p-6 rounded-2xl shadow-sm flex flex-col gap-y-5">



      {/* Inner Flex (ONLY for header content) */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">



        {/* Left - Title */}

        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">

          Products

        </h1>



        {/* Right - Search + Button */}

        <div className="flex items-center gap-3 w-full md:w-auto">



          {/* Search */}

          <div className="relative w-full md:w-80">

            <input

              type="text"

              placeholder="Search product..."

              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"

            />



            <svg

              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"

              fill="none"

              stroke="currentColor"

              strokeWidth="2"

              viewBox="0 0 24 24"

            >

              <path

                strokeLinecap="round"

                strokeLinejoin="round"

                d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"

              />

            </svg>

          </div>



          {user?.role === "admin" && (

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-full hover:bg-black hover:text-white transition whitespace-nowrap">

              <svg

                className="w-4 h-4"

                fill="none"

                stroke="currentColor"

                strokeWidth="2"

                viewBox="0 0 24 24"

              >

                <path d="M12 4v16m8-8H4" />

              </svg>

              Add New Product

            </button>

          )}



        </div>

      </div>



      <div className="grid grid-cols-4 gap-4">

        {products.map((p) => (

          <ProductCard key={p._id} product={p} />

        ))}

      </div>



    </div>

  );

};



export default ProductHeader;

