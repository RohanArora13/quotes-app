import { createContext, useState } from "react";


export const QuoteContext = createContext({
    setCurrentQuote: () => null,
    currentQuote:null,
});

const QuoteProvider = ({children}) => {

    const [currentQuote,setCurrentQuote] = useState(null)
    const value = {currentQuote,setCurrentQuote}

    return (<QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>)
}

export default QuoteProvider;






