const StatsPanel = ({sentence, time, isStarted}) => {
    return ( 
        <>
            <div className="stats-panel">
                {isStarted !== null ? <span className="time">Time: {time.toString().slice(0, -3)}.{time.toString().slice(-3)[0]}s</span> : <span className="time">Time: s</span>}
                {/* {isStarted !== null ? <span>Time: {time.toString().slice(0, -3)}.{time.toString().slice(-3)[0]}s</span> : <></>} */}
                {isStarted === false ? <span className="speed">Speed: {(sentence.split(" ").length / ((time / 1000) / 60)).toString().slice(0, -13)} WPM</span> : <span className="speed">Speed: WPM</span>}
            </div> 
            
        </>
    );
}
 
export default StatsPanel;