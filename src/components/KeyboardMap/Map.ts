const backUrl = (prev: string, next: string) => {
  const hash = window.location.hash.slice(1)
  const path = hash.replace("/back", "").replace(prev, next)
  return `url/${path}`
}

export const MapComplex = {
  "movies/view": {
    up: {
      selector: "",
      0: "movies/nav@0",
      1: "movies/nav@0",
      2: "movies/nav@0",
      3: "movies/nav@1",
      4: "movies/nav@1"
    }
  },
  "movies/nav": {
    down: {
      selector: "",
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
    up: ":prev",
    down: ":next",
    right: "collections",
    enter: "collections"
  },
  collections: {
    selector: ".c-collections",
    first: "back.collections",
    left: ":prev",
    right: ":next",
    enter: ":current"
  },
  "movies/view": {
    selector: ".c-movie__line",
    first: "back.movies",
    up: ":complex",
    left: ":prev",
    right: ":next"
  },
  "movies/nav": {
    selector: ".c-collection__nav",
    first: "back.movies",
    left: ":prev",
    right: ":next",
    down: ":complex"
  }
}
