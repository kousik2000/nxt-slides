import './index.css'

import {useState, useEffect} from 'react'

const RightSideSection = props => {
  const {itemDetail, isCardDetailsChanged} = props
  const {id, heading, description} = itemDetail

  const [cardHeading, setCardHeading] = useState(heading)
  const [cardDescription, setCardDescription] = useState(description)

  const [editHeading, setEditHeading] = useState(false)
  const [editDescription, setEditDescription] = useState(false)

  const [activeSlideId, setActiveSlideId] = useState(id)

  const keyDownForHeading = event => {
    if (event.key === 'Enter') {
      setEditHeading(false)
    }
  }

  const keyDownForDescription = event => {
    if (event.key === 'Enter') {
      setEditDescription(false)
    }
  }

  const onHeadingClicked = () => {
    setEditHeading(true)
    setActiveSlideId(id)
  }

  const onDescriptionClicked = () => {
    setEditDescription(true)
    setActiveSlideId(id)
  }

  useEffect(() => {
    if (
      (heading !== cardHeading && editHeading) ||
      (description !== cardDescription && editDescription)
    ) {
      isCardDetailsChanged(activeSlideId, cardHeading, cardDescription)
    }
  }, [
    cardHeading,
    cardDescription,
    description,
    editHeading,
    editDescription,
    heading,
    id,
    isCardDetailsChanged,
    activeSlideId,
  ])

  return (
    <div className="main-card-item">
      {editHeading ? (
        <input
          type="text"
          value={cardHeading}
          onChange={event => setCardHeading(event.target.value)}
          onKeyDown={keyDownForHeading}
          onBlur={() => setEditHeading(false)}
        />
      ) : (
        <h1 className="card-main-heading" onClick={onHeadingClicked}>
          {cardHeading}
        </h1>
      )}

      {editDescription ? (
        <input
          type="text"
          value={cardDescription}
          onChange={event => setCardDescription(event.target.value)}
          onKeyDown={keyDownForDescription}
          onBlur={() => setEditDescription(false)}
        />
      ) : (
        <p className="card-main-description" onClick={onDescriptionClicked}>
          {cardDescription}
        </p>
      )}
    </div>
  )
}

export default RightSideSection
