const collections = (index: number, current: number) => {
  const modifier = current > 0 ? current - 1 : current
  if (index < modifier && current > 1) {
    return { opacity: 0 }
  } else {
    return { transform: `translateX(${(index - modifier) * 500}px)` }
  }
}

const movies = (index: number, current: number) => {
  const modifier = current > 0 ? 70 : 0

  if (current > index + 1) {
    return { opacity: 0 }
  } else {
    return { transform: `translateY(${(index - current) * 312.5 + modifier}px)` }
  }
}

export const Slider = { collections, movies }
