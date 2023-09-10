import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: {},
    jobsList: [],
    profileLoading: false,
    jobsLoading: false,
    employmentList: [],
    salaryRange: '',
    searchJobs: '',
    profileFailure: false,
    jobsFailureView: false,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok) {
      const updateData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      await this.setState({
        profileDetails: updateData,
        profileLoading: false,
        profileFailure: false,
      })
    } else {
      this.setState({profileFailure: true, profileLoading: false})
    }
  }

  getJobsDetails = async () => {
    this.setState({jobsLoading: true})
    const {employmentList, salaryRange, searchJobs} = this.state
    const modifyEmploymentType = employmentList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jobsResponse = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${modifyEmploymentType}&minimum_package=${salaryRange}&search=${searchJobs}`,
      options,
    )
    const data = await jobsResponse.json()
    if (jobsResponse.ok === true) {
      const updateData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      await this.setState({
        jobsList: updateData,
        jobsLoading: false,
        jobsFailureView: false,
      })
    } else {
      await this.setState({jobsLoading: false, jobsFailureView: true})
    }
  }

  onClickEmploymentType = event => {
    const {employmentList} = this.state
    const employIdValue = event.target.value
    if (event.target.checked) {
      this.setState(
        {employmentList: [...employmentList, employIdValue]},
        this.getJobsDetails,
      )
    } else {
      const filteredEmploymentList = employmentList.filter(
        eachType => eachType !== employIdValue,
      )
      this.setState(
        {employmentList: filteredEmploymentList},
        this.getJobsDetails,
      )
    }
  }

  onClickSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsDetails)
  }

  onChangeSearchInput = event => {
    this.setState({searchJobs: event.target.value})
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="jobs-profile-cont ">
        <img
          className="jobs-profile-logo"
          src={profileImageUrl}
          alt="profile"
        />
        <h1 className="jobs-profile-name">{name}</h1>
        <p className="jobs-profile-text">{shortBio}</p>
      </div>
    )
  }

  renderEmploymentTypeAndSalaryField = () => (
    <>
      <div className="jobs-employment-salary-cont">
        <h1 className="jobs-employment-salary-text">Type of Employment</h1>
        <ul>
          {employmentTypesList.map(eachType => (
            <li
              className="jobs-employment-salary-li-elem"
              key={eachType.employmentTypeId}
            >
              <input
                onClick={this.onClickEmploymentType}
                id={eachType.employmentTypeId}
                type="checkbox"
                value={eachType.employmentTypeId}
              />
              <label
                className="jobs-employment-salary-label"
                htmlFor={eachType.employmentTypeId}
              >
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="jobs-employment-salary-cont">
        <h1 className="jobs-employment-salary-text">Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachType => (
            <li
              className="jobs-employment-salary-li-elem"
              key={eachType.salaryRangeId}
            >
              <input
                onClick={this.onClickSalaryRange}
                id={eachType.salaryRangeId}
                type="radio"
                value={eachType.salaryRangeId}
                name="salary range"
              />
              <label
                className="jobs-employment-salary-label"
                htmlFor={eachType.salaryRangeId}
              >
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailureView = () => (
    <div className="jobs-failure-cont">
      <img
        className="jobs-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-main-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.getJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="jobs-failure-cont">
      <img
        className="jobs-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="jobs-failure-main-text">No Jobs Found</h1>
      <p className="jobs-failure-text">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  render() {
    const {
      jobsList,
      jobsLoading,
      profileLoading,
      searchJobs,
      profileFailure,
      jobsFailureView,
    } = this.state
    const profileUi = profileFailure ? (
      <button
        className="jobs-failure-button"
        onClick={this.getProfileDetails}
        type="button"
      >
        Retry
      </button>
    ) : (
      this.renderProfile()
    )

    const renderJobsUi =
      jobsList.length === 0 ? (
        this.renderNoJobsView()
      ) : (
        <ul className="jobs-ul-cont">
          {jobsList.map(eachItem => (
            <JobItem key={eachItem.id} jobItemDetails={eachItem} />
          ))}
        </ul>
      )

    const renderJobsView = jobsFailureView
      ? this.renderJobsFailureView()
      : renderJobsUi

    return (
      <div>
        <Header />
        <div className="jobs-cont">
          <div className="jobs-small-search-cont">
            <input
              className="jobs-search-input"
              type="search"
              value={searchJobs}
              onChange={this.onChangeSearchInput}
              placeholder="Search"
            />
            <button
              className="jobs-search-button"
              type="button"
              data-testid="searchButton"
              onClick={this.getJobsDetails}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div>
            <div className="jobs-profile-sub-cont">
              {profileLoading ? this.renderLoader() : profileUi}
            </div>
            <div>{this.renderEmploymentTypeAndSalaryField()}</div>
          </div>
          <div className="jobs-sub-cont">
            <div className="jobs-search-cont">
              <input
                className="jobs-search-input"
                type="search"
                value={searchJobs}
                onChange={this.onChangeSearchInput}
                placeholder="Search"
              />
              <button
                className="jobs-search-button"
                type="button"
                data-testid="searchButton"
                onClick={this.getJobsDetails}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {jobsLoading ? this.renderLoader() : renderJobsView}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
