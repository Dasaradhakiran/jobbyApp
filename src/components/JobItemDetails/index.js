import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    isLoading: false,
    jobDetailsFailureView: false,
    skillsList: [],
    lifeAtCompany: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    if (response.ok) {
      const updateData = {
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        companyWebsiteUrl: data.job_details.company_website_url,
        title: data.job_details.title,
      }
      const updateSkills = data.job_details.skills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))

      const updateLifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const updateSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      await this.setState({
        jobDetails: updateData,
        isLoading: false,
        jobDetailsFailureView: false,
        skillsList: updateSkills,
        lifeAtCompany: updateLifeAtCompany,
        similarJobs: updateSimilarJobs,
      })
    } else {
      await this.setState({isLoading: false, jobDetailsFailureView: true})
    }
  }

  renderJobDetailsContainer = () => {
    const {similarJobs} = this.state
    return (
      <div className="job-item-details-sub-cont">
        <div className="job-item-details-sub-cont-1">
          {this.renderJobDetailsView()}
          {this.renderSkillsView()}
          {this.renderLifeAtCompanyView()}
        </div>
        <h1 className="job-item-details-similar-text">Similar Jobs</h1>
        <ul className="job-item-details-similar-ul-cont">
          {similarJobs.map(eachItem => (
            <SimilarJobs key={eachItem.id} similarJobDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsView = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      companyWebsiteUrl,
      title,
    } = jobDetails

    return (
      <div className="job-item-details-card-cont">
        <div className="job-item-details-card-cont-1">
          <img
            className="job-item-details-company-logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div>
            <h1 className="job-item-details-title">{title}</h1>
            <div className="job-item-details-rating-cont">
              <AiFillStar className="job-item-details-star-icon" />
              <p className="job-item-details-rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-details-card-cont-2">
          <div className="job-item-details-icons-cont">
            <div className="job-item-details-icon-cont">
              <MdLocationOn className="job-item-details-icon" />
              <p className="job-item-details-icon-text">{location}</p>
            </div>
            <div className="job-item-details-icon-cont">
              <BsBriefcaseFill className="job-item-details-icon" />
              <p className="job-item-details-icon-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-item-details-salary-text">{packagePerAnnum}</p>
        </div>
        <div className="job-item-details-description-cont">
          <h1 className="job-item-details-description-text">Description</h1>
          <a href={companyWebsiteUrl} className="job-item-details-anchor-cont">
            <p className="job-item-details-visit">Visit</p>
            <FiExternalLink className="job-item-details-visit" />
          </a>
        </div>
        <p className="job-item-details-description">{jobDescription}</p>
      </div>
    )
  }

  renderSkillsView = () => {
    const {skillsList} = this.state
    return (
      <div>
        <h1 className="job-item-details-skills-text">Skills</h1>
        <ul className="job-item-details-skill-ul-cont">
          {skillsList.map(eachSkill => (
            <li key={eachSkill.name} className="job-item-details-skill-li-cont">
              <img
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
                className="job-item-details-skill-image"
              />
              <p className="job-item-details-skill-name">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompanyView = () => {
    const {lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany
    return (
      <div>
        <h1 className="job-item-details-skills-text">Life at Company</h1>
        <div className="job-item-details-life-at-company-cont">
          <p className="job-item-details-skill-name">{description}</p>
          <img
            className="job-item-details-life-at-company-image"
            src={imageUrl}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsFailureView = () => (
    <div className="job-item-details-failure-cont">
      <img
        className="job-item-details-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-item-details-failure-main-text">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-details-failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {isLoading, jobDetailsFailureView} = this.state
    const renderJobDetailsUi = jobDetailsFailureView
      ? this.renderJobDetailsFailureView()
      : this.renderJobDetailsContainer()

    return (
      <div className="job-item-details-cont">
        <Header />
        {isLoading ? this.renderLoaderView() : renderJobDetailsUi}
      </div>
    )
  }
}

export default JobItemDetails
