import React from 'react';
import Checkout from '~/components/CheckOut';

const items = [
   {
    image: "https://media3.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/July2024/Quan_ECC_Tapped_Fit.10.jpg",
    name: "Quần Dài Nam ECC Warp Pants dáng Tape",
    color: "xanh reu",
    size: "XL",
    quantity: "1",
    price:"531.000", 
    totalPrice: "531000"
   }
];

export const Cart = () => {
  return (
    <div>
      <Checkout product={items}/>
    </div>
  )
}
