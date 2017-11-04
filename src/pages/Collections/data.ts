const array = [
  { id: 1, name: "Superheroes", length: 22, image: "backgrounds/superheroes_bg.jpg" },
  { id: 2, name: "Cartoons", length: 15, image: "backgrounds/cartoons_bg.jpg" },
  { id: 3, name: "Horror", length: 24, image: "backgrounds/horror_bg.jpg" },
  { id: 4, name: "Comedy", length: 7, image: "backgrounds/comedy_bg.jpg" },
  { id: 5, name: "Action", length: 13, image: "backgrounds/action_bg.jpg" }
]

export default array

export const getCollection = (path: string) => {
  const match = path.match(/\/movies\/(\d+)/)
  if (match) {
    const id = parseInt(match[1], 10)
    return array.find(item => item.id === id)
  }
}
