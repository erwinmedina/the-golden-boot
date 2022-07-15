import { useEffect } from "react"
import MatchesCard from "./MatchesCard";
import "./GetAllMatches.css"


export default function GetTeamMatches({id, teamArray, allMatches, setAllMatches, filteredMatches, setFilteredMatches, team, setTeam, matchday, filter}) {
    
    useEffect(function() {
        async function filterMatchTeams() {
            setFilteredMatches([]);
            if (allMatches.length) {
                for (let i = 0; i < allMatches[0].matches.length; i++) {
                    if (allMatches[0].matches[i].homeTeam.name === team || allMatches[0].matches[i].awayTeam.name === team) {
                        setFilteredMatches(filteredMatches => [...filteredMatches, allMatches[0].matches[i]])
                    }
                }
            }
        } filterMatchTeams();
    }, [allMatches, id, team])

    function handleTeam(event) {
        setTeam(event.target.value)
    }
    
    return (
        <div className="container">
            <div className="selectOption">
                <select className="form-select" onChange={handleTeam} name="team" id="team">
                    {teamArray && teamArray.map(team =>
                        <option value={team.name}>{team.shortName}</option>
                    )}
                </select>
            </div>
            <div className="cardContainer">
                {filteredMatches.length && filteredMatches.map((match, index) =>
                    <MatchesCard index={index} teamArray={teamArray} match={match} matchday={matchday} filter={filter}/>
                )}
            </div>
        </div>
    )
}