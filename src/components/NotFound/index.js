import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dwkye4hwh/image/upload/v1675160184/samples/Group_7484_entkb5.svg"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found </h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="failure-btn" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
