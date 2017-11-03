const MOVIES_PER_LINE = 5

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu ante eu orci gravida ultrices tempus non ipsum. Curabitur fermentum rutrum lectus, id eleifend libero placerat eu."

const movies = [
  { id: 1, name: "Alien1", rating: 5, date: "2017-01-15", recent: true },
  { id: 2, name: "Alien2", rating: 2, date: "2017-01-15", popular: true },
  { id: 3, name: "Alien3", rating: 5, date: "2017-01-15" },
  { id: 4, name: "Alien4", rating: 3, date: "2017-01-15" },
  { id: 5, name: "Alien5", rating: 1, date: "2017-01-15" },
  { id: 6, name: "Alien6", rating: 5, date: "2017-01-15" },
  { id: 7, name: "Alien7", rating: 4, date: "2017-01-15" },
  { id: 8, name: "Alien8", rating: 5, date: "2017-01-15" },
  { id: 9, name: "Alien9", rating: 2, date: "2017-01-15" },
  { id: 10, name: "Alien10", rating: 4, date: "2017-01-15" },
  { id: 11, name: "Alien11", rating: 5, date: "2017-01-15" }
]

const array = [
  { id: 1, description, movies: [...movies] },
  { id: 2, description, movies: [...movies] },
  { id: 3, description, movies: [...movies] },
  { id: 4, description, movies: [...movies] },
  { id: 5, description, movies: [...movies] }
]

export const batchMovies = (array: any[]) => {
  const batches = []
  const movies = [...array]

  while (movies.length) {
    batches.push(movies.splice(0, MOVIES_PER_LINE))
  }
  return batches
}

export const getState = (collectionId: number) => {
  const item = array.find(item => item.id === collectionId)
  if (!item) return

  const { movies, ...collection } = item
  return { collection, movies, batches: batchMovies(movies), titles: movies.length }
}
