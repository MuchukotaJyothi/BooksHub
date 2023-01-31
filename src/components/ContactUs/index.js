import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const ContactUs = () => (
  <div className="footer-container">
    <ul className="footer-list-container">
      <li className="icon-name">
        <FaGoogle />
      </li>
      <li className="icon-name">
        <FaTwitter />
      </li>
      <li className="icon-name">
        <FaInstagram />
      </li>
      <li className="icon-name">
        <FaYoutube />
      </li>
    </ul>
    <p className="footer-contact">Contact us</p>
  </div>
)

export default ContactUs
