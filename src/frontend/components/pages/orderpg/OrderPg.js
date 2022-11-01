/* This is the page to display a user's orders: */
    import React, { useEffect } from 'react';
    import { OrderCards } from '../../utils.js';
    import { useSelector, useDispatch } from 'react-redux';
    import { selectOrders, getOrders } from '../../../reduxslices/ordersSlice';
    
    function OrderPg() {

  /* Dispatch async request from the Thunk: */
    const dispatch = useDispatch();
    const orderItems = useSelector(selectOrders);
    console.log(orderItems)
    console.log(orderItems[0].order_items)

    useEffect( () => {
        if(orderItems.length === 0 ) {
            
            dispatch(getOrders());
            
          } else {
            return;
          }
    }, [dispatch, orderItems]);


        
      return (
      
          <section className='orderpg-parent-wrapper'>
            <h1 className='orderpg-h1'>Orders & Returns</h1>

            <p className='orderpg-subheading'>Tracking. Details. Returns. View all of your order information here.</p>

            <div className='ordercards-parent-wrapper'>
              {orderItems && orderItems.map( orderCard => {
                console.log(orderCard)
                return (
                  <OrderCards 
                    key={orderCard.id}
                    orderDate={orderCard.created_at}
                    amounttotal={orderCard.amount_total}
                    status={orderCard.status}
                    userId={orderCard.user_id}
                    currency={orderCard.currency}

                  /* TODO: Where will i get this info? */
                    shippingstreet={orderCard.shippingstreet}
                    shippingstreet2={orderCard.shippingstreet2}
                    shippingzip={orderCard.shippingzip}
                    shippingcity={orderCard.shippingcity}
                    shippingcountry={orderCard.shippingcountry}
                    shippingstate={orderCard.shippingstate}
                  />
                )
              })}
            </div>

          </section>
        
      )
    }
    
    export default OrderPg;