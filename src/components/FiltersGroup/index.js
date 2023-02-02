import './index.css'

const FiltersGroup = props => {
  const {isActive, categoryDetails, changeCategory} = props
  const {label, value} = categoryDetails
  const categoryClassName = isActive ? `active-category-name` : ''

  const onClickCategoryItem = () => changeCategory(value)

  return (
    <li className="filter-group-list">
      <button
        type="button"
        onClick={onClickCategoryItem}
        className={`category-name ${categoryClassName}`}
      >
        {label}
      </button>
    </li>
  )
}

export default FiltersGroup
