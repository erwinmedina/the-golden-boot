import "./SmallStandings.css"
import { useState } from "react";

export default function SmallStandings({ selectedTeams }) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 380);

    function splitForms(string) {
        const newArray = string.split(",").reverse();
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

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    
    return (
        <div className="teamsPageSmallStandings">
            <table id="smallStandings" className="table table-striped table-dark">
                <thead>
                    { isSmallScreen ?
                        <tr>
                            <th className="overallText">#</th>
                            <th colSpan={1}></th>
                            <th className="overallText">Points</th>
                            <th className="overallText">Goals</th>
                            <th className="overallText">GD</th>
                        </tr>
                        :
                        <tr>
                            <th className="overallText">#</th>
                            <th colSpan={1}></th>
                            <th className="overallText">Points</th>
                            <th className="overallText">W</th>
                            <th className="overallText">D</th>
                            <th className="overallText">L</th>
                            <th className="overallText">Goals</th>
                            <th className="overallText">GD</th>
                        </tr>
                    }
                </thead>
                <tbody>
                    { selectedTeams?.length > 0 && selectedTeams.map((team, index) => 
                        (isSmallScreen ? 
                            <tr>
                                <td className="overallText">{team.position}</td>
                                <div className="nameAndFormContainer">
                                    <div className="teamCrest">
                                        <td className="teamNames teamImg"><img alt="stuff" src={team.team.crest}/></td>
                                    </div>
                                    <div className="nameAndForm">
                                        <td className="teamNames">{team.team.shortName}</td>
                                        <td className="teamFormBalls teamNames">{ splitForms(team.form)}</td>
                                    </div>
                                </div>
                                <td className="overallText">{team.goalsFor}:{team.goalsAgainst}</td>
                                <td className="overallText">{team.goalDifference}</td>
                                <td className="overallText">{team.points}</td>
                            </tr>
                            :
                            <tr>
                                <td className="overallText">{team.position}</td>
                                <div className="nameAndFormContainer">
                                    <div className="teamCrest">
                                        <td className="teamNames teamImg"><img alt="stuff" src={team.team.crest}/></td>
                                    </div>
                                    <div className="nameAndForm">
                                        <td className="teamNames">{team.team.shortName}</td>
                                        <td className="teamFormBalls teamNames">{ splitForms(team.form)}</td>
                                    </div>
                                </div>
                                <td className="overallText">{team.points}</td>
                                <td className="overallText">{team.won}</td>
                                <td className="overallText">{team.draw}</td>
                                <td className="overallText">{team.lost}</td>
                                <td className="overallText">{team.goalsFor}:{team.goalsAgainst}</td>
                                <td className="overallText">{team.goalDifference}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}