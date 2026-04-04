import React from 'react'
import Navbar from '../components/Navbar'
import ProductHeader from '../components/ProductCont'
const ProductPage = () => {
  return (
    <div className='bg-gray-200 h-[100%] pt-4'>
      <Navbar/>
      <div className='m-4 box-border'>
        <ProductHeader/>
      </div>
      
    </div>
  )
}

export default ProductPage
