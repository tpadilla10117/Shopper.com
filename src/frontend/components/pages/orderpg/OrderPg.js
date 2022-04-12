/* This is the page to display a user's orders: */
    import React from 'react';
    import { Orders } from '../../utils.js';
    
    function OrderPg() {

        
      return (
        <main>
          <section>
            <h1>Your Orders</h1>

        {/* TODO: Need to style orders component: */}
            <div>
              <Orders />
            </div>
          </section>
        
        </main>
      )
    }
    
    export default OrderPg;