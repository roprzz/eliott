import React, { useEffect, useState } from 'react'
import { textToGrid } from './font.js'

const BOOT_LINES = [
  'ELIOTT-OS v1.0 booting from CD-ROM...',
  'reading track 01 ............ ok',
  'loading memories ............ ok',
  'decoding love.dat ........... ok',
  '',
  'C:\\> run eliott.exe',
]

function DotMatrix({ text, delay }) {
  const grid = textToGrid(text)
  return (
    <div className="matrix" role="img" aria-label={text}>
      {grid.map((row, r) => (
        <div className="matrix-row" key={r}>
          {row.map((lit, c) => (
            <span
              key={c}
              className={lit ? 'dot lit' : 'dot'}
              style={lit ? { animationDelay: `${delay + (c * 18) + (r * 40)}ms` } : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [lineCount, setLineCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (lineCount < BOOT_LINES.length) {
      const t = setTimeout(() => setLineCount(lineCount + 1), 350)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShowMessage(true), 400)
    return () => clearTimeout(t)
  }, [lineCount])

  return (
    <div className="screen">
      <div className="terminal">
        <div className="titlebar">
          <span className="btn red" />
          <span className="btn yellow" />
          <span className="btn green" />
          <span className="title">eliott.exe - CD-ROM</span>
        </div>
        <div className="body">
          {BOOT_LINES.slice(0, lineCount).map((line, i) => (
            <div className="boot-line" key={i}>
              {line || ' '}
            </div>
          ))}
          {showMessage && (
            <div className="message">
              <DotMatrix text="Eliott" delay={0} />
              <DotMatrix text="01.12.2025" delay={900} />
              <DotMatrix text="♥" delay={1800} />
              <div className="prompt-line">
                <span>C:\&gt; </span>
                <span className="cursor" />
              </div>
            </div>
          )}
          {!showMessage && (
            <div className="prompt-line">
              <span className="cursor" />
            </div>
          )}
        </div>
      </div>
      <p className="footer">engraved with love, 01.12.2025</p>
    </div>
  )
}
