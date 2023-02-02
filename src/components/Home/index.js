import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import BookSlider from '../BookSlider'
import ContactUs from '../ContactUs'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {topRatedBookList: [], activeApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({activeApiStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      this.setState({
        topRatedBookList: updatedData,
        activeApiStatus: apiStatus.success,
      })
    } else {
      this.setState({activeApiStatus: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {topRatedBookList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <ul className="home-slick-container">
        <Slider {...settings} className="slick-container">
          {topRatedBookList.map(each => (
            <BookSlider bookDetails={each} key={each.id} />
          ))}
        </Slider>
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dwkye4hwh/image/upload/v1674915688/samples/Group_7522_wwepah.svg"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <Link to="/">
        <button type="button" className="failure-btn">
          Try Again
        </button>
      </Link>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container-top-rated" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderTopRatedBooksRepository = () => {
    const {activeApiStatus} = this.state
    switch (activeApiStatus) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header isHomeActive isShelvesActive={false} />
        <div className="bg-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-para">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf">
            <button type="button" className="home-btn-small">
              Find Books
            </button>
          </Link>
          <div className="top-rated-books-container">
            <div className="top-rated-heading">
              <h1 className="top-rated-heading-element">Top Rated Books</h1>
              <Link to="/shelf">
                <button type="button" className="home-btn">
                  Find Books
                </button>
              </Link>
            </div>
            {this.renderTopRatedBooksRepository()}
          </div>
        </div>
        <ContactUs />
      </div>
    )
  }
}

export default Home
