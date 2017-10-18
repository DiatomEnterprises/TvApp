import { Events } from "#utils"

const FOCUSED_CLASS = ".c-focused"

const Mapping: KeyboardMap.Map = {
  navigation: {
    selector: ".c-nav",
    up: ":prev",
    down: ":next"
  }
}

export const Execute = (map: keyof KeyboardMap.Map, control: keyof KeyboardMap.Controls) => {
  const controls = Mapping[map]
  const action = controls[control]
  const element = document.querySelector(`${controls.selector} ${FOCUSED_CLASS}`)
  if (!element) return

  switch (action) {
    case ":prev": {
      const sibling = element.previousElementSibling
      if (sibling) {
        Events.click(sibling)
      }
      return
    }
    case ":next": {
      const sibling = element.nextElementSibling as HTMLElement
      if (sibling) {
        Events.click(sibling)
      }
      return
    }
    default:
      return console.error("Not implemented")
  }
}
