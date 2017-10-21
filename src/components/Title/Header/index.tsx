import Preact from "#preact"
import { connect } from "preact-redux"

class HeaderComponent extends Preact.Component<MyRedux.Reducers.Title, {}> {
  render({ header, description }: MyRedux.Reducers.Title) {
    return (
      <div className="c-header float__left center__vertical">
        {description && <div className="c-header__description">{description}</div>}
        <div className="c-header__title h1">{header}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ title }: MyRedux.State) => ({
  header: title.header,
  description: title.description
})

export const Header = connect(mapStateToProps)(HeaderComponent as any)
