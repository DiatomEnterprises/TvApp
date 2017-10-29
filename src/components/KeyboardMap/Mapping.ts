import { route } from "preact-router"
import { Events } from "#utils"

const FOCUSED_CLASS = ".c-focused"

const Mapping: KeyboardMap.Map = {
  "back.collections": {
    selector: ".c-back_button__wrapper",
    enter: "navigation@4",
    left: "navigation@4",
    right: "collections"
  },
  "back.collections/view": {
    selector: ".c-back_button__wrapper",
    enter: "url/back",
    left: "url/back"
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
  "collections/view": {
    selector: "."
  }
}

export const Execute = (map: KeyboardMap.MapKeys, control: keyof KeyboardMap.Controls) => {
  const controls = Mapping[map]
  const action = controls[control]
  if (!action) return

  switch (true) {
    case action.includes("url/"):
      const [, url] = action.split("url")
      return handleUrl(url)

    case action.includes(":"):
      return handleActions(controls, action as KeyboardMap.Actions)

    case action.includes("@"):
      const [map, child] = action.split("@")
      return handleLinks(Mapping[map], child)

    default:
      handleMaps(Mapping[action])
  }
}

const handleUrl = (url: string) => {
  const path = window.location.hash.slice(1).replace(url, "")
  route(path, true)
}

const handleActions = (controls: KeyboardMap.Controls, action: KeyboardMap.Actions) => {
  const element = document.querySelector(`${controls.selector} ${FOCUSED_CLASS}`)
  if (!element) {
    return throwElementError(controls.selector)
  }

  switch (action) {
    case ":current": {
      return Events.click(element)
    }
    case ":prev": {
      const sibling = element.previousElementSibling
      if (sibling) {
        Events.click(sibling)
      } else if (controls.first) {
        handleMaps(Mapping[controls.first])
      }
      return
    }
    case ":next": {
      const sibling = element.nextElementSibling
      if (sibling) {
        Events.click(sibling)
      } else if (controls.last) {
        handleMaps(Mapping[controls.last])
      }
      return
    }
    default:
      throw new Error(`Unhandled Action ${action}`)
  }
}

const handleLinks = (controls: KeyboardMap.Controls, child: number | string) => {
  handleMaps(controls, child)
}

const handleMaps = (controls: KeyboardMap.Controls, child: number | string = 0) => {
  const element = document.querySelector(`${controls.selector}`)
  if (element) {
    Events.click(element.children[child])
  } else {
    throwElementError(controls.selector)
  }
}

const throwElementError = (selector: string) => {
  throw new Error(`Can't find element ${selector}`)
}
