import { Renderer } from "#utils"

export const TestTemplate = (content: string) => {
  const test = (
    <div>
      <div>Hey</div>
      <div>
        Hey22
        <div id="test">{content}</div>
      </div>
    </div>
  )
  return Renderer(test)
}
