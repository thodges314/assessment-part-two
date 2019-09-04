import {Component} from 'react'
import {RoomBox} from '../components'

const MAX_ROOMS = 4

class Selectors extends Component {
	state = {
		data: [{
			adults: 1,
			children: 0
		}]
	}

	onCheck = index => event => {
		const {target:{checked}} = event
		if(checked) {
			const {data} = this.state
			const nextData = [...data]
			for (let i = data.length; i <= index; i++){
				nextData.push({adults: 1, children: 0})
			}
			this.setState({data: nextData})
		} else {
			this.setState(prevState => ({data: prevState.data.slice(0, index)}))
		}
	}

	onChange = index => category => event => {
		const {target:{value}} = event
		const {data} = this.state
		const nextData = [...data]
		if (category === 'adults'){
			nextData[index].adults = value
		} else {
			nextData[index].children = value
		}
		this.setState({data: nextData})
	}

	render () {
		const {data} = this.state
		const boxesArray = []

		for(let i = 0; i < MAX_ROOMS; i++) {
			boxesArray.push(
				<RoomBox
					active = {i < data.length}
					number = {i + 1}
					adults = {i < data.length ? data[i].adults : 1}
					children = {i < data.length ? data[i].children : 0}
					onChange = {this.onChange(i)}
					onCheck = {this.onCheck(i)}
					key = {i}
				/>
			)
		}
		
		return(
			<div>{boxesArray}</div>
		)
	}
}

export default Selectors