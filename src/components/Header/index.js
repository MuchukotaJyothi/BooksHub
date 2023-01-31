import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('./login')
  }

  const {isHomeActive, isShelvesActive} = props

  const homeClass = isHomeActive ? 'active-class' : ''
  const shelvesActive = isShelvesActive ? 'active-class' : ''

  const renderListItems = () => (
    <>
      <ul className="nav-menu">
        <li className="nav-menu-item">
          <Link to="/" className={`nav-link ${homeClass}`}>
            Home
          </Link>
        </li>

        <li className="nav-menu-item">
          <Link to="/shelf" className={`nav-link ${shelvesActive}`}>
            Bookshelves
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className="logout-desktop-btn"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </>
  )

  const onClickMenu = () => renderListItems()

  return (
    <nav className="navbar-container">
      <div className="navbar-mobile-container">
        <img
          src="https://res.cloudinary.com/dwkye4hwh/image/upload/v1674897478/Group_7731_kxsjm1.svg"
          alt="website logo"
          className="nav-logo"
        />
        <button type="button" onClick={onClickMenu}>
          <GiHamburgerMenu />
        </button>
      </div>

      <div className="nav-bar-large-container">
        <Link to="/">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dwkye4hwh/image/upload/v1674897478/Group_7731_kxsjm1.svg"
            alt="website logo"
          />
        </Link>
        {renderListItems()}
      </div>
    </nav>
  )
}

export default withRouter(Header)
