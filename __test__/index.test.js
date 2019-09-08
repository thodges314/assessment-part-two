import {render, cleanup} from '@testing-library/react'
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