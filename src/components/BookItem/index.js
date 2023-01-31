import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, title, coverPic, readStatus, rating, authorName} = bookDetails

  return (
    <li className="book-item-list-container">
      <Link to={`/books/${id}`}>
        <div className="book-item-card">
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
      </Link>
    </li>
  )
}

export default BookItem
