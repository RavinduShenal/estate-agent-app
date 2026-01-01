import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FavouritesSidebar from '../components/FavouritesSidebar'

const properties = [
  {
    id: 'p1',
    location: 'London',
    price: 200000,
    bedrooms: 2,
    type: 'Flat',
    pictures: ['/img.jpg'],
  },
]

test('shows favourite property in sidebar', () => {
  render(
    <MemoryRouter>
      <FavouritesSidebar
        favourites={['p1']}
        properties={properties}
        onRemove={() => {}}
        onClear={() => {}}
        onDrop={() => {}}
      />
    </MemoryRouter>
  )

  expect(screen.getByText('London')).toBeInTheDocument()
})

test('shows empty message when no favourites', () => {
  render(
    <MemoryRouter>
      <FavouritesSidebar
        favourites={[]}
        properties={[]}
        onRemove={() => {}}
        onClear={() => {}}
        onDrop={() => {}}
      />
    </MemoryRouter>
  )

  expect(screen.getByText(/drag properties here/i)).toBeInTheDocument()
})