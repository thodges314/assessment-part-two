import {Component} from 'react'
import {RoomBox} from '../components'
import styled from 'styled-components'

const MAX_ROOMS = 4

class Selectors extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    const defaultState = {
      data: [
        {
          adults: 1,
          children: 0
        }
      ]
    }
    const oldData = window.localStorage.getItem('formData')
    this.setState(
      oldData
        ? {
            data: JSON.parse(oldData)
          }
        : {
            ...defaultState
          }
    )
  }

  onCheck = index => event => {
    const {
      target: { checked }
    } = event
    if (checked) {
      const { data } = this.state
      const nextData = [...data]
      for (let i = data.length; i <= index; i++) {
        nextData.push({ adults: 1, children: 0 })
      }
      this.setState({ data: nextData })
    } else {
      this.setState(prevState => ({
        data: prevState.data.slice(0, index)
      }))
    }
  }

  onChange = index => category => event => {
    const {
      target: { value }
    } = event
    const { data } = this.state
    const nextData = [...data]
    if (category === 'adults') {
      nextData[index].adults = value
    } else {
      nextData[index].children = value
    }
    this.setState({ data: nextData })
  }

  onClick = () =>
    window.localStorage.setItem('formData', JSON.stringify(this.state.data))

  render() {
    const { data } = this.state
    const boxesArray = []

    for (let i = 0; i < MAX_ROOMS; i++) {
      boxesArray.push(
        <RoomBox
          active={i < data.length}
          adults={i < data.length ? data[i].adults : 1}
          children={i < data.length ? data[i].children : 0}
          key={i}
          number={i + 1}
          onChange={this.onChange(i)}
          onCheck={this.onCheck(i)}
        />
      )
    }

    return (
      <div>
        {data.length > 0 && (
          <StyledBoxesAndButton>
            <div id='boxesRow'>{boxesArray}</div>
            <button onClick={this.onClick}>Submit</button>
          </StyledBoxesAndButton>
        )}
      </div>
    )
  }
}

const StyledBoxesAndButton = styled.div`
  #boxesRow {
    display: flex;
    flex-wrap: wrap;
  }
  button {
    font-size: 16px;
    margin: 10px;
    padding: 4px;
  }
`

export default Selectors