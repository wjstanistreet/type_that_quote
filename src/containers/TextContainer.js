import { useEffect, useState } from "react";
import QuoteText from "../components/QuoteText";
import StatsPanel from "../components/StatsPanel";

const TextContainer = () => {

    const [quote, setQuote] = useState("");
    const [sentence, setSentence] = useState("");
    const [author, setAuthor] = useState("");

    const [isStarted, setIsStarted] = useState(null);
    const [time, setTime] = useState(0);
    const [errors, setErrors] = useState(0);
    const [games, setGames] = useState(0);

    const [textAreaValue, setTextAreaValue] = useState(null);

    useEffect(() => {
        fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then((data) => {setQuote(data)})
    }, [games]);

    useEffect(() => {
        if (quote) {
            setSentence(quote.content);
            setAuthor(quote.author);
        }
    }, [quote])

    const resetTextArea = () => {
        setTextAreaValue("");
    };

    return(
        <div className="page-container">
            <h1>Type that Quote!</h1>
            <div className="quote-container">
                {quote ? <QuoteText sentence={sentence} author={author} 
                                    setTime={setTime} isStarted={isStarted} 
                                    setIsStarted={setIsStarted} errors={errors} 
                                    setErrors={setErrors} games={games} textAreaValue={textAreaValue}
                                    setTextAreaValue={setTextAreaValue}/> : <p>Loading quote...</p>}
            </div>
            {sentence ? <div className="quote-mark"></div> : <></>}
            <StatsPanel sentence={sentence} isStarted={isStarted} 
                        time={time} errors={errors} games={games} 
                        setGames={setGames} setIsStarted={setIsStarted} 
                        setTime={setTime} setErrors={setErrors}
                        resetTextArea={resetTextArea}/>
        </div>
    )
}

export default TextContainer;