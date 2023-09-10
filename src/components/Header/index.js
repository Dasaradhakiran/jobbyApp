import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-cont">
      <div className="header-small-cont">
        <Link to="/" className="header-link-elem">
          <img
            className="header-small-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="header-small-ul-cont">
          <Link to="/" className="header-link-elem">
            <li className="header-li-cont">
              <AiFillHome className="header-small-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="header-link-elem">
            <li className="header-li-cont">
              <BsFillBriefcaseFill className="header-small-icon" />
            </li>
          </Link>
          <li className="header-li-cont">
            <button
              className="header-small-logout-button"
              type="button"
              onClick={onClickLogout}
            >
              <FiLogOut className="header-small-icon" />
            </button>
          </li>
        </ul>
      </div>
      <ul className="header-ul-cont">
        <Link to="/" className="header-link-elem">
          <li className="header-li-cont">
            <img
              className="header-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </li>
        </Link>
        <li className="header-li-cont">
          <Link to="/" className="header-link-text">
            Home
          </Link>
          <Link to="/jobs" className="header-link-text">
            Jobs
          </Link>
        </li>
        <li className="header-li-cont">
          <button
            type="button"
            onClick={onClickLogout}
            className="header-logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
