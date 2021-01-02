import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import './app.scss'

const convert = props => {
  const { unixtime, format } = props
  const result = []
  const lines = unixtime.split('\n')
  for (const key in lines) {
    const line = lines[key]
    const _convert = moment.unix(line).format(format)
    result.push(_convert)
  }
  return result.join('\n')
}

const App = () => {
  const defaultUnixtime = window.localStorage.getItem('unixtime') || '1362585819\n1495870860\n1609595708'
  const defaultFormat = window.localStorage.getItem('format') || 'dddd, MMMM Do YYYY, h:mm:ss a'
  const [unixtime, setUnixtime] = useState(defaultUnixtime)
  const [format, setFormat] = useState(defaultFormat)
  const [output, setOutput] = useState(convert({ unixtime, format }))

  const onUnixtimeChange = e => {
    const value = e.target.value
    setUnixtime(value)

    const _convert = convert({ unixtime: value, format })
    setOutput(_convert)

    window.localStorage.setItem('unixtime', value)
  }

  const onFormatChange = e => {
    const value = e.target.value
    setFormat(value)

    const _convert = convert({ unixtime, format: value })
    setOutput(_convert)

    window.localStorage.setItem('format', value)
  }

  return (
    <div id='app'>
      <textarea
        rows='3'
        id='unixtime'
        value={unixtime}
        placeholder='Unixtime'
        onChange={onUnixtimeChange}
      />

      <input
        type='text'
        id='format'
        value={format}
        placeholder='Format'
        onChange={onFormatChange}
      />

      <textarea
        readOnly
        rows='3'
        id='output'
        value={output}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
