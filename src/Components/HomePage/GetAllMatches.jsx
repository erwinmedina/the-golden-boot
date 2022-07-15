import * as footballService from "../../Utilities/football-service"
import "./GetAllMatches.css"

import MatchesCard from "./MatchesCard";
import { useEffect } from "react"


export default function GetAllMatches({id, setSeasonID, teamArray, allMatches, matchday, setMatchday, filteredMatches, setFilteredMatches, numOfMatchesArray, filter}) {

    function handleMatchday(event) {
        setMatchday(event.target.value);
    }
    function handleSeason(event) {
        console.log(parseInt(event.target.value), typeof(event.target.value));
        setSeasonID(parseInt(event.target.value));
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
            <div className="selectOption">
                {/* Determines the number of matchdays available for a dropdown  */}
                <select className="form-select" onChange={handleMatchday} name="matchdays" id="matchdays">
                    {numOfMatchesArray.length && numOfMatchesArray.map(number =>
                        <option value={number}>Matchday {number}</option>
                    )}
                </select>
                {/* <select className="form-select" onChange={handleSeason} name="season" id="season">
                    <option value="2022">2022-2023</option>
                    <option value="2021">2021-2022</option>
                    <option value="2020">2020-2021</option>
                </select> */}
            </div>
            <div className="cardContainer">
                {filteredMatches.length && filteredMatches.map((match, index) => (
                    <MatchesCard index={index} teamArray={teamArray} match={match} matchday={matchday} filter={filter}/>
                ))}
            </div>
        </div>
    )
}