const events = {
  MouseEvents: document.createEvent("MouseEvents")
}

events.MouseEvents.initEvent("click", true, false)

const click = (element: Element) => element.dispatchEvent(events.MouseEvents)

export const Events = {
  click
}
