/* This page shows the Checkout page for a customer */
    import React from "react";
    import { useSelector } from "react-redux";
    import { selectItems, selectTotal } from "../../../reduxslices/basketslice.js";
    
    function CheckoutPg() {

        const items = useSelector( selectItems );
        const total = useSelector ( selectTotal );



      return (
        <section>
            CheckoutPg
        </section>
      )
    }
    
    export default CheckoutPg;