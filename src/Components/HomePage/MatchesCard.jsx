import { useState, useEffect } from "react"
import ExpandMatchCard from "./ExpandMatchCard";

import StadiumMap from "./StadiumMap";
import "./MatchesCard.css"

export default function MatchesCard({index, teamArray, match, matchday, filter}) {

    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(function() {
        async function getDate() {
            const dateInfo = new Date(match.utcDate);
            const dateArray = dateInfo.toLocaleString().split(",")
            setDate(dateInfo.toDateString());
            setTime(dateArray[1]);
        } getDate();
    }, [match, filter])

    let dataToggleTag = "#navbarToggleExternalContent" + index;
    let dataToggleID = "navbarToggleExternalContent" + index;

    return (
        <div className="">
            <div className={`navbar-toggler ${matchday !== match.matchday ? '' : filter !== 'team' ? '' : 'currentMatchday'} matchesCardContainer`} data-toggle="collapse" data-target={dataToggleTag}>
                <div className="topMatchCard">
                    {(matchday === match.matchday) && filter === "team" ? 
                        <span className="matchday matchdayMatch">Current Matchday</span>
                        :
                        <span className="matchday">Matchday {match.matchday}</span>
                    }
                    <span className={`${(matchday === match.matchday) && filter==="team"  ? "matchdayMatch" : ""} matchday`}>{date} - {time}</span>
                </div>

                <div className="botMatchCard ">
                    <div className="cardContainerHome">
                        {teamArray.length && teamArray.map(teamLogo => {
                            if (teamLogo.name === match.homeTeam.name) {
                                return(
                                    <img className="teamLogo teamLogoHome" src={teamLogo.crest} alt="" />    
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
                                
                                {match.score.fullTime.home == null ? " : " : <span>{match.score.fullTime.home} : {match.score.fullTime.away} </span>}
                                {match.score.halfTime.home == null ? "" : <span className="halfTime"> Half: {match.score.halfTime.home} : {match.score.halfTime.away}</span>}
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
                                    <img className="teamLogo teamLogoAway" src={teamLogo.crest} alt="" />    
                                )
                            }
                        })}
                    </div>

                </div>

            </div>


            <div className="expandable collapse" id={dataToggleID}>
                <ExpandMatchCard index={index} match={match} teamArray={teamArray} filter={filter}/>
            </div>
        </div>
    )
}