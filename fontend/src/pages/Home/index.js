import React from 'react'
import { Carousel } from '~/components/Banner/carousel';
import { Banners } from '~/components/Banner/banners';
import { ListCategory } from '~/components/ListCategory'
import { ListProduct } from '~/components/ListProduct';

const Category = [
  {
    id: 1,
    img: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/image-cate-ao-thun.jpg",
    name: "áo thun"
  },
  {
    id: 2,
    img: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/image-cate-so-mi.jpg",
    name: "sơ mi"
  },
  {
    id: 3,
    img: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/image-cate-ao-khoac.jpg",
    name: "Áo khoác"
  },
  {
    id: 4,
    img: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/image-cate-quan-dai.jpg",
    name: "Quần dài"
  },
  {
    id: 5,
    img: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/image-cate-quan-short.jpg",
    name: "quần short"
  },
  {
    id: 6,
    img: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/image-cate-quan-lot.jpg",
    name: "quần lót "
  },

];

const products = [
  {
    image: "https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/December2024/24CM.MAWCS.JGZ996_-_Buluga_9.jpg",
    name: "Combo 2 quần lót Nam Trunk",
    price: "192.000đ",
    oldPrice: "240.000đ",
    discount: "-20%",
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Xanh", code: "#0000ff" },
      { name: "Xám", code: "#808080" },
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
  },
  {
    image: "https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/December2024/24CM.MAWCS.JGZ995---Xanh-3D_6.jpg",
    name: "Quần dài nam thể thao",
    price: "231.000đ",
    oldPrice: "289.000đ",
    discount: "-20%",
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Xanh", code: "#0000ff" },
      { name: "Xám", code: "#808080" },
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
  },
  {
    image: "https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/December2024/ao-khoac-2-lop-casual-xanh-orion-blue_(13).jpg",
    name: "Túi đeo hông đa năng",
    price: "159.000đ",
    oldPrice: "199.000đ",
    discount: "-20%",
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Xanh", code: "#0000ff" },
      { name: "Xám", code: "#808080" },
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
  },
  {
    image: "https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/December2024/2484CW.DT002_-Reu-3D.jpg",
    name: "Pack 5 Trunk Cotton Coolmate",
    price: "263.000đ",
    oldPrice: "329.000đ",
    discount: "-20%",
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Xanh", code: "#0000ff" },
      { name: "Xám", code: "#808080" },
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
  },
  {
    image: "https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/December2024/2484CW.DT002_-Reu-3D.jpg",
    name: "Pack 5 Trunk Cotton Coolmate",
    price: "263.000đ",
    oldPrice: "329.000đ",
    discount: "-20%",
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Xanh", code: "#0000ff" },
      { name: "Xám", code: "#808080" },
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
  },
  {
    image: "https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/December2024/2484CW.DT002_-Reu-3D.jpg",
    name: "Pack 5 Trunk Cotton Coolmate",
    price: "263.000đ",
    oldPrice: "329.000đ",                   
    discount: "-20%",
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Xanh", code: "#0000ff" },
      { name: "Xám", code: "#808080" },
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
  },
  {
    image: "https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/December2024/2484CW.DT002_-Reu-3D.jpg",
    name: "Pack 5 Trunk Cotton Coolmate",
    price: "263.000đ",
    oldPrice: "329.000đ",
    discount: "-20%",
    colors: [
      { name: "Đen", code: "#000000" },
      { name: "Xanh", code: "#0000ff" },
      { name: "Xám", code: "#808080" },
    ],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
  },
];


const BannerItem = [
  {
    image : "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/Do_thu_dong_-_Desktop.jpg",
    title : "đồ thu đông",
    voucher: "Giảm đến 50% | Nhập 'CM10' giảm thêm 10% | Freeship đơn từ 200k"
  },
  {
    image : "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/Do_chay_bo_-_Desktop(1).jpg",
    title : "đồ chạy bộ",
    voucher: "Tặng Túi Đeo Hông trị giá 159K | Nhập 'CM10' giảm thêm 10%"
  },
  {
    image : "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2025/Do_Lot_-_Desktop.jpg",
    title: "quần lót",
    voucher: "Tặng Quần short mặc nhà trị giá 99k khi mua 1 số sản phẩm"
  }
];

export default function Home() {
  return (
    <div>
      <Carousel />
      <ListCategory items={Category} />
      <ListProduct items={products}/>
      <Banners items={BannerItem}/>
      Home Page
    </div>
  )
}
