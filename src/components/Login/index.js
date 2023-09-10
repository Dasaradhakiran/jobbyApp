import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      this.setState({showError: false})
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
    this.setState({username: '', password: ''})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-cont">
        <div className="login-sub-cont">
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.submitForm} className="login-form-cont">
            <label htmlFor="username" className="login-label-text">
              USERNAME
            </label>
            <input
              className="login-input-elem "
              type="text"
              id="username"
              onChange={this.onChangeUsername}
              value={username}
              placeholder="Username"
            />
            <label htmlFor="user password" className="login-label-text">
              PASSWORD
            </label>
            <input
              className="login-input-elem "
              type="password"
              id="user password"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="login-error-text">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
