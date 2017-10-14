import { Link } from "#elements"
import { Renderer } from "#utils"

export const NavTemplate = () => {
  const template = (
    <div>
      <Link path="/">Home</Link>
      <Link path="/page1">Page 1</Link>
      <Link path="/page2">Page 2</Link>
    </div>
  )

  const element = document.getElementById("nav")
  if (element) {
    element.appendChild(Renderer(template))
  }
}
