const header = (number, active, onCheck) => (
	<div id='header'>
		{(number > 1) && <input type='checkbox' checked={!!active} onChange={onCheck}/>}
		<span id='text'>Room {number}</span>
		<style jsx>{`
		#header {
			background: ${active? '#e7e7e7' : '#dadae2'};
			padding-bottom: 10px;
			padding-left: ${number === 1 ? '5px':'4px'};
			padding-top: 4px;
			font-family: Arial, Helvetica, sans-serif;
			font-weight: ${active? 'bold':'normal'};
			font-size: 16px;
			border-radius: 10px 10px 0 0;
			margin-bottom: 5px;
		}
		#text {
			position: relative;
			top: 1.2px;
		}
		`}</style>
	</div>
)

const selector = (active, count, title, values, onChange) => {
	const options = values.map(value => <option value={value} key={value}>{value}</option>)
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
					width: 70px;
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
				{selector(active, adults || 1, {lineOne: 'Adults', lineTwo:'(18+)'}, [1, 2], onChange('adults'))}
				{selector(active, children || 0, {lineOne: 'Children', lineTwo:'(0-17)'}, [0, 1, 2], onChange('children'))}
			</div>
			<style jsx>{`
			#wrapper {
				border-radius: 15px;
				border: 4px solid ${active ? '#e7e7e7' : '#cad0e0'};
				display: flex;
				flex-direction: column;
				height: 130px;
				width: 185px;
				background: ${active? '#fff' : '#dadae2'};
				margin: 10px;
			}
			#selectors {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				height: 80px;
			}
			`}</style>
		</div>
	)
}

export default RoomBox