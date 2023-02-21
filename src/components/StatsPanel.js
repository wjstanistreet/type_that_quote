const StatsPanel = ({sentence, time, errors, isStarted, games, setGames, setIsStarted, setTime, setErrors, resetTextArea}) => {

    const handleClick = () => {
        setGames(games + 1);
        resetTextArea();
        setIsStarted(null);
        setTime(0);
        setErrors(0);
    };

    return ( 
        <>
            <div className="stats-panel">
                {isStarted !== null ? <span className="time">Time: {time.toString().slice(0, -3)}.{time.toString().slice(-3)[0]}s</span> : <span className="time">Time</span>}
                {isStarted === false ? <span className="speed">Speed: {(sentence.split(" ").length / ((time / 1000) / 60)).toString().slice(0, -13)} WPM</span> : <span className="speed">Speed</span>}
                {isStarted === false ? <span className="accuracy">Accuracy: {((sentence.split("").length / (sentence.split("").length + errors)) * 100).toString().slice(0, 4)}%</span> : <span className="accuracy">Accuracy</span>}
                <button className="refetch" onClick={handleClick} >New Quote</button>
            </div> 
            
        </>
    );
}
 
export default StatsPanel;