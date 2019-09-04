const header = (number, active, onCheck) => (
	<div id='header'>
		{(number > 1) && <input type='checkbox' checked={active || false} onChange={onCheck}/>}
		Room {number}
		<style jsx>{`
		#header {
			background: ${active? '#e7e7e7' : '#dadae2'};
			padding-bottom: 10px;
			font-family: Arial, Helvetica, sans-serif;
			font-weight: ${active? 'bold':'normal'}
		}
		`}</style>
	</div>
)

const selector = (active, count, title, values, onChange) => {
	const options = values.map(value => <option value={value}>{value}</option>)
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
					width: 90px;
				}
			`}</style>
		</div>
	)

}

const RoomBox = ({number, active, adults, children, onChange, onCheck}) => {
	return (
		<div id = 'wrapper'>
			{header(number, active, onCheck)}
			<div id='selectors'>
				{selector(active, adults ||1, {lineOne: 'Adults', lineTwo:'(18+)'}, [1, 2], onChange('adults'))}
				{selector(active, children || 0, {lineOne: 'Children', lineTwo:'(0-17)'}, [0, 1, 2], onChange('children'))}
			</div>
			<style jsx>{`
			#wrapper {
				border-radius: 15px;
				border: 10px solid ${active ? '#e7e7e7' : '#cad0e0'};
				display: flex;
				flex-direction: column;
				height: 150px;
				width: 225px;
				background: ${active? '#fff' : '#dadae2'};
			}
			#selectors {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
			}
			`}</style>
		</div>
	)
}

export default RoomBox