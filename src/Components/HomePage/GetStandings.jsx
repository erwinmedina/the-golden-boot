import "./GetStandings.css";
import moment from "moment";

export default function GetStandings({id, standings, setStandings, setMatchday, goalScorers}) {
    
    function getAge(string) {
        let value = string.split("-").join("");
        let age = moment(value, "YYYYMMDD").fromNow(true);
        return(age.slice(0,2));
    }

    return (
        <div className="container homePageStandings">
            <div className="homePageStandingsContainer">
                <h2>Top 10 Goalscorers</h2>
                <h3>
                    {goalScorers[0].season.startDate.slice(0,5)}  
                    {goalScorers[0].season.endDate.slice(0,4)} Season
                </h3>
                {goalScorers[0].scorers.length ? 
                    <div className="tableContainer table-responsive">
                        <table id="tableStandings" className="scoreStandings table table-hover table-sm ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Club</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Goals</th>
                                </tr>
                            </thead>
                            <tbody>
                                {goalScorers[0].scorers.length && goalScorers[0].scorers.map((player, index) => 
                                    <tr className="tableRow">
                                        <td>{index + 1}</td>
                                        <td className="">{player.player.name}</td>
                                        <td className="">{getAge(player.player.dateOfBirth)}</td>
                                        <td className="">{player.player.nationality}</td>
                                        <td className="">{player.team.name}</td>
                                        <td className="">{player.player.position}</td>
                                        <td className="">{player.numberOfGoals}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="emptyScorers">
                        <p>Looks like there's nothing to report yet!</p>
                    </div>
                }
            </div>
            <div className="homePageStandingsContainer">
                <h2>{Object.keys(standings).length && standings.competition.name} Standings</h2>
                <h3>
                    {Object.keys(standings).length && standings.season.startDate.slice(0,5)}  
                    {Object.keys(standings).length && standings.season.endDate.slice(0,4)} Season
                </h3>
                <div className="tableContainer table-responsive">
                    <table id="tableStandings" className="table table-hover table-sm ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th colSpan="2" scope="col" className="teamName">Club</th>
                                <th scope="col">MP</th>
                                <th scope="col">W</th>
                                <th scope="col">D</th>
                                <th scope="col">L</th>
                                <th scope="col">GF</th>
                                <th scope="col">GA</th>
                                <th scope="col">GD</th>
                                <th scope="col">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(standings).length && standings.standings[0].table.map(team => 
                                <tr className="tableRow">
                                    <td>{team.position}</td>
                                    <td className="teamImg"><img alt="stuff" src={team.team.crestUrl}/></td>
                                    <td className="teamName">{team.team.name}</td>
                                    <td className="teamStats">{team.playedGames}</td>
                                    <td className="teamStats">{team.won}</td>
                                    <td className="teamStats">{team.lost}</td>
                                    <td className="teamStats">{team.draw}</td>
                                    <td className="teamStats">{team.goalsFor}</td>
                                    <td className="teamStats">{team.goalsAgainst}</td>
                                    <td className="teamStats">{team.goalDifference}</td>
                                    <td className="teamStats">{team.points}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  );
}