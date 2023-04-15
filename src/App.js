import './App.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import Header from './components/Header'
// eslint-disable-next-line import/extensions
import LeftSideSection from './components/LeftSideSection'
import RightSideSection from './components/RightSideSection'

// This is the list used in the application. You can move them to any component needed.
const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

// Replace your code here
class App extends Component {
  state = {
    SlidesList: initialSlidesList,
    clickedItem: initialSlidesList[0] || null, // Initializing clickedItem as null if SlidesList is empty
  }

  isCardClicked = id => {
    const {SlidesList} = this.state
    const clickedIndex = SlidesList.findIndex(eachItem => eachItem.id === id) // Use findIndex instead of find
    const clickedItem = SlidesList[clickedIndex]

    this.setState({clickedItem})
  }

  isCardDetailsChanged = (id, cardHeading, cardDescription) => {
    this.setState(prevState => ({
      SlidesList: prevState.SlidesList.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            heading: cardHeading,
            description: cardDescription,
          }
        }
        return eachItem
      }),
    }))
  }

  onAddNewSlide = () => {
    const newData = {
      id: uuidv4(),
      heading: 'Heading',
      description: 'Description',
    }

    const {SlidesList, clickedItem} = this.state
    const clickedIndex = SlidesList.findIndex(
      eachItem => eachItem.id === clickedItem.id,
    )

    const updatedList = [
      ...SlidesList.slice(0, clickedIndex + 1),
      newData,
      ...SlidesList.slice(clickedIndex + 1),
    ]

    const newClickedIndex = clickedIndex + 1 // Update the clickedIndex
    this.setState(
      {
        SlidesList: updatedList,
        clickedItem: newData,
      },
      () => {
        this.isCardClicked(updatedList[newClickedIndex].id) // Call isCardClicked with the new clickedItem
      },
    )
  }

  render() {
    const {SlidesList, clickedItem} = this.state
    return (
      <div className="bg-container">
        <Header />
        <div className="sections-container">
          <div className="left-container">
            <button
              className="add-button"
              type="button"
              onClick={this.onAddNewSlide}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
                alt="new plus icon"
                className="addLogo"
              />
              <p className="buttonText">New</p>
            </button>
            <ol>
              {SlidesList.map((eachItem, index) => (
                <LeftSideSection
                  eachItem={eachItem}
                  key={eachItem.id}
                  slideNumber={index}
                  isCardClicked={this.isCardClicked}
                  isSelected={eachItem === clickedItem} // Passing isSelected prop to determine if the item is selected
                />
              ))}
            </ol>
          </div>
          <div className="right-side-container">
            {clickedItem ? ( // Rendering RightSideSection only if clickedItem is not null
              <RightSideSection
                itemDetail={clickedItem}
                key={clickedItem.id}
                isCardDetailsChanged={this.isCardDetailsChanged}
              />
            ) : (
              <p>No slide selected</p> // Showing a message if clickedItem is null
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
