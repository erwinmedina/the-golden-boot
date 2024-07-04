import "./GetStandings.css";
import moment from "moment";
import { useEffect, useState} from "react";
import { MoonLoader } from "react-spinners";

export default function GetStandings({standings, goalScorers, comp}) {

    const [filterComp, setFilterComp] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 380);
    
    useEffect(() => {
        async function filterCompetition() {
            const tempComp = comp;
            setFilterComp(tempComp?.seasons?.filter(c => c.winner != null));
        } filterCompetition();
    }, [comp]);

    function AmericanDate_Fix(string) {
        let arrayOfString = string.split("-")
        var revisedString = arrayOfString[1] + "/" + arrayOfString[2] + "/" + arrayOfString[0];
        return revisedString;
    }

    function getAge(string) {
        let value = string.split("-").join("");
        let age = moment(value, "YYYYMMDD").fromNow(true);
        return(age.slice(0,2));
    }
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);

    return (
        <div className="container homePageStandings">
            <div id="goalScorersAndWinners">
                <div className="homePageStandingsContainer goalScorerStats">
                    <h2>Top 10 Goalscorers</h2>
                    <h3>
                        {goalScorers?.competition?.name}
                    </h3>
                    <h3>
                        {goalScorers?.season?.startDate.slice(0,5)}  
                        {goalScorers?.season?.endDate.slice(0,4)} Season
                    </h3>
                    <hr />
                    {goalScorers?.scorers?.length ? 
                        <div className="tableContainer table-responsive">
                            <table id="goalStandings" className="scoreStandings table table-striped table-hover table-sm ">
                                <thead>
                                    <tr>
                                        <th className="tableCSS" scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th className="tableCSS" scope="col">Age</th>
                                        <th scope="col">Nationality</th>
                                        <th scope="col">Club</th>
                                        <th className="tableCSS" scope="col">MP</th>
                                        <th className="tableCSS" scope="col">G</th>
                                        <th className="tableCSS" scope="col">P</th>
                                        <th className="tableCSS" scope="col">A</th>
                                        <th className="tableCSS" scope="col">G / MP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {goalScorers?.scorers.length && goalScorers?.scorers.map((player, index) => 
                                        <tr className="tableRow">
                                            <td className="tableCSS">{index + 1}</td>
                                            <td className="">{player.player.name}</td>
                                            <td className="tableCSS">{getAge(player.player.dateOfBirth)}</td>
                                            <td className="">{player.player.nationality}</td>
                                            <td className="">{player.team.shortName}</td>
                                            <td className="tableCSS">{player.playedMatches}</td>
                                            <td className="tableCSS">{player.goals}</td>
                                            <td className="tableCSS">{player.penalties ?? 0}</td>
                                            <td className="tableCSS">{player.assists ?? 0}</td>
                                            <td className="tableCSS">{(player.goals / player.playedMatches).toFixed(2) ?? 0}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className="emptyScorers">
                            <MoonLoader color="#000000" />
                        </div>
                    }
                </div>
                <div className="homePageStandingsContainer previousWinners">
                    <h2>Previous League Winners</h2>
                    <h3>
                        {goalScorers?.competition?.name}
                    </h3>
                    <h3>
                        Multiple Seasons
                    </h3>
                    <hr />
                    {filterComp?.length ?
                        <div className="previousWinnersTable tableContainer table-responsive">
                            <table className="table table-hover table-striped table-sm">
                                <thead>
                                    <tr className="previousWinnersHeaderRow">
                                        <th className="firstHeaderRow tableCSS" scope="col">Start Date</th>
                                        <th className="tableCSS" scope="col">End Date</th>
                                        <th className="lastHeaderRow headerWinner tableCSS" scope="col">👑 Winner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterComp?.map((comp, index) =>
                                        <tr className="tableRow">
                                            <td className="tableCSS">{AmericanDate_Fix(comp.startDate)}</td>
                                            <td className="tableCSS">{AmericanDate_Fix(comp.endDate)}</td>
                                            <td className="winnerTableValue tableCSS">
                                                <div className="previousWinnerCrestDiv">
                                                    <img className="previousWinnerCrest" src={comp.winner.crest} alt="" />
                                                </div>
                                                <div className="previousWinnerTextDiv">
                                                    <p className="previousWinnerText">{comp.winner.shortName}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className="emptyScorers">
                            <MoonLoader color="#000000" />
                        </div>
                    }
                </div>
            </div>
            <div className="homePageStandingsContainer tableStats">
                <h2>{Object.keys(standings)?.length && standings?.competition.name} Standings</h2>
                <h3>
                    {Object.keys(standings)?.length && standings?.season?.startDate?.slice(0,5)}  
                    {Object.keys(standings)?.length && standings?.season?.endDate?.slice(0,4)} Season
                </h3>
                <hr />
                <div className="tableContainer table-responsive">
                    <table id="tableStandings" className="table table-hover table-striped table-sm ">
                        <thead>
                            <tr>
                                <th className="tableCSS" scope="col">#</th>
                                <th colSpan="2" scope="col" className="tableCSS teamName">Club</th>
                                <th className="tableCSS" scope="col">MP</th>
                                <th className="tableCSS" scope="col">W</th>
                                <th className="tableCSS" scope="col">D</th>
                                <th className="tableCSS" scope="col">L</th>
                                <th className="tableCSS" scope="col">GF</th>
                                <th className="tableCSS" scope="col">GA</th>
                                <th className="tableCSS" scope="col">GD</th>
                                <th className="tableCSS" scope="col">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(standings).length && standings.standings[0].table.map(team => 
                                <tr className="tableRow">
                                    <td className="tableCSS">{team.position}</td>
                                    <td className="teamImg"><img alt="stuff" src={team.team.crest}/></td>
                                    <td className="tableCSS teamName">{isSmallScreen ? team.team.shortName : team.team.name}</td>
                                    <td className="tableCSS teamStats">{team.playedGames}</td>
                                    <td className="tableCSS teamStats">{team.won}</td>
                                    <td className="tableCSS teamStats">{team.lost}</td>
                                    <td className="tableCSS teamStats">{team.draw}</td>
                                    <td className="tableCSS teamStats">{team.goalsFor}</td>
                                    <td className="tableCSS teamStats">{team.goalsAgainst}</td>
                                    <td className="tableCSS teamStats">{team.goalDifference}</td>
                                    <td className="tableCSS teamStats">{team.points}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  );
}