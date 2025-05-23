import "./GetAllMatches.css"
import MatchesCard from "./MatchesCard";
import { useEffect } from "react"
import LeagueTitleAndYear from "../MatchesAndTeamsPages/LeagueTitleAndYear";
import GetTeamMatches from "../../Components/HomePage/GetTeamMatches";

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
        <div className="getAllMatches container">
            <div className="matchesHeader_title">
                <LeagueTitleAndYear allMatches={allMatches} seasonID={seasonID}/>
            </div>
            <div className="selectOption">
                <select className="form-select" onChange={handleMatchday} name="matchdays" id="matchdays" value={matchday}>
                    {numOfMatchesArray.length && numOfMatchesArray.map(number =>
                        <option value={number}>Matchday {number}</option>
                    )}
                </select>
            </div>
            <GetTeamMatches
                teamArray={teamArray}
                filteredMatches={filteredMatches}
                matchday={matchday}
                filter={'team'}
            />
        </div>
    )
}