import React from 'react';
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";

function Footer() {
  return (
    <footer className='footer-parent-container'>
        <div className='footer-left-section'>
            <p className='footer-p'>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.
            </p>

            <div className='footer-social-parent-container'>
                <div className='footer-social-wrapper' style={{'color':"3B5999"}}>
                    <Facebook style={{'color':"3B5999"}} />
                </div>
                <div className='footer-social-wrapper'>
                    <Instagram style={{'color':"E4405F"}}/>
                </div>
                <div className='footer-social-wrapper'>
                    <Twitter style={{'color':"55ACEE"}}/>
                </div>
                <div className='footer-social-wrapper'>
                    <Pinterest style={{'color':"E60023"}}/>
                </div>
            </div>

        </div>

        <div className='footer-center-section'>
            <h3 className='footer-center-title'>
                Directory
            </h3>

            <ul className='footer-center-list'>
                <li className='footer-center-listitems'>
                    HOME
                </li>
                <li className='footer-center-listitems'>
                    PRODUCTS
                </li>
                <li className='footer-center-listitems'>
                    ABOUT
                </li>
                <li className='footer-center-listitems'>
                    CART
                </li>
                <li className='footer-center-listitems'>
                    LOGIN
                </li>
                <li className='footer-center-listitems'>
                    HATS
                </li>
                <li className='footer-center-listitems'>
                    JACKET
                </li>
                <li className='footer-center-listitems'>
                    SNEAKERS
                </li>
                <li className='footer-center-listitems'>
                    MENS
                </li>
                <li className='footer-center-listitems'>
                    WOMENS
                </li>
            </ul>
        </div>

        <div className='footer-right-section'>
            <h3 className='footer-right-title'>
                Contact
            </h3>

            <div className='footer-right-contactitem'>
                <Room /> 
                <p>252 Main Street , San Francisco 95822</p>
            </div>
            <div className='footer-right-contactitem'>
                <Phone /> 
                <p>+1 xxx xx xx</p>
            </div>
            <div className='footer-right-contactitem'>
                <MailOutline /> 
                <p>contact@tpadilla.dev</p>
            </div>
            <img 
                className='footer-right-paymentimgs' src="https://i.ibb.co/Qfvn4z6/payment.png" 
                alt='Credit cards'
            />

        </div>

    </footer>
  )
}

export default Footer;