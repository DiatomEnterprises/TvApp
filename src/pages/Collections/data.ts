const array = [
  { id: 1, name: "Superheroes", length: 22, image: "backgrounds/superheroes_bg.webp" },
  { id: 2, name: "Cartoons", length: 15, image: "backgrounds/cartoons_bg.webp" },
  { id: 3, name: "Horror", length: 24, image: "backgrounds/horror_bg.webp" },
  { id: 4, name: "Comedy", length: 7, image: "backgrounds/comedy_bg.webp" },
  { id: 5, name: "Action", length: 13, image: "backgrounds/action_bg.webp" }
]

export default array

export const getCollection = (path: string) => {
  const match = path.match(/\/movies\/(\d+)/)
  if (match) {
    const id = parseInt(match[1], 10)
    return array.find(item => item.id === id)
  }
}
