import React from "react";
import { getUserFromToken } from "../utils/auth";

const ProductCard = ({ product }) => {
  const user = getUserFromToken();
  const isAdmin = user?.role === "admin";

  return (
    <article className="group flex flex-col rounded-2xl border border-stone-100 bg-white p-4 shadow-sm ring-1 ring-black/[0.02] transition duration-300 hover:-translate-y-0.5 hover:border-teal-200/60 hover:shadow-[0_20px_40px_-28px_rgba(15,118,110,0.35)]">
      <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-stone-100 to-stone-50">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/150"}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-700/90">
        {product.category}
      </span>

      <h2 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-stone-900">{product.name}</h2>

      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500">{product.description}</p>

      <p className="mt-3 text-lg font-bold tabular-nums text-stone-900">₹{product.price}</p>

      <div className="mt-3">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            product.stock > 0
              ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80"
              : "bg-red-50 text-red-700 ring-1 ring-red-200/80"
          }`}
        >
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </span>
      </div>

      {isAdmin && (
        <div className="mt-4 flex gap-2 border-t border-stone-100 pt-4">
          <button
            type="button"
            className="flex-1 rounded-xl border border-stone-200 py-2 text-xs font-semibold text-stone-700 transition hover:border-teal-300 hover:bg-teal-50/50 hover:text-teal-900"
          >
            Edit
          </button>
          <button
            type="button"
            className="flex-1 rounded-xl border border-red-200/80 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-600 hover:text-white"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
};

export default ProductCard;
