import { useState } from "react"
import ExpandMatchCard from "./ExpandMatchCard";
import StadiumMap from "./StadiumMap";
import "./MatchesCard.css"

export default function MatchesCard({index, teamArray, match, matchday, filter}) {

    let dataToggleTag = "#navbarToggleExternalContent" + index;
    let dataToggleID = "navbarToggleExternalContent" + index;

    return (
        <div className="">
            <div className={`navbar-toggler ${matchday !== match.matchday ? '' : filter !== 'team' ? '' : 'currentMatchday'} matchesCardContainer`} data-toggle="collapse" data-target={dataToggleTag}>
            
                <div className="cardContainerHome">
                    {teamArray.length && teamArray.map(teamLogo => {
                        if (teamLogo.name === match.homeTeam.name) {
                            return(
                                <img className="teamLogo teamLogoHome" src={teamLogo.crestUrl} alt="" />    
                            )
                        }
                    })}

                    {teamArray.length && teamArray.map(teamName => {
                        if (teamName.name === match.homeTeam.name) {
                            return (
                                <div className="matchCardName">
                                    {teamName.shortName}
                                </div>
                            )
                        }
                    })}
                </div>
                
                <div className="cardContainerCenter">
                    <div className="score">
                        <p className="fullTime">
                            <span className="matchday">Matchday {match.matchday}</span>
                            {match.score.fullTime.homeTeam == null ? "" : <span>{match.score.fullTime.homeTeam} : {match.score.fullTime.awayTeam} </span>}
                            {match.score.halfTime.homeTeam == null ? "" : <span className="halfTime"> Half: {match.score.halfTime.homeTeam} : {match.score.halfTime.awayTeam}</span>}
                        </p>
                    </div>
                </div>
                
                <div className="cardContainerAway">
                    {teamArray.length && teamArray.map(teamName => {
                        if (teamName.name === match.awayTeam.name) {
                            return (
                                <div className="matchCardName">
                                    {teamName.shortName}
                                </div>
                            )
                        }
                    })}

                    {teamArray.length && teamArray.map(teamLogo => {
                        if (teamLogo.name === match.awayTeam.name) {
                            return(
                                <img className="teamLogo teamLogoAway" src={teamLogo.crestUrl} alt="" />    
                            )
                        }
                    })}
                </div>

            </div>


            <div className="expandable collapse" id={dataToggleID}>
                <ExpandMatchCard index={index} match={match} teamArray={teamArray} filter={filter}/>
            </div>
        </div>
    )
}