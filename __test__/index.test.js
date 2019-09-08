import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from 'pages/index.js'

afterEach(cleanup)

it('matches snapshot', () => {
	const {asFragment} = render(<App/>)
	expect(asFragment()).toMatchSnapshot()
})

it('renders four boxes', () => {
	const {getByTestId} = render(<App/>)
	expect(getByTestId('boxes-row').children.length).toBe(4)
})

// add a bit to activate and deactivate checkboxes out of order - change values
it('activates and deactivates checkboxes out of order', () => {
	const {getByTestId} = render(<App/>)
	fireEvent.click(getByTestId('box4-active-checkbox'))
	expect(getByTestId('box2-Children-selector').disabled).toBe(false)
	expect(getByTestId('box3-Children-selector').disabled).toBe(false)
	fireEvent.click(getByTestId('box2-active-checkbox'))
	expect(getByTestId('box3-Children-selector').disabled).toBe(true)
	expect(getByTestId('box4-Children-selector').disabled).toBe(true)
	fireEvent.click(getByTestId('box3-active-checkbox'))
	expect(getByTestId('box2-Children-selector').disabled).toBe(false)
	expect(getByTestId('box4-Children-selector').disabled).toBe(true)
})