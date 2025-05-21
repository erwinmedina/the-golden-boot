

export default function LeagueStandings({standings, isSmallScreen}) {
    return (
    <div className="homePageStandingsContainer tableStats">
        <h2>{Object.keys(standings)?.length && standings?.competition.name} Standings</h2>
        <h3>
            {Object.keys(standings)?.length && standings?.season?.startDate?.slice(0,5)}  
            {Object.keys(standings)?.length && standings?.season?.endDate?.slice(0,4)} Season
        </h3>
        <hr />
        <div className="tableContainer table-responsive">
            <table id="tableStandings" className="table table-hover table-dark table-striped table-sm ">
                <thead>
                    <tr>
                        <th className="tableCSS" scope="col"></th>
                        <th colSpan="2" scope="col" className="tableCSS teamName"></th>
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
                            <td className="tableCSS teamStats">{team.draw}</td>
                            <td className="tableCSS teamStats">{team.lost}</td>
                            <td className="tableCSS teamStats">{team.goalsFor}</td>
                            <td className="tableCSS teamStats">{team.goalsAgainst}</td>
                            <td className="tableCSS teamStats">{team.goalDifference}</td>
                            <td className="tableCSS teamStats">{team.points}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <div className="legend container">
            <p>MP = Matches Played</p>
            <p>W = Win</p>
            <p>D = Draws</p>
            <p>L = Loses</p>
            <p>GF = Goals For</p>
            <p>GA = Goals Against</p>
            <p>GD = Goal Difference</p>
        </div>
    </div> 
    )
}