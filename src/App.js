/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

function App () {
  const [digits, setDigits] = useState([])
  const [calc, setCalc] = useState('')
  const [result, setResult] = useState('')
  const calculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue
  }
  const posibleOperator = Object.keys(calculatorOperations)
  useEffect(() => {
    const createDigits = () => {
      const digits = []
      for (let i = 0; i < 9; i++) {
        digits[i] = i + 1
      }
      setDigits(digits)
    }
    createDigits()
  }, [])

  const handleCalcs = ({ target }) => {
    if ((posibleOperator.includes(target.value) && calc === '') ||
        (posibleOperator.includes(target.value) && posibleOperator.includes(calc.slice(-1)))
    ) {
      return
    }
    setCalc(calc + target.value)
  }
  const handleResult = () => {
    posibleOperator.forEach(el => {
      if (calc.includes(el)) {
        const [value1, value2] = calc.split(el)
        const calculo = calculatorOperations[el](Number(value1), Number(value2))
        setResult(calculo)
        setCalc('')
      }
    })
  }

  const handleDelete = () => {
    setCalc('')
    setResult('')
  }
  return (
    <div className='App'>
      <div className='calculator'>
        <div className='display'>
          {result ? <span>{result}</span> : ''}
          &nbsp;&nbsp;
          {calc || 0}
        </div>
        <div className='operators'>
          {posibleOperator.map((val, index) => (
            <button key={index} onClick={handleCalcs} value={val}>{val}</button>
          )
          )}

          <button onClick={handleDelete}>DEL</button>
        </div>
        <div className='digits'>
          {digits.map((digit) =>
            (
              <button onClick={handleCalcs} value={digit} key={digit}>{digit}</button>
            )
          )}
          <button onClick={handleCalcs} value='0'>0</button>
          <button />
          <button onClick={handleResult} value='='> = </button>

        </div>
      </div>
    </div>
  )
}

export default App
