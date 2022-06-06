import logo from './logo.svg';
import './App.css';
import { useContext, useEffect, useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { Quotes } from './quote/Quotes';
import  { QuoteContext }  from './quotes.context';

const all_quotes = []
var currentQuoteLen = 100

const fetch_image = async (name) => {
  var imageLink=''
  await fetch('https://rihit555.pythonanywhere.com/?input='+name)
      .then((res) => res.json())
      .then((json) => {
        // console.log('json.link'+json.link)
        imageLink={imageLink:json.link}
      });
  return imageLink;
}

const fetch_quote = async () => {

  //console.log('fetch_quote')

  const response = await fetch('https://movie-quote-api.herokuapp.com/v1/quote/')
    .then((res) => res.json())
    .then(async (json) => {
      var quote = json
      const name = json.role
      //console.log('name '+name)
      var imageLink=await fetch_image(name)
      //console.log('imageLink '+imageLink)
      quote = Object.assign(quote,imageLink)
      //console.log(quote)
      all_quotes.push(quote)
      //console.log(all_quotes)
    })

}


const delay = ms => new Promise(res => setTimeout(res, ms));
const LoopCall = async () => {

  var i = 0
  while (true) {
    fetch_quote()
    await delay(5000);
    i++;
  }

}

const SetQuote = (setCurrentQuote) => {

  const quoteObject = all_quotes[0]
  //console.log(all_quotes[0])

  setCurrentQuote(quoteObject)
  all_quotes.shift()

}

const progressBarTimer = async (setTimer,change,setChange,setCurrentQuote) => {
  
  var progressTime = 0.11

  switch(true){

    case (currentQuoteLen <= 50):
      progressTime = 0.15
      break

    case (currentQuoteLen <= 100):
      progressTime = 0.13
      break

    case (currentQuoteLen <= 150):
      progressTime = 0.12
      break

    case (currentQuoteLen <= 200):
        progressTime = 0.11
        break
    
    case (currentQuoteLen > 200):
        progressTime = 0.10
        break
    
    default:
      console.log("default")
      progressTime = 0.11
      break

  }

  console.log("currentQuoteLen "+currentQuoteLen)

  var time = 100.0;
  while (time > 0) {
    setTimer(time)
    console.log("progressTime"+progressTime)
    time=time-progressTime;
    //console.log(time)
    await delay(10)
  }
  console.log('change')

  
  const nextQuote = all_quotes[0]
  const quoteLen = nextQuote ? nextQuote.quote.length : 200
  currentQuoteLen = quoteLen

  SetQuote(setCurrentQuote)

  // const quoteObject = all_quotes[0]
  // //console.log(all_quotes[0])

  // setCurrentQuote(quoteObject)
  // all_quotes.shift()
  
  setTimer(100)
  //await delay(1000)
  setChange(!change)


}


function App() {
  const [timer,setTimer ]= useState(100)
  const [change,setChange] = useState(false)

  const {setCurrentQuote} = useContext(QuoteContext)
  //setCurrentQuote({quote:'hello rohan'})

  useEffect(async () => { 
    await fetch_quote()
    SetQuote(setCurrentQuote)
  },[])
  useEffect(() => { LoopCall() },[])
  useEffect(() => {
    progressBarTimer(setTimer,change,setChange,setCurrentQuote)
  },[change])

  const {currentQuote} = useContext(QuoteContext)

  
  return (
    <div className="App">
      <ProgressBar 
      bgColor='#4b5566'
      baseBgColor='#282c34'
      transitionDuration='10'
      height='10px'
      completed={timer} customLabel=" " />

      <header className="App-header">
        {currentQuote ? <Quotes key={currentQuote.quote} quoteObject={currentQuote}></Quotes> : <p>Loading...</p>}
        
      </header>
    </div>
  );
}

export default App;
