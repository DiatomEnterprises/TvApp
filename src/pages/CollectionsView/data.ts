const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu ante eu orci gravida ultrices tempus non ipsum. Curabitur fermentum rutrum lectus, id eleifend libero placerat eu."

const movies = [
  { id: 1, name: "Alien", rating: 5, date: "2017-01-15", recent: true },
  { id: 2, name: "Alien", rating: 5, date: "2017-01-15", popular: true },
  { id: 3, name: "Alien", rating: 5, date: "2017-01-15" },
  { id: 4, name: "Alien", rating: 5, date: "2017-01-15" },
  { id: 5, name: "Alien", rating: 5, date: "2017-01-15" },
  { id: 6, name: "Alien", rating: 5, date: "2017-01-15" },
  { id: 7, name: "Alien", rating: 5, date: "2017-01-15" },
  { id: 8, name: "Alien", rating: 5, date: "2017-01-15" },
  { id: 9, name: "Alien", rating: 5, date: "2017-01-15" },
  { id: 10, name: "Alien", rating: 5, date: "2017-01-15" },
  { id: 11, name: "Alien", rating: 5, date: "2017-01-15" }
]

export default [
  { id: 1, description, movies: [...movies] },
  { id: 2, description, movies: [...movies] },
  { id: 3, description, movies: [...movies] },
  { id: 4, description, movies: [...movies] },
  { id: 5, description, movies: [...movies] }
]
