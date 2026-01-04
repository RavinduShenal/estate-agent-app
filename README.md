# 🏠 Estate Agent Web Application

This project is a React-based Estate Agent web application developed as part of the coursework for **5COSC026W – Web Design and Development**.  
The application allows users to search for properties, view property details, and manage a list of favourite properties using an interactive and responsive interface.

---

## 📌 Features

- 🔍 **Property Search**
  - Filter properties by:
    - Property type (House / Flat)
    - Price range
    - Number of bedrooms
    - Postcode area
    - Date added

- 🏡 **Property Listings**
  - Properties displayed as responsive cards
  - Each card shows:
    - Property image
    - Type
    - Location
    - Price

- ❤️ **Favourites System**
  - Add or remove properties from favourites
  - Drag and drop properties into the favourites sidebar
  - Favourites are stored using `localStorage`
  - Clear all favourites option available

- 📄 **Property Details Page**
  - View full property details
  - Image gallery with thumbnails
  - Tabs for:
    - Description
    - Floor plan
    - Google Map location
  - Add or remove favourites directly from details page

- 📱 **Responsive Design**
  - Optimised for desktop, tablet, and mobile screen sizes
  - Grid layout adapts to smaller screens

---

## 🛠️ Technologies Used

- **React** (Functional Components & Hooks)
- **React Router DOM** (Client-side routing)
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3** (Component-based styling)
- **Local Storage API**
- **JSON** (Property data source)

---

## 📂 Project Structure

src/
│
├── components/
│ ├── PropertyCard.jsx
│ ├── PropertyDetails.jsx
│ ├── SearchForm.jsx
│ └── FavouritesSidebar.jsx
│
├── data/
│ └── properties.json
│
├── styles/
│ ├── App.css
│ ├── PropertyCard.css
│ ├── PropertyDetails.css
│ ├── SearchForm.css
│ └── FavouritesSidebar.css
│
├── App.jsx
├── main.jsx
└── index.css

## ▶️ How to Run the Project

1. Clone the repository or extract the project files
2. Open a terminal in the project directory
3. Install dependencies:
   ```bash
   npm install
4. Start the development server:
    npm run dev
5. Open the provided local URL in your browser

