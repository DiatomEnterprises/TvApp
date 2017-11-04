import { C } from "#utils"

const collections = (index: number, current: number) => {
  const modifier = current > 0 ? current - 1 : current
  if (index < modifier && current > 1) {
    return { opacity: 0 }
  } else {
    return { transform: `translateX(${(index - modifier) * C.COLLECTION_WIDTH}px)` }
  }
}

const movies = (index: number, current: number) => {
  const preview = (C.MOVIES_HEIGHT - C.MOVIE_LINE_HEIGHT) / 2
  const modifier = current > 0 ? preview : 0

  if (index < current) {
    return { transform: `translateY(${-C.MOVIE_LINE_HEIGHT + modifier}px)` }
  } else {
    return { transform: `translateY(${(index - current) * C.MOVIE_LINE_HEIGHT + modifier}px)` }
  }
}

export const Slider = { collections, movies }
