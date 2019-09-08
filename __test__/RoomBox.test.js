import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {RoomBox} from 'components'

afterEach(cleanup)

var testData = {
	active: true,
	adults: 1,
	children: 0,
	number: 2
}

const onChange = (group) => (event) => {
	testData[group] = event.target.value
}

const onCheck = () => {
	testData.active = !testData.active
	if(!testData.active) {
		testData.adults = 1
		testData.children = 0
	}
}

it('matches snapshot', () => {
	const {asFragment} = render(<RoomBox {...testData} onChange={onChange} onCheck={onCheck}/>)
	expect(asFragment()).toMatchSnapshot()
})

it('changes adults', () => {
	expect(testData.adults).toBe(1)
	const {getByTestId, rerender} = render(<RoomBox {...testData} onChange={onChange} onCheck={onCheck}/>)
	expect(getByTestId('Adults-selector').value).toBe('1')
	fireEvent.change(getByTestId('Adults-selector'), {target: {value: 2}})
	expect(testData.adults).toBe('2')
	rerender(<RoomBox {...testData} onChange={onChange} onCheck={onCheck}/>)
	expect(getByTestId('Adults-selector').value).toBe('2')
})

it('changes children', () => {
	expect(testData.children).toBe(0)
	const {getByTestId, rerender} = render(<RoomBox {...testData} onChange={onChange} onCheck={onCheck}/>)
	expect(getByTestId('Children-selector').value).toBe('0')
	fireEvent.change(getByTestId('Children-selector'), {target: {value: 2}})
	expect(testData.children).toBe('2')
	rerender(<RoomBox {...testData} onChange={onChange} onCheck={onCheck}/>)
	expect(getByTestId('Children-selector').value).toBe('2')
})

it('deactivates and resets fields when inactive', () => {
	expect(testData.active).toBe(true)
	const {getByTestId, rerender} = render(<RoomBox {...testData} onChange={onChange} onCheck={onCheck}/>)
	expect(getByTestId('Adults-selector').value).toBe('2')
	expect(getByTestId('Children-selector').value).toBe('2')
	expect(getByTestId('active-checkbox').checked).toBe(true)
	expect(getByTestId('Adults-selector').disabled).toBe(false)
	expect(getByTestId('Children-selector').disabled).toBe(false)
	fireEvent.click(getByTestId('active-checkbox'))
	expect(testData.active).toBe(false)
	expect(testData.adults).toBe(1)
	expect(testData.children).toBe(0)
	rerender(<RoomBox {...testData} onChange={onChange} onCheck={onCheck}/>)
	expect(getByTestId('Adults-selector').value).toBe('1')
	expect(getByTestId('Children-selector').value).toBe('0')
	expect(getByTestId('active-checkbox').checked).toBe(false)
	expect(getByTestId('Adults-selector').disabled).toBe(true)
	expect(getByTestId('Children-selector').disabled).toBe(true)
	fireEvent.click(getByTestId('active-checkbox'))
	rerender(<RoomBox {...testData} onChange={onChange} onCheck={onCheck}/>)
	expect(getByTestId('Adults-selector').value).toBe('1')
	expect(getByTestId('Children-selector').value).toBe('0')
	expect(getByTestId('active-checkbox').checked).toBe(true)
	expect(getByTestId('Adults-selector').disabled).toBe(false)
	expect(getByTestId('Children-selector').disabled).toBe(false)

})