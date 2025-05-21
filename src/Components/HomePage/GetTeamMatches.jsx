import { useEffect } from "react"
import MatchesCard from "./MatchesCard";
import "./GetAllMatches.css"
import "./GetTeamMatches.css"
import MatchesHeader from "./MatchesHeader";

export default function GetTeamMatches({teamArray, filteredMatches, matchday, filter}) {
    
    return (
        <div className="teamMatchesContainer container">
            <div className="cardContainer">
                {filteredMatches.length && filteredMatches.map((match, index) =>
                    <MatchesCard index={index} teamArray={teamArray} match={match} matchday={matchday} filter={filter}/>
                )}
            </div>
        </div>
    )
}