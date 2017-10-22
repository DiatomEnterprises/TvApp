import Preact from "#preact"

import "./BackButton.scss"

const back = () => {
  const length = (window.location.hash.match(/\//g) || []).length
  if (length > 1) window.history.back()
}

export const BackButton = () => {
  return (
    <div onClick={back} className="c-back_button center__vertical float__left">
      <span className="center__both">◀</span>
    </div>
  )
}
