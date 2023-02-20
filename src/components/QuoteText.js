import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import './QuoteText.css'

const QuoteText = ({sentence, author}) => {

    // Accuracy counters
    const [errors, setErrors] = useState(0);
    const [lettersTyped, setLettersTyped] = useState(0);

    // Stop watch
    const [isStarted, setIsStarted] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        const checkRate = 100;
        if (isStarted) {
            interval = setInterval(() => {
                setTime((prev) => prev + checkRate);
            }, checkRate);
        } else if (!isStarted) {
            clearInterval(interval);
        }

    }, [isStarted])
    
    
    const quoteChars = sentence.split('');
    const words = sentence.split(' ');
    
    const [quoteSpan, setQuoteSpan] = useState(sentence.split('').map((char, index) => {
        return(
            <span key={index} className="default">{char}</span>
            )
        }));
    

    const processUserText = (event) => {
        let input = event.target.value;
        setIsStarted(true);
        console.log(isStarted);

        // Start the timer once the user starts typing
        // if (!isStarted) {
        // }

        // while (isStarted) {
        checkCorrect(input);
        // }
    };

    const checkCorrect = (input) => {
        const charArrayTyped = input.split('');
        const charArray = [...quoteSpan];
        
        // setLettersTyped(lettersTyped + 1);

        const charSpan = []
        charArray.forEach((char, index) => {
            
            const typeChar = charArrayTyped[index];
            const charValue = quoteChars[index];
            
            if (!typeChar) {
                charSpan[index] = <span key={index} className="default">{char.props.children}</span>
                

            } else if (typeChar === charValue) {
                charSpan[index] = <span key={index} className="correct">{char.props.children}</span>
                
            } else {
                // errors++;
                charSpan[index] = <span key={index} className="incorrect">{char.props.children}</span>
                
            }
        })

        setQuoteSpan(charSpan);
    };


    return(
        <>
            <div className="quoteBox">
                {sentence ? <p>"{quoteSpan}" - {author}</p> : <p>Loading quote...</p>}
            </div>
            <textarea placeholder="Click here to start" onChange={(event) => processUserText(event)}>
            </textarea>
            <span>Words per min: {time / words.length}</span>
        </>
    );
}

export default QuoteText;