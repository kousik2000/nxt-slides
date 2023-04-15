import './index.css'

const LeftSideSection = props => {
  const {eachItem, isCardClicked, slideNumber} = props
  const {id, heading, description} = eachItem

  const onCardClick = () => {
    isCardClicked(id)
  }

  const testId = `slideTab${slideNumber}`

  return (
    <li testid={testId}>
      <p>{slideNumber + 1}</p>
      <button type="button" onClick={onCardClick}>
        <div className="items-container">
          <h1 className="card-heading">{heading}</h1>
          <p className="card-paragraph">{description}</p>
        </div>
      </button>
    </li>
  )
}

export default LeftSideSection
