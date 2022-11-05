import React , {useEffect , useState}from 'react'
import CurrencyOptions from './components/CurrencyOptions'
import './App.css'
function App() {
  const [currencyOptions , setCurrencyOptions] = useState([])
  const [fromAmount , setFromAmount] = useState(0)
  const [toAmount , setToAmount] = useState(0)
  const [fromCurrency , setFromCurrency] = useState('')
  const [toCurrency , setToCurrency] = useState('')
  const [currencyNames , setCurrencyNames] = useState({})
  useEffect(() =>{
      fetch(`https://api.frankfurter.app/currencies`).then(res => res.json()).then(data => {
        setCurrencyOptions(Object.keys(data))
        setFromCurrency(Object.keys(data)[0])
        setToCurrency(Object.keys(data)[0])
        setCurrencyNames(data)
      })
  },[])
  useEffect(() => {
    if(parseInt(fromAmount) === 0){
      setToAmount(0)
    } else if(fromAmount === ''){
      setToAmount('')
    } else if(fromCurrency === toCurrency){
      setToAmount(fromAmount)
    } else {
      fetch(`https://api.frankfurter.app/latest?amount=${fromAmount}&from=${fromCurrency}&to=${toCurrency}`).then(res => res.json()).then(data => setToAmount(Object.values(data.rates)[0]))
    }
  },[fromCurrency , toCurrency , fromAmount , toAmount])
  return (
    <div className = "app">
      <h1>Currency Converter</h1>
      <div className = "container">
        <div className = "item1">
          <div className = "opt-1">
            <h2>From Currency : </h2>
            <CurrencyOptions prop = "From currency" fromCurrency = {fromCurrency} currencyOptions = {currencyOptions} updateCurrency = {e => setFromCurrency(e.target.value)}/>
          </div>
          <div className = "opt-2">
            <h2>To Currency : </h2>
            <CurrencyOptions prop = "To currency" toCurrency = {toCurrency} currencyOptions = {currencyOptions} updateCurrency = {e => setToCurrency(e.target.value)}/>
          </div>
        </div>
        <div className = "item2">
          <h2>Enter Amount in {currencyNames[`${fromCurrency}`]} : </h2>
          <h2>Output in {currencyNames[`${toCurrency}`]} : </h2>
        </div>
        <div className = "item3">
          <input type = "number" autoComplete = "off" value = {fromAmount} className = "input" onChange = {e => setFromAmount(e.target.value)}/>
          <h3>=</h3>
          <input className = "output" disabled value = {toAmount} type="text"/>
        </div>
        <div className = "item4">
          <h2>{fromAmount} {fromCurrency} = {toAmount} {toCurrency}</h2>
        </div>
      </div>
    </div>
  )
}

export default App
