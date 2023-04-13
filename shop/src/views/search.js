import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductsGrid from '../components/productsGrid';

const Search = () => {
  const { products } = useSelector((state) => state.DataReducer);
  const { search } = useParams();
  const [searchproducts, setsearchproducts] = useState([]);

  useEffect(() => {
    setsearchproducts(products.filter((product) => product?.name.toLowerCase().includes(search.toLowerCase())));
  },[products, search]);
  return (
    <main className='main'>
      <ProductsGrid products={searchproducts} title={`מוצר/שירות:  ${search}`} />
    </main>
  )
}

export default Search;