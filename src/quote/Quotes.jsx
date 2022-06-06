
import './quote.css'

export const Quotes = ({quoteObject}) => {

    if(quoteObject==null){
        quoteObject={}
    }
    const {quote,role,imageLink,show} = quoteObject
    

    return(
        // <div key={quote} className="quote-parent">
        <div className="quote-parent">
            <p className="quote-text">{`"${quote}"`}</p>
            <p className="quote-role">{role}</p>
            <p className="quote-show">{show}</p>
            {/* <div className="quote-img" 
            style={{backgroundImage: `url(${imageLink})`}}>
            </div> */}
            <img className="quote-img" src={imageLink}></img>
        </div>
    )
}