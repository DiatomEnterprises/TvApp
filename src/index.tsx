import Preact from "#preact"
import { App } from "./app/app"

const app = document.getElementById("app")
if (app) {
  Preact.render(<App />, app)
}
