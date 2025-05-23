import LeagueTitleAndYear from "../MatchesAndTeamsPages/LeagueTitleAndYear";
import "./MatchdayHeader.css"

export default function MatchdayHeader({allMatches, seasonID, numOfMatchesArray, matchday, setMatchday}) {
    function handleMatchday(event) {
        setMatchday(event.target.value);
    }
    
    return (
        <div className="matchdayHeader">
            <div className="matchdayHeader_title">
                <LeagueTitleAndYear allMatches={allMatches} seasonID={seasonID}/>
            </div>
            <div className="matchdaySelectOption">
                <p>Select a matchday...</p>
                <select className="form-select" onChange={handleMatchday} name="matchdays" id="matchdays" value={matchday}>
                    {numOfMatchesArray.length && numOfMatchesArray.map(number =>
                        <option value={number}>Matchday {number}</option>
                    )}
                </select>
            </div>  
        </div>
    )
}