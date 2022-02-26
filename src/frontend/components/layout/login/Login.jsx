import React, {useRef} from 'react'

function Login() {

  const formRef = useRef();

  return (
    <section className='login-parent-container'>
    
      <form ref={formRef} className="login-form-parent-container">
        <div className='login-form-input-wrapper'>
          <input type="text" placeholder="Username" required/>

          <input type="text" placeholder="Password" required/>
        </div>

      </form>


    </section>
  );
};

export default Login;
