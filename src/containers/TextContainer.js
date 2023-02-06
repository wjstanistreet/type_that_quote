import { useEffect, useState } from "react";
import QuoteText from "../components/QuoteText";

const TextContainer = () => {

    const [quote, setQuote] = useState("");
    // const [sentence, setSentence] = useState("");
    // const [author, setAuthor] = useState("");

    useEffect(() => {
        const fetchQuote = async () => {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            setQuote(data);
            console.log(quote)
        }
        fetchQuote();
    }, []);

    // const setValues = async () => {
    //     const quoteObj = await quote;

    // }
    
    const sentence = "The greatest glory in living lies not in never falling, but in rising every time we fall.";
    const author = "Nelson Mandela";

    return(
        <div>
            <h1>Type that quote!</h1>
            
            {quote ? <QuoteText sentence={sentence} author={author}/> : <p>Loading quote...</p>}

        </div>
    )
}

export default TextContainer;