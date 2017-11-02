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

export const _ = { childIndex, findInBatches }
