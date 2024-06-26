import "./GetAllMatches.css"

import MatchesCard from "./MatchesCard";
import { useEffect } from "react"


export default function GetAllMatches({id, seasonID, teamArray, allMatches, matchday, setMatchday, filteredMatches, setFilteredMatches, numOfMatchesArray, filter}) {

    function handleMatchday(event) {
        setMatchday(event.target.value);
    }

    useEffect(function() {
        async function filterMatches() {
            setFilteredMatches([])
            if (allMatches.length) {
                for (let i = 0; i < allMatches[0].matches.length; i++) {
                    if (allMatches[0].matches[i].matchday == matchday) {
                        setFilteredMatches(filteredMatches => [...filteredMatches, allMatches[0].matches[i]])
                    }
                }}
        }
        filterMatches();
    }, [allMatches, id, matchday])

    return (
        <div className="container">
            <h1 className="seasonTitle">
                {allMatches.length >= 1 && allMatches[0].competition.name}
            </h1>
            <h2 className="seasonYears">
                Season {seasonID} - {seasonID+1}
            </h2>
            <div className="selectOption">
                <select className="form-select" onChange={handleMatchday} name="matchdays" id="matchdays">
                    {numOfMatchesArray.length && numOfMatchesArray.map(number =>
                        <option value={number}>Matchday {number}</option>
                    )}
                </select>
            </div>
            
            <div className="cardContainer">
                {filteredMatches.length && filteredMatches.map((match, index) => (
                    <MatchesCard index={index} teamArray={teamArray} match={match} matchday={matchday} filter={filter}/>
                ))}
            </div>
        </div>
    )
}