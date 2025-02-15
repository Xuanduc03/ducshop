import React from 'react';
import DetailProduct from "~/components/DetailProduct";


const productData = {
  productName: "Quần dài nam thể thao co giãn đa năng",
  price: {
    current: "231.000",
    original: "289.000",
  },
  discounts: "-20%",
  images: [
    {
      src: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2025/24CM.MAWCS.PAZ994_-_Den_1_2.jpg",
      thumbnail: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2025/24CM.MAWCS.PAZ994_-_Den_1_2.jpg"
    },
    { src: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2025/24CM.MAWCS.PAZ994_-_Den_3_2.jpg", thumbnail: "https://via.placeholder.com/50x50?text=2" },
    { src: "https://via.placeholder.com/300x400?text=Image+3", thumbnail: "https://via.placeholder.com/50x50?text=3" },
  ],
  colors: [
    { name: "Đen", code: "#000000" },
    { name: "Xanh", code: "#0000ff" },
    { name: "Xám", code: "#808080" },
  ],
  sizes: [
    { size: 'M', heightRange: '1m60 - 1m65', weightRange: '48kg' },
     {size: 'S', heightRange: '1.6m - 1.65m', weightRange: '48kg' },
     {size: 'X', heightRange: '1.6m - 1.65m', weightRange: '48kg' },
     {size: 'XL', heightRange: '1.6m - 1.65m', weightRange: '48kg' },
     {size: 'L', heightRange: '1.6m - 1.65m', weightRange: '48kg' }
  ],
};

export const Products = () => {
  return (
    <div>
      <DetailProduct {...productData} />
    </div>
  )
}
