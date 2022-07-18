import { useEffect } from "react"
import MatchesCard from "./MatchesCard";
import "./GetAllMatches.css"
import "./GetTeamMatches.css"


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

    function handleHomeGoalsSort() {
        if (filteredMatches.length) {
            for (let i = 0; i < filteredMatches.length; i++) {
                console.log(filteredMatches[i].score.fullTime.homeTeam)
                filteredMatches[i].sort((a,b) => a.score.fullTime.homeTeam > b.score.fullTime.homeTeam ? 1:-1);
            }
        }
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
            <div>
                <h3>
                    {filteredMatches[0].season.startDate.slice(0,5)}  
                    {filteredMatches[0].season.endDate.slice(0,4)} Season
                </h3>
            </div>
            {/* <div className="buttonCategory">
                <button className="btn btn-primary">Matchday</button>
                <button onClick={handleHomeGoalsSort} className="btn btn-primary">Home Goals</button>
                <button className="btn btn-primary">Away Goals</button>
                <button className="btn btn-primary">Most Wins - Home</button>
                <button className="btn btn-primary">Most Wins - Away</button>
                <button className="btn btn-primary">Most Losses - Home</button>
                <button className="btn btn-primary">Most Losses - Away</button>
            </div> */}
            <div className="cardContainer">
                {filteredMatches.length && filteredMatches.map((match, index) =>
                    <MatchesCard index={index} teamArray={teamArray} match={match} matchday={matchday} filter={filter}/>
                )}
            </div>
        </div>
    )
}