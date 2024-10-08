import { useEffect } from "react"
import "./GetAllMatches.css"
import "./GetTeamMatches.css"

export default function MatchesHeader({id, seasonID, teamArray, allMatches, filteredMatches, setFilteredMatches, team, setTeam}) {

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
            <h1 className="seasonTitle">
                {allMatches.length >= 1 && allMatches[0].competition.name}
            </h1>
            <h2 className="seasonYears">
                Season {seasonID} - {seasonID+1}
            </h2>
            <div className="selectOption">
                <select className="form-select" onChange={handleTeam} name="team" id="team">
                    {teamArray && teamArray.map(team =>
                        <option value={team.name}>{team.shortName}</option>
                    )}
                </select>
            </div>
        </div>
    )
}