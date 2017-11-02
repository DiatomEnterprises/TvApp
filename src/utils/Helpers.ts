const childIndex = (element: Element): number => {
  const parent = element.parentElement as HTMLElement
  return Array.from(parent.children).indexOf(element)
}

export const _ = { childIndex }
