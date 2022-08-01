/* This is the page to display a user's orders: */
    import React, { useEffect } from 'react';
    import { OrderCards } from '../../utils.js';
    import { useSelector, useDispatch } from 'react-redux';
    import { selectOrders, getOrders } from '../../../reduxslices/ordersSlice';
    
    function OrderPg() {

  /* Dispatch async request from the Thunk: */
    const dispatch = useDispatch();
    const orderItems = useSelector(selectOrders);
    

    useEffect( () => {
        if(orderItems.length === 0 ) {
            
            dispatch(getOrders());
            
          } else {
            return;
          }
    }, [dispatch, orderItems]);


        
      return (
        <main>
          <section>
            <h1>Your Orders</h1>

            {orderItems && orderItems.map( orderCard => {
              return (
                <OrderCards 
                  key={orderCard.id}
                  orderDate={orderCard.orderDate}
                  amounttotal={orderCard.amounttotal}
                  status={orderCard.status}
                  userId={orderCard.userId}
                  shippingstreet={orderCard.shippingstreet}
                  shippingstreet2={orderCard.shippingstreet2}
                  shippingzip={orderCard.shippingzip}
                  shippingcity={orderCard.shippingcity}
                  shippingcountry={orderCard.shippingcountry}
                  shippingstate={orderCard.shippingstate}
                  currency={orderCard.currency}
                />
              )
            })}

          </section>
        
        </main>
      )
    }
    
    export default OrderPg;