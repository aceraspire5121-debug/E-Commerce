import React from "react";
import { getUserFromToken } from "../utils/auth";
const ProductCard = ({ product }) => {
  const user=getUserFromToken()
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col">

      {/* 🖼️ Image */}
      <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden mb-3">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 📦 Category */}
      <span className="text-xs text-gray-500 mb-1">
        {product.category}
      </span>

      {/* 🏷️ Name */}
      <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
        {product.name}
      </h2>

      {/* 📝 Description */}
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        {product.description}
      </p>

      {/* 💰 Price */}
      <p className="text-base font-semibold text-gray-900 mt-2">
        ₹{product.price}
      </p>

      {/* 📊 Stock */}
      <div className="flex justify-between items-center mt-3 text-xs">
        <span
          className={`px-2 py-1 rounded-full ${
            product.stock > 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </span>
      </div>

      {/* 🔘 Actions */}
      {user.role==="admin" &&
      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-1.5 text-sm border rounded-lg hover:bg-gray-100 transition">
          Edit
        </button>
        <button className="flex-1 py-1.5 text-sm border rounded-lg hover:bg-red-500 hover:text-white transition">
          Delete
        </button>
      </div>
}

    </div>
  );
};

export default ProductCard;
