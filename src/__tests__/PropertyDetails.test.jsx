import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PropertyDetails from '../components/PropertyDetails'

test('shows error when property is not found', () => {
  render(
    <MemoryRouter initialEntries={['/property/invalid']}>
      <Routes>
        <Route
          path="/property/:id"
          element={
            <PropertyDetails
              properties={[]}
              favourites={[]}
              toggleFavourite={() => {}}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )

  expect(screen.getByText(/property not found/i)).toBeInTheDocument()
})

test('favourite button toggles state', async () => {
  const mockToggle = vi.fn()

  const property = {
    id: 'p1',
    location: 'London',
    price: 100000,
    bedrooms: 1,
    type: 'Flat',
    pictures: ['/img.jpg'],
    added: { day: 1, month: 'Jan', year: 2024 },
    tenure: 'Freehold',
    description: 'Nice',
    postcode: 'SW1',
  }

  render(
    <MemoryRouter initialEntries={['/property/p1']}>
      <Routes>
        <Route
          path="/property/:id"
          element={
            <PropertyDetails
              properties={[property]}
              favourites={[]}
              toggleFavourite={mockToggle}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )

  await screen.findByText('♡')
})
