import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    title,
    id,
    employmentType,
    packagePerAnnum,
    jobDescription,
    location,
    rating,
  } = jobItemDetails

  return (
    <Link to={`jobs/${id}`} className="job-item-link">
      <li className="job-item-li-elem">
        <div className="job-item-li-cont-1">
          <img
            className="job-item-company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h1 className="job-item-title">{title}</h1>
            <div className="job-item-rating-cont">
              <AiFillStar className="job-item-star-icon" />
              <p className="job-item-rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-li-cont-2">
          <div className="job-item-icons-cont">
            <div className="job-item-icon-cont">
              <MdLocationOn className="job-item-icon" />
              <p className="job-item-icon-text">{location}</p>
            </div>
            <div className="job-item-icon-cont">
              <BsBriefcaseFill className="job-item-icon" />
              <p className="job-item-icon-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-item-salary-text">{packagePerAnnum}</p>
        </div>
        <h1 className="job-item-description-text">Description</h1>
        <p className="job-item-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
