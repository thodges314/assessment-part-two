const RoomBox = ({number, active, adults, children, onChange}) => {
	return (
		<div className = 'wrapper'>
			Test
			<style jsx>{`
			.wrapper {
				border-radius: 10px;
				padding: 10px;
				border: 10px solid ${active ? '#e8e8e8' : '#cad0e0'}
				display: flex;
				height: 150px;
				width: 225px;
				background: ${active? '#fff' : '#dadae2'}
			}
			`}</style>
		</div>
	)
}

export default RoomBox