import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-jobs-li-cont">
      <div className="similar-jobs-image-cont">
        <img
          className="similar-jobs-image"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="similar-jobs-title">{title}</h1>
          <div className="similar-jobs-star-icon-cont">
            <AiFillStar className="similar-jobs-star-icon" />
            <p className="similar-jobs-rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-jobs-description-text">Description</h1>
      <p className="similar-jobs-description">{jobDescription}</p>
      <div className="similar-jobs-icons-cont">
        <div className="similar-jobs-icon-cont">
          <MdLocationOn className="similar-jobs-icon" />
          <p className="similar-jobs-icon-text">{location}</p>
        </div>
        <div className="similar-jobs-icon-cont">
          <BsBriefcaseFill className="similar-jobs-icon" />
          <p className="similar-jobs-icon-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
