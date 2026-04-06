import React from "react";
import ProductCard from "./Card";
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const ProductHeader = () => {
  const user = getUserFromToken();
  const [products, setproducts] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const gettingProducts = async () => {
      const res = await fetch("http://127.0.0.1:3000/api/products/getProducts");
      const data = await res.json();
      setproducts(data.products);
    };
    gettingProducts();
  }, []);

  return (
    <div className="w-[min(1120px,98%)] mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-teal-900/10 bg-white/90 shadow-[0_20px_50px_-24px_rgba(15,118,110,0.25)] backdrop-blur-sm">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 0% -20%, rgba(45,212,191,0.35), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(13,148,136,0.2), transparent)",
          }}
        />

        <div className="relative p-5 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-700/80">
                Browse catalog
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
                Products
              </h1>
              <p className="mt-1 max-w-md text-sm text-stone-500">
                Discover items with clear pricing and live stock status.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
              <div className="relative w-full sm:max-w-xs md:w-80">
                <input
                  type="text"
                  placeholder="Search product..."
                  className="w-full rounded-2xl border border-stone-200 bg-white/80 py-2.5 pl-11 pr-4 text-sm text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20"
                />
                <svg
                  className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
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
                <button
                  type="button"
                  onClick={()=>navigate("/admin/products/newProduct")}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:from-teal-800 hover:to-teal-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Product
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
