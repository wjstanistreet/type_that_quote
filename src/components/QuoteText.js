import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import './QuoteText.css'

const QuoteText = ({sentence, author}) => {

    const [words, setWords] = useState("");
    const [quoteChars, setQuoteChars] = useState("");
    const [quoteSpan, setQuoteSpan] = useState("");

    useEffect(() => {
        if (sentence) {
        setWords(sentence.split(' '));
        setQuoteChars(sentence.split(''));
        setQuoteSpan(sentence.split('').map((char, index) => {
            return(
                <span key={index} className="default">{char}</span>
                )
            }));
        }
    }, [sentence])

    // Accuracy counters
    const [errors, setErrors] = useState(0);

    // Stop watch
    const [isStarted, setIsStarted] = useState(null);
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

        return () => clearInterval(interval);
    }, [isStarted])
    

    const processUserText = (event) => {
        let input = event.target.value;
        if (isStarted === null) {
            setIsStarted(true);
            
        } 
        
        if (isStarted) {
            checkCorrect(input);
        } else {
            // console.log(isStarted);
        }
    };

    const checkCorrect = (input) => {
        const charArrayTyped = input.split('');
        const typedWords = input.split(' ');
        const charArray = [...quoteSpan];

        const charSpan = []
        charArray.forEach((char, index) => {
            
            const typeChar = charArrayTyped[index];
            const charValue = quoteChars[index];
            
            if (!typeChar) {
                charSpan[index] = <span key={index} className="default">{char.props.children}</span>
                
            } else if (typeChar === charValue) {
                charSpan[index] = <span key={index} className="correct">{char.props.children}</span>
                
            } else {
                setErrors(errors + 1);
                charSpan[index] = <span key={index} className="incorrect">{char.props.children}</span>
                
            }
        })

        setQuoteSpan(charSpan);

        if (charArrayTyped.join("") === sentence) {
            setIsStarted(false);
        }
    };

    return(
        <>
            <div className="quote-box">
                {sentence ? <p>"{quoteSpan}" - {author}</p> : <p>Loading quote...</p>}
            </div>
            {sentence ? <textarea disabled={isStarted === false ? true : false} placeholder="The race starts when you start typing" onChange={(event) => processUserText(event)}>
            </textarea> : <></>}
            {isStarted !== null ? <span>Time: {time.toString().slice(0, -3)}.{time.toString().slice(-3)[0]}s</span> : <></>}
            {isStarted === false ? 
            <div>
                <span>Speed: {(words.length / ((time / 1000) / 60)).toString().slice(0, -13)} WPM</span>
            </div> 
            : <></>}
        </>
    );
}

export default QuoteText;