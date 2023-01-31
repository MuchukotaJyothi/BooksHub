import {Link} from 'react-router-dom'
import './index.css'

const BookSlider = props => {
  const {bookDetails} = props
  const {coverPic, title, authorName, id} = bookDetails

  return (
    <li className="slick-item">
      <Link to={`/books/${id}`}>
        <img className="top-rated-slick-img" src={coverPic} alt={title} />
        <h1 className="slick-heading">{title}</h1>
        <p className="slick-para">{authorName}</p>
      </Link>
    </li>
  )
}

export default BookSlider
