import Preact from "#preact"
import * as classNames from "classnames"
import { route } from "preact-router"
import { Match } from "preact-router/match"
import { Focusable } from "#components"

namespace Link {
  export interface Props {
    path: string
    className: string
    activeClassName: string
    children?: JSX.Element[]
    onClick?: Function
  }
}

export class Link extends Preact.Component<Link.Props, {}> {
  onClick = () => {
    const { path, onClick } = this.props
    if (window.location.hash.indexOf(path) === -1) {
      route(path)
    }
    onClick && onClick(path)
  }

  render({ className, activeClassName, path, children }: Link.Props) {
    return (
      <Match path={path}>
        {({ matches }: { matches: boolean }) => (
          <Focusable
            onClick={this.onClick}
            className={classNames(className, { [activeClassName]: matches })}
            map="navigation"
          >
            {children}
          </Focusable>
        )}
      </Match>
    )
  }
}
