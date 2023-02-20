import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import './QuoteText.css'

const QuoteText = ({sentence, author}) => {

    // Accuracy counters
    const [errors, setErrors] = useState(0);
    const [words, setWords] = useState(sentence.split(' '));
    const [wordCount, setWordCount] = useState(0);

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
    const [quoteSpan, setQuoteSpan] = useState(sentence.split('').map((char, index) => {
        return(
            <span key={index} className="default">{char}</span>
            )
        }));
    

    const processUserText = (event) => {
        let input = event.target.value;
        if (isStarted === false) {
            setIsStarted(true);
            console.log(isStarted);
            // console.log(isStarted);
        } 
        
        // if (isStarted) {
        checkCorrect(input);
        // }
        
    };

    const checkCorrect = (input) => {
        const charArrayTyped = input.split('');
        const typedWords = input.split(' ');
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
                charSpan[index] = <span key={index} className="incorrect">{char.props.children}</span>
                
            }
        })

        setQuoteSpan(charSpan);

        if (charArrayTyped.length === quoteChars.length) {
            setIsStarted(false);
        }
    };

    const startCountdown = () => {

    };

    return(
        <>
            <div className="quoteBox">
                {sentence ? <p>"{quoteSpan}" - {author}</p> : <p>Loading quote...</p>}
            </div>
            <p>{}</p>
            <textarea placeholder="Click here to start" onClick={startCountdown} onChange={!isStarted ? (event) => processUserText(event) : () => {}}>
            </textarea>
            <span>Time: {time.toString().slice(0, -3)}.{time.toString().slice(-3)[0]} ms</span>
        </>
    );
}

export default QuoteText;