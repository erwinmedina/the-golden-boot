import "./GetStandings.css";

export default function GetStandings({id, standings, setStandings, setMatchday}) {
    
    return (
        <div className="container homePageStandings">
          <div className="homePageStandingsContainer">
            <h2>{Object.keys(standings).length && standings.competition.name} Standings</h2>
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