import { useState } from "react";
import './QuoteText.css'

const QuoteText = ({sentence, author}) => {

    // Accuracy counters
    let errors = 0;
    let lettersTyped = 0;
    
    const quoteChars = sentence.split('');
    
    const [quoteSpan, setQuoteSpan] = useState(sentence.split('').map((char, index) => {
        return(
            <span key={index} className="default">{char}</span>
            )
        }));
    

    const processUserText = (event) => {
        let input = event.target.value;
        // Start the timer once the user starts typing
        checkCorrect(input);
    };

    const checkCorrect = (input) => {
        const charArrayTyped = input.split('');
        const charArray = [...quoteSpan];
        
        lettersTyped++;

        const charSpan = []
        charArray.forEach((char, index) => {
            
            const typeChar = charArrayTyped[index];
            const charValue = quoteChars[index];
            
            if (!typeChar) {
                charSpan[index] = <span key={index} className="default">{char.props.children}</span>
                

            } else if (typeChar === charValue) {
                charSpan[index] = <span key={index} className="correct">{char.props.children}</span>
                
            } else {
                errors++;
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
        </>
    );
}

export default QuoteText;