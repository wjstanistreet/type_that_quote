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

    useEffect(() => {
        fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then((data) => {setQuote(data)})
    }, []);

    useEffect(() => {
        if (quote) {
            setSentence(quote.content);
            setAuthor(quote.author);
        }
    }, [quote])


    return(
        <div className="page-container">
            <h1>Type that Quote!</h1>
            <div className="quote-container">
                {quote ? <QuoteText sentence={sentence} author={author} setTime={setTime} isStarted={isStarted} setIsStarted={setIsStarted} errors={errors} setErrors={setErrors}/> : <p>Loading quote...</p>}
            </div>
            {sentence ? <div className="quote-mark"></div> : <></>}
            <StatsPanel sentence={sentence} isStarted={isStarted} time={time} errors={errors}/>
        </div>
    )
}

export default TextContainer;