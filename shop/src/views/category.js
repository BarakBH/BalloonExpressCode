import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductsGrid from '../components/productsGrid';

const Category = () => {
  const { products } = useSelector((state) => state.DataReducer);
  const { category } = useParams();
  const [categoryproducts, setCategoryproducts] = useState([]);

  useEffect(() => {
    console.log(category)
    setCategoryproducts(products.filter((product) => product?.category.value === category));
  },[products, category]);
  return (
    <main className='main'>
      <ProductsGrid products={categoryproducts} title={`המוצר/השירות :  ${category.replaceAll('-', ' ')}`} />
    </main>
  )
}

export default Category