import { C } from "#utils"

const childIndex = (element: Element): number => {
  const parent = element.parentElement as HTMLElement
  return Array.from(parent.children).indexOf(element)
}

const findInBatches = (id: number, batches: any[][]): number => {
  for (const batchIndex in batches) {
    for (const movieIndex in batches[batchIndex]) {
      if (batches[batchIndex][movieIndex].id === id) {
        return parseInt(batchIndex, 10)
      }
    }
  }
  return 0
}

const sortBy = {
  name: (a: any, b: any) => a.name.localeCompare(b.name),
  rating: (a: any, b: any) => b.rating - a.rating,
  date: (a: any, b: any) => b.date - a.date
}

const background = (image: string | undefined) => {
  return image && { backgroundImage: `url(${C.ASSETS_URL}${image})` }
}

export const _ = { childIndex, findInBatches, sortBy, background }
