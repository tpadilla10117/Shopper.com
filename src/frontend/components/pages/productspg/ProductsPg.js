/* TODO: This page is a generic products page: */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../reduxslices/productSlice';

const ProductsPg = () => {
const dispatch = useDispatch();
/* const {items} = useSelector( (state) => state.items); */
/* TODO: This logic (line 8 - 33), works to fetch products but I need to do it in Redux */
const [products, setProducts] = useState('');

  const FAKESTORE_API_URL = "https://fakestoreapi.com/";

  /* Logic to request products from fakestoreapi.com : */
      const productRequest = () => {
          return axios.get(FAKESTORE_API_URL + "products?limit=5")
          .then(res => {
            const reqProducts = res.data;
            setProducts(reqProducts);
          })
      };

     /*  useEffect(() => {
        productRequest();
      }, [])  */

      useEffect(() => {
        dispatch(getProducts())
      }, []);
     

      console.log("Here are my products: ", products);

  return (
    <section className='productspg-parent-container'>

      hi

    </section>
  );
};

export default ProductsPg

/* async function fetchData() {
  fetch(`${BASE_URL}${apiKey}&start_date=2017-07-08&end_date=2017-07-20
`)

  .then((res) => {
    if (res.ok) return res.json();
    throw new Error('An Error occurred when fetching posts');
  })
  .then((posts) => setAstronomy(posts))
  .catch((error) => setError(error.message));
} */