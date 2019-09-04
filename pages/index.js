import {Component} from 'react'
import {RoomBox} from '../components'

class Selectors extends Component {
	state = {
		data: [{
			adults: 1,
			children: 0
		}]
	}

	onCheck = index => event => {
		const {target:{checked}} = event
		console.log(index, checked)
	}

	render () {
		const {data} = this.state
		const boxesArray = []

		for(let i = 0; i < 4; i++) {
			boxesArray.push(
				<RoomBox
					active = {i < data.length}
					number = {i + 1}
					adults = {i < data.length ? data[i].adults : 1}
					children = {i < data.length ? data[i].children : 0}
					onCheck = {this.onCheck(i)}
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