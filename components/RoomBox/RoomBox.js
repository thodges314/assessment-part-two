import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'theme'

const {colors} = theme

const header = (active, number, onCheck) => (
  <StyledHeader active={active}>
    {number > 1 && (
      <input type='checkbox' checked={!!active} onChange={onCheck} />
    )}
    <span id='text'>Room {number}</span>
  </StyledHeader>
)

const selector = (active, count, title, values, onChange) => {
  const options = values.map(value => (
    <option value={value} key={value}>
      {value}
    </option>
  ))
  return (
    <StyledSelector active>
      <div>{title.lineOne}</div>
      <div>{title.lineTwo}</div>
      <select disabled={!active} value={count} onChange={onChange}>
        {options}
      </select>
    </StyledSelector>
  )
}

const RoomBox = ({active, adults, children, number, onChange, onCheck}) => {
  return (
    <StyledRoomBox active={active}>
      {header(active, number, onCheck)}
      <div id='selectors'>
        {selector(
          active,
          adults,
          { lineOne: 'Adults', lineTwo: '(18+)' },
          [1, 2],
          onChange('adults')
        )}
        {selector(
          active,
          children,
          { lineOne: 'Children', lineTwo: '(0-17)' },
          [0, 1, 2],
          onChange('children')
        )}
      </div>
    </StyledRoomBox>
  )
}

const StyledHeader = styled.div`
  background: ${props => props.active ? colors.lightGrey : colors.blueGrey};
  border-radius: 10px 10px 0 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  margin-bottom: 5px;
  padding-bottom: 10px;
  padding-left: 4px;
  padding-top: 4px;
  #text {
    margin-left: 2px;
    position: relative;
    top: 1.2px;
  }
`

const StyledSelector = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60px;
`

const StyledRoomBox = styled.div`
  background: ${props => props.active ? colors.white : colors.blueGrey};
  border-radius: 15px;
  border: 4px solid ${props => props.active ? colors.lightGrey : colors.darkBlueGrey};
  display: flex;
  flex-direction: column;
  height: 130px;
  margin: 10px;
  width: 185px;
  #selectors {
    display: flex;
    flex-direction: row;
    height: 80px;
    justify-content: space-around;
  }
`

RoomBox.propTypes = {
  active: PropTypes.bool.isRequired,
  adults: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  number: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired
}

export default RoomBox