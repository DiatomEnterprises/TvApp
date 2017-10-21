import Preact from "#preact"

interface DateTimeState {
  time: string
  date: string
}

const parseDate = (): DateTimeState => {
  const d = new Date()
  const [, month, day] = d.toDateString().split(" ")
  const time = d
    .toTimeString()
    .split(" ")[0]
    .slice(0, -3)
  return { time, date: `${day} ${month}` }
}

export class DateTime extends Preact.Component<{}, DateTimeState> {
  constructor() {
    super()
    this.state = parseDate()
  }

  componentDidMount() {
    setInterval(() => this.setState(parseDate()), 60000)
  }

  render({}, { time, date }: DateTimeState) {
    return (
      <div className="c-date_time float__right center__vertical">
        <div className="c-date_time__time h1">{time}</div>
        <div className="c-date_time__date">{date}</div>
      </div>
    )
  }
}
