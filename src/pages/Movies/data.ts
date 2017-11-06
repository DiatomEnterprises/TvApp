const MOVIES_PER_LINE = 5

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu ante eu orci gravida ultrices tempus non ipsum. Curabitur fermentum rutrum lectus, id eleifend libero placerat eu."

const movies = [
  { id: 1, name: "Logan", rating: 8.2, date: 1488499200000, image: "movies/actn_01.webp", popular: true },
  { id: 2, name: "Rogue One", rating: 7.9, date: 1481846400000, image: "movies/actn_02.webp" },
  { id: 3, name: "Transformers: The Last Knight", rating: 5.2, date: 1498003200000, image: "movies/actn_03.webp" },
  { id: 4, name: "The Mummy", rating: 5.5, date: 1496966400000, image: "movies/actn_04.webp" },

  { id: 5, name: "Goon", rating: 6.8, date: 1330041600000, image: "movies/cmd_01.webp", popular: true },
  { id: 6, name: "Fist Fight", rating: 5.6, date: 1487289600000, image: "movies/cmd_02.webp" },
  { id: 7, name: "Baywatch", rating: 5.6, date: 1495670400000, image: "movies/cmd_03.webp" },
  { id: 8, name: "Scary Movie", rating: 6.2, date: 962928000000, image: "movies/cmd_04.webp", popular: true },

  { id: 9, name: "The SpongeBob Movie", rating: 6.0, date: 1423180800000, image: "movies/crtn_01.webp" },
  { id: 10, name: "Shrek", rating: 7.9, date: 990144000000, image: "movies/crtn_02.webp" },
  { id: 11, name: "Big Hero 6", rating: 7.8, date: 1415318400000, image: "movies/crtn_03.webp" },
  { id: 12, name: "Toy Story 3", rating: 8.3, date: 1276819200000, image: "movies/crtn_04.webp" },

  { id: 13, name: "IT", rating: 7.8, date: 1504828800000, image: "movies/hrrr_01.webp", recent: true },
  { id: 14, name: "Annabelle: Creation", rating: 6.7, date: 1502409600000, image: "movies/hrrr_02.webp" },
  { id: 15, name: "Gremlin", rating: 4.0, date: 1484092800000, image: "movies/hrrr_03.webp" },
  { id: 16, name: "Jaws", rating: 8.0, date: 172454400000, image: "movies/hrrr_04.webp" },

  { id: 17, name: "Iron Man", rating: 7.9, date: 1209686400000, image: "movies/sh_01.webp" },
  { id: 18, name: "Deadpool", rating: 8.0, date: 1455235200000, image: "movies/sh_02.webp", popular: true },
  { id: 19, name: "Thor", rating: 7.0, date: 1304640000000, image: "movies/sh_03.webp" },
  { id: 20, name: "Spider-Man 3", rating: 6.2, date: 1178236800000, image: "movies/sh_04.webp" },
  { id: 21, name: "Avengers: Age of Ultron", rating: 7.4, date: 1430438400000, image: "movies/sh_05.webp" }
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

export const getState = (collectionId: number, sort: any) => {
  const item = array.find(item => item.id === collectionId)
  if (!item) return

  const { movies, ...collection } = item
  return { collection, movies, batches: batchMovies(movies.sort(sort)), titles: movies.length }
}
