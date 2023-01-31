import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import ContactUs from '../ContactUs'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'

import BookItem from '../BookItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    booksList: [],
    activeApiStatus: apiStatus.initial,
    searchInput: '',
    activeCategoryId: bookshelvesList[0].value,
  }

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({activeApiStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeCategoryId} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeCategoryId}&search=${searchInput}`
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
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
      }))
      this.setState({
        booksList: updatedData,
        activeApiStatus: apiStatus.success,
      })
    } else {
      this.setState({activeApiStatus: apiStatus.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getBooksList()
    }
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.getBooksList)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dwkye4hwh/image/upload/v1674915688/samples/Group_7522_wwepah.svg"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <Link to="/shelf">
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
    const {booksList, searchInput} = this.state
    const showSuccessView = booksList.length > 0

    return showSuccessView ? (
      <div className="all-books-container">
        <ul className="books-list-shelves">
          {booksList.map(each => (
            <BookItem bookDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="empty-books-list">
        <img
          src="https://res.cloudinary.com/dwkye4hwh/image/upload/v1675162314/samples/Group_bsfhev.svg"
          alt="no books"
        />
        <p className="no-books-para">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderAllBooks = () => {
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
    const {activeCategoryId, searchInput} = this.state
    let string = ''
    bookshelvesList.filter(each => {
      if (each.value === activeCategoryId) {
        string = each.label
        return string
      }
      return null
    })

    return (
      <div className="book-shelves-container">
        <Header isHomeActive={false} isShelvesActive />
        <div className="books-container">
          <ul className="filters-list">
            <h1 className="filters-list-heading">Bookshelves</h1>
            {bookshelvesList.map(each => (
              <FiltersGroup
                key={each.id}
                isActive={each.value === activeCategoryId}
                categoryDetails={each}
                changeCategory={this.changeCategory}
              />
            ))}
          </ul>
          <div>
            <div className="heading-search-container">
              <h1 className="heading">{string} Books</h1>
              <div className="search-input-container">
                <input
                  value={searchInput}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-icon-button"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderAllBooks()}
          </div>
        </div>
        <ContactUs />
      </div>
    )
  }
}

export default Bookshelves
