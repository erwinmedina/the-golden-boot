import NationalityFlag from "../Flags/Flags";
import moment from "moment";
import { MoonLoader } from "react-spinners";

export default function Top10GoalScorers({goalScorers}) {
    function getAge(string) {
        let value = string.split("-").join("");
        let age = moment(value, "YYYYMMDD").fromNow(true);
        return(age.slice(0,2));
    }

    return (
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
                    <table id="goalStandings" className="scoreStandings table table-dark table-striped table-hover table-sm ">
                        <thead>
                            <tr>
                                <th className="" scope="col"></th>
                                <th scope="col"></th>
                                <th className="tableCSS" scope="col">Age</th>
                                <th className="tableCSS" scope="col">Club</th>
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
                                    <td className="tableCSS nationalityPlayer">
                                        <NationalityFlag country={player.player.nationality}/> 
                                        <div className="playerName">
                                            <p>{player.player.name}</p>
                                        </div>
                                    </td>
                                    <td className="tableCSS">{getAge(player.player.dateOfBirth)}</td>
                                    <td className="tableCSS">{player.team.shortName}</td>
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
            <div className="legend container">
                <p>MP = Matches Played</p>
                <p>G = Goals</p>
                <p>P = Penalties Scored</p>
                <p>A = Assists</p>
                <p>G/MP = Goals / Matches Played (Ratio)</p>
            </div>
        </div>
    )
}