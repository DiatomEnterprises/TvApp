const array = [
  { id: 1, name: "Superheroes", length: 22 },
  { id: 2, name: "Cartoons", length: 15 },
  { id: 3, name: "Horror", length: 24 },
  { id: 4, name: "Comedy", length: 7 },
  { id: 5, name: "Action", length: 13 }
]

export default array

export const getCollection = (path: string) => {
  const match = path.match(/\/movies\/(\d+)/)
  if (match) {
    const id = parseInt(match[1], 10)
    return array.find(item => item.id === id)
  }
}
