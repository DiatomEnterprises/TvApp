const onClick = (path: string) => {
  window.location.hash = path
}

export const Link = ({ path }: { path: string }) => {
  return <span onClick={onClick.bind(this, path)} />
}
