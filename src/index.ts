import { Router } from "#utils"
import { TestTemplate, NavTemplate } from "#templates"

const element = document.getElementById("router")

if (element) {
  const router = new Router(element)

  NavTemplate()

  router.addRoute("/", () => TestTemplate("Hey home"))
  router.addRoute("/page1", () => TestTemplate("Hey page 1"))
  router.addRoute("/page2", () => TestTemplate("Hey page 2"))
}
