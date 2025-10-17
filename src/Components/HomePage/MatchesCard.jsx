import { useState, useEffect } from "react"
import ExpandMatchCard from "./ExpandMatchCard";

import StadiumMap from "./StadiumMap";
import "./MatchesCard.css"

export default function MatchesCard({index, teamArray, match, matchday, filter}) {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [shortDate, setShortDate] = useState("");

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const dateInfo = new Date(match.utcDate);
        const longDate = dateInfo.toDateString();
        const shortDateFormat = dateInfo.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric', year:'2-digit'})
        const fullTime = dateInfo.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})

        setDate(longDate);
        setShortDate(shortDateFormat);
        setTime(fullTime);
    }, [match, filter])

    let dataToggleTag = "#navbarToggleExternalContent" + index;
    let dataToggleID = "navbarToggleExternalContent" + index;

    return (
        <div id={index+1}>
            <div className={`navbar-toggler ${matchday !== match.matchday ? '' : filter !== 'team' ? '' : 'currentMatchday'} matchesCardContainer`} data-toggle="collapse" data-target={dataToggleTag}>
                <div className="topMatchCard">
                    {(matchday === match.matchday) && filter === "team" ? 
                        <span className="matchday matchdayMatch">
                            Current Matchday
                        </span>
                        :
                        <span className="matchday">
                            {isSmallScreen ? `MD ${match.matchday}` : `Matchday ${match.matchday}`}
                        </span>
                    }
                    <span className={`${(matchday === match.matchday) && filter==="team"  ? "matchdayMatch" : ""} matchday`}>
                        {isSmallScreen ? `${shortDate} - ${time}` : `${date} - ${time}`}
                    </span>
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
                            </p>
                                {match.score.halfTime.home == null ? "" : <span className="halfTime"> Half: {match.score.halfTime.home} : {match.score.halfTime.away}</span>}
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