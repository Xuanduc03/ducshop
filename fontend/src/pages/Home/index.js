import React from 'react'
import { Carousel } from '~/components/Banner/carousel';
import { Banners } from '~/components/Banner/banners';
import { ListCategory } from '~/components/ListCategory';
import { ListProduct } from '~/components/ListProduct';

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
      <ListCategory />
      <ListProduct />
      <Banners items={BannerItem}/>
    </div>
  )
}
