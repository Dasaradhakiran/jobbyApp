import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-cont">
    <Header />
    <div className="home-sub-cont">
      <h1 className="home-main-text">Find The Job That Fits Your Life</h1>
      <p className="home-sub-text">
        Millions of people are Searching for jobs,salary information,company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="home-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
