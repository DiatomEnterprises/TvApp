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
  name: (array: any[]) => array.sort((a, b) => a.name.localeCompare(b.name)),
  rating: (array: any[]) => array.sort((a, b) => b.rating - a.rating),
  date: (array: any[]) => array.sort((a, b) => b.date - a.date)
}

export const _ = { childIndex, findInBatches, sortBy }
