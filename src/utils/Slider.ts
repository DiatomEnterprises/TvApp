import { C } from "#utils"

const collections = (current: number) => {
  if (current > 1) {
    const modifier = current - 1
    return { transform: `translateX(${-modifier * C.COLLECTION_WIDTH}px)` }
  } else {
    return { transform: `translateX(0px)` }
  }
}

const movies = (current: number) => {
  const preview = (C.MOVIES_HEIGHT - C.MOVIE_LINE_HEIGHT) / 2
  const modifier = current > 0 ? preview : 0
  return { transform: `translateY(${-current * C.MOVIE_LINE_HEIGHT + modifier}px)` }
}

export const Slider = { collections, movies }
