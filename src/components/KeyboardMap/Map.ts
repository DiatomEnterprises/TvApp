import { getCurrentUrl } from "preact-router"

const backUrl = (prev: string, next: string) => {
  const path = getCurrentUrl()
    .replace("/back", "")
    .replace(prev, next)
  return `url/${path}`
}

// NOTE: Missing TypeScript support.
export const MapComplex = {
  "movies/view": {
    upFirst: {
      0: "movies/nav@0",
      1: "movies/nav@0",
      2: "movies/nav@0",
      3: "movies/nav@1",
      4: "movies/nav@1"
    }
  },
  "movies/nav": {
    down: {
      0: "movies/view@0",
      1: "movies/view@4"
    }
  }
}

export const MapObject: KeyboardMap.Map = {
  "back.collections": {
    selector: ".c-back_button__wrapper",
    enter: "navigation@4",
    left: "navigation@4",
    right: "collections"
  },
  "back.movies": {
    selector: ".c-back_button__wrapper",
    enter: backUrl.bind(null, "movies/", "collections/"),
    left: backUrl.bind(null, "movies/", "collections/"),
    right: "movies/nav"
  },
  navigation: {
    selector: ".c-nav",
    enter: "collections",
    up: ":prev",
    down: ":next",
    right: "collections"
  },
  collections: {
    selector: ".c-collections__content",
    enter: ":current",
    left: ":prev",
    leftFirst: "back.collections",
    right: ":next"
  },
  "movies/view": {
    selector: ".c-movie__line",
    up: ":prev:parent",
    upFirst: ":complex",
    left: ":prev",
    leftFirst: "back.movies",
    right: ":next",
    down: ":next:parent"
  },
  "movies/nav": {
    selector: ".c-collection__nav",
    enter: ":current",
    left: ":prev",
    leftFirst: "back.movies",
    right: ":next",
    down: ":complex"
  },
  "movies/dropdown": {
    selector: ".c-dropdown",
    enter: ":current",
    up: ":prev",
    leftFirst: "movies/nav@1",
    down: ":next",
    rightLast: "movies/view@4"
  }
}
