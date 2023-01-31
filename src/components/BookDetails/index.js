import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'
import ContactUs from '../ContactUs'
import Header from '../Header'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookItem: {}, activeApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getBookItem()
  }

  getBookItem = async () => {
    this.setState({activeApiStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.book_details.id,
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        title: data.book_details.title,
        readStatus: data.book_details.read_status,
      }
      this.setState({bookItem: updatedData, activeApiStatus: apiStatus.success})
    } else {
      this.setState({activeApiStatus: apiStatus.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dwkye4hwh/image/upload/v1674915688/samples/Group_7522_wwepah.svg"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <Link to="/books/id">
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

  renderSuccessView = () => {
    const {bookItem} = this.state
    const {
      authorName,
      aboutAuthor,
      aboutBook,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookItem

    return (
      <div className="book-item-details-container">
        <div className="book-details-card">
          <img src={coverPic} alt={title} className="book-item-cover-pic-img" />
          <div>
            <h1 className="book-item-heading">{title}</h1>
            <p className="book-item-rating">{authorName}</p>
            <div className="book-item-rating-container">
              <p className="book-item-rating">Avg Rating</p>
              <BsFillStarFill className="book-item-star-icon" />
              <p className="book-item-rating">{rating}</p>
            </div>
            <p className="book-item-rating">
              Status: <span className="book-item-span">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr />
        <h1 className="book-details-heading">About Author</h1>
        <p className="book-details-para">{aboutAuthor}</p>
        <h1 className="book-details-heading">About Book</h1>
        <p className="book-details-para">{aboutBook}</p>
      </div>
    )
  }

  renderRepository = () => {
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
      <div className="book-details-container-container">
        <Header />
        <div>{this.renderRepository()}</div>
        <ContactUs />
      </div>
    )
  }
}

export default BookDetails
