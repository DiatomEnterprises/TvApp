export interface Item {
  name: string
  route: MyRedux.SortBy
}

export const data: Item[] = [
  { name: "A-Z", route: "name" },
  { name: "Rating", route: "rating" },
  { name: "Release Date", route: "date" }
]
