import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'

const mockProperty = {
  id: 'p1',
  location: 'London',
  price: 250000,
  bedrooms: 2,
  type: 'Flat',
  pictures: ['/img.jpg'],
}

test('renders property card with details', () => {
  render(
    <BrowserRouter>
      <PropertyCard
        property={mockProperty}
        favourites={[]}
        toggleFavourite={() => {}}
      />
    </BrowserRouter>
  )

  expect(screen.getByText('London')).toBeInTheDocument()
  expect(screen.getByText('£250,000')).toBeInTheDocument()
})
