import "./SmallStandings.css"

export default function SmallStandings({ selectedTeams }) {
    
    function splitForms(string) {
        const newArray = string.split(",");
        const formsArray = [];
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] == "W") {
                formsArray.push('🟢')
            } 
            else if (newArray[i] == "L") {
                formsArray.push('🔴')
            }
            else {
                formsArray.push("⚪️")
            }
        }
        return formsArray
    }

    return (
        <div className="teamsPageSmallStandings">
            <table id="smallStandings" className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th className="overallText">#</th>
                        <th colSpan={2}></th>
                        <th className="overallText">W</th>
                        <th className="overallText">D</th>
                        <th className="overallText">L</th>
                        <th className="overallText">Goals</th>
                        <th className="overallText">GD</th>
                        <th className="overallText">Points</th>
                        <th className="overallText">Form</th>
                    </tr>
                </thead>
                <tbody>
                    { selectedTeams?.length > 0 && selectedTeams.map((team, index) => 
                        <tr>
                            <td className="overallText">{team.position}</td>
                            <td className=" teamImg"><img alt="stuff" src={team.team.crest}/></td>
                            <td className="teamNames">{team.team.shortName}</td>
                            <td className="overallText">{team.won}</td>
                            <td className="overallText">{team.draw}</td>
                            <td className="overallText">{team.lost}</td>
                            <td className="overallText">{team.goalsFor}:{team.goalsAgainst}</td>
                            <td className="overallText">{team.goalDifference}</td>
                            <td className="overallText">{team.points}</td>
                            <td className="overallText">{ splitForms(team.form)}</td>
                        </tr>
                    
                    )}
                </tbody>
            </table>
        </div>
    )
}