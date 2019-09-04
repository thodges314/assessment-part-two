import {Component} from 'react'
import {RoomBox} from '../components'

class Selectors extends Component {
	state = {
		data: [{
			adults: 1,
			children: 0
		}]
	}

	render () {
		const {data} = this.state
		let boxesArray = []

		for(let i = 0; i < 4; i++) {
			boxesArray.push(
				<RoomBox
					active = {i < data.length}
					number = {i + 1}
				/>
			)
		}
		
		console.log(boxesArray)

		return(
			<div>{boxesArray}</div>
		)
	}
}

export default Selectors