import { useEffect, useState } from "react";
import QuoteText from "../components/QuoteText";

const TextContainer = () => {

    const [quote, setQuote] = useState("");
    const [sentence, setSentence] = useState("");
    const [author, setAuthor] = useState("");

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
            <div className="quote-container">
                <h1>Type that quote!</h1>
                {quote ? <QuoteText sentence={sentence} author={author}/> : <p>Loading quote...</p>}
            </div>
        </div>
    )
}

export default TextContainer;