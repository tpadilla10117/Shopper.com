/* Success page rendered when a user completes an order: */    

import React, { useEffect } from 'react';
/* import { withRouter, useHistory } from 'react-router-dom'; */

function SuccessPg() {

  /* let history = useHistory(); */

  return (
    <div>
      <main className="max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            {/* <CheckCircleIcon className="text-green-500 h-10" /> */}
                            <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
                        </div>

                        <p>
                            Thank you for shopping with us.  We'll send a confirmation once your item has shipped, if you would like to check the status of order(s) please press the link below.
                        </p>

                        <button className="button mt-8" /* onClick={ () => router.push("/orders")} *//* onClick={() => history.push('/')} */>Go to home</button>

                    </div>

                </main>



    </div>
  )
}

export default SuccessPg;