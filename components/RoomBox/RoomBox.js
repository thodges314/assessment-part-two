import PropTypes from 'prop-types'

const header = (active, number, onCheck) => (
  <div id='header'>
    {number > 1 && (
      <input type='checkbox' checked={!!active} onChange={onCheck} />
    )}
    <span id='text'>Room {number}</span>
    <style jsx>{`
      #header {
        background: ${active ? '#e7e7e7' : '#dadae2'};
        border-radius: 10px 10px 0 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        font-weight: ${active ? 'bold' : 'normal'};
        margin-bottom: 5px;
        padding-bottom: 10px;
        padding-left: 4px;
        padding-top: 4px;
      }
      #text {
        margin-left: 2px;
        position: relative;
        top: 1.2px;
      }
    `}</style>
  </div>
)

const selector = (active, count, title, values, onChange) => {
	const options = values.map(value => (
    <option value={value} key={value}>
      {value}
    </option>
  ))
  return (
    <div id='selector'>
      <div>{title.lineOne}</div>
      <div>{title.lineTwo}</div>
      <select disabled={!active} value={count} onChange={onChange}>
        {options}
      </select>
      <style jsx>{`
        #selector {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 60px;
        }
      `}</style>
    </div>
  )
}

const RoomBox = ({active, adults, children, number, onChange, onCheck}) => {
  return (
    <div id='wrapper'>
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
      <style jsx>{`
        #wrapper {
          background: ${active ? '#fff' : '#dadae2'};
          border-radius: 15px;
          border: 4px solid ${active ? '#e7e7e7' : '#cad0e0'};
          display: flex;
          flex-direction: column;
          height: 130px;
          margin: 10px;
          width: 185px;
        }
        #selectors {
          display: flex;
          flex-direction: row;
          height: 80px;
          justify-content: space-around;
        }
      `}</style>
    </div>
  )
}

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