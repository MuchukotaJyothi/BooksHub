import './index.css'

const FiltersGroup = props => {
  const {isActive, categoryDetails, changeCategory} = props
  const {label, value} = categoryDetails
  const categoryClassName = isActive
    ? `category-name active-category-name`
    : `category-name`

  const onClickCategoryItem = () => changeCategory(value)

  return (
    <li className={categoryClassName}>
      <button
        type="button"
        onClick={onClickCategoryItem}
        className={categoryClassName}
      >
        {label}
      </button>
    </li>
  )
}

export default FiltersGroup
