/* TODO: This page is a generic products page: */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectItems } from '../../../reduxslices/productSlice';
import { setLoader, isLoading } from '../../../reduxslices/loadingSlice';
import { ProductCards, Loading } from '../../utils';

const ProductsPg = () => {
const dispatch = useDispatch();
const items = useSelector(selectItems);
const loadStatus = useSelector(setLoader);
console.log("Items from ProductsPag: ", items)
console.log("The status of loader: ", loadStatus);
/* const [loading, setLoading] = useState(true); */
/* TODO: This logic (line 8 - 33), works to fetch products but I need to do it in Redux */
/* const [products, setProducts] = useState(''); */

  /* const FAKESTORE_API_URL = "https://fakestoreapi.com/"; */

  /* Logic to request products from fakestoreapi.com : */
      /* const productRequest = () => {
          return axios.get(FAKESTORE_API_URL + "products?limit=5")
          .then(res => {
            const reqProducts = res.data;
            setProducts(reqProducts);
          })
      }; */

     /*  useEffect(() => {
        productRequest();
      }, [])  */

      /* async function getAllProducts() {
        try {
          const { data } = await axios.get('/api/products');
          return data;
        } catch (error) {
          throw error;
        }
      }; */

    /* TODO: Working on fetching from my API - Bug that fetches every time we hit the route. Need to onky fetch ONCE: */
      /* useEffect(() => {
        console.log("I rerendered")

          window.addEventListener('dispatching',dispatch(getProducts()) );

          return () => {
            window.removeEventListener('dispatching', dispatch(getProducts()));
          }
          

      }, [dispatch]); */

      useEffect(() => {

        if(items.length === 0 ) {
          dispatch(getProducts());
          dispatch(isLoading(true))
          setTimeout(() => {
            dispatch(isLoading(false))
          }, 2000);
          
        } else {
          console.log("The other condition")
          return;
        }

      },[dispatch, items])


  console.log("The amount of items on product page: ", items.length )

  /* if(loading) return <Loading /> */
  /* setTimeout(() => {
    setLoading(false);
}, 1000); */
  if(loadStatus) return <Loading/>
  return (
    <section className='productspg-parent-container'>
      {/* <h1>{loadStatus.loading}</h1> */}
      {items && items.map(productCard => {
        return (
          <ProductCards 
            id={productCard.id} 
            key={productCard.id} 
            title={productCard.title} 
            description={productCard.description}
            category={productCard.category}
            image={productCard.image}
            price={productCard.price}  
          />
        )
      }
        
      )}

      <h1>{loadStatus}</h1>

    </section>
  );
};

export default ProductsPg