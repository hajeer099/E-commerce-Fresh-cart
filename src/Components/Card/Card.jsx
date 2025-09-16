import React from 'react'
import myImage from '../../assets/flower.jpg';
import { Heart, ShoppingCart } from 'lucide-react';
export default function Card() {
  return (
    <div className='bg-amber-200  dark:bg-amber-400 space-y-4 p-4 mt-5 rounded-2xl hover:scale-110 transition-all'>
      <div className='relative group/cart'>
        <img className='rounded-2xl' src={myImage} alt="" />

         <div className='group/date group-hover/cart:rotate-30 transition-all absolute bg-amber-100  top-3 left-3 p-4 flex flex-col justify-center items-center rounded-2xl'>
           <span className='group-hover/date:text-5xl transition-all text-3xl text-green-950'>5</span>
           <span className='font-bold text-amber-700'>sep</span>
         </div>

         <div className='text-white absolute top-3 right-3 group-hover/cart:scale-110 group-hover/cart:text-amber-700 transition-all'>
          <Heart className='size-10' />
         </div>
        

      </div>

       <div>
        <h3 className='text-2xl dark:text-amber-50'>Adobe PhotoShop CC 2022</h3>
        <p className='text-sm text-slate-700 dark:text-slate-900'>Lorem, ipsum dolor.</p>

        <div className='flex justify-between items-center mt-3'>
            <p className='text-3xl font-extrabold text-green-800 dark:text-green-950'>$850</p>
            <button className='btn dark:bg-green-600 dark:hover:bg-green-900 transition-all'>
             <ShoppingCart />
                Add to cart
            </button>
        </div>
       </div>


    </div>
  )
}
