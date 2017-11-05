import { C } from "#utils"

const collections = (index: number, current: number) => {
  const modifier = current > 0 ? current - 1 : current
  if (index < modifier && current > 1) {
    return { opacity: 0, transform: `translateX(${-C.COLLECTION_WIDTH}px)` }
  } else {
    return { transform: `translateX(${(index - modifier) * C.COLLECTION_WIDTH}px)` }
  }
}

const movies = (current: number) => {
  const preview = (C.MOVIES_HEIGHT - C.MOVIE_LINE_HEIGHT) / 2
  const modifier = current > 0 ? preview : 0
  return { transform: `translateY(${-current * C.MOVIE_LINE_HEIGHT + modifier}px)` }
}

export const Slider = { collections, movies }
