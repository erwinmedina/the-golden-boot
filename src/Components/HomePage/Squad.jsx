import "./Squad.css"
import moment from "moment";
import NationalityFlag from "../Flags/Flags"
import { useEffect, useState } from "react"

export default function Squad( { filterSquad }) {

    const [coach, setCoach] = useState([])
    const [goalkeepers, setGoalkeepers] = useState([])
    const [defenders, setDefenders] = useState([])
    const [midfielders, setMidfielders] = useState([])
    const [forwards, setForwards] = useState([])

    useEffect(() => {
        if (filterSquad?.length > 0) {
            const squad = filterSquad[0]?.squad;
            if (squad) {
                setGoalkeepers(squad?.filter(p => p.position.includes("Goalkeeper")))
                setDefenders(squad?.filter(p => p.position.includes("Back")))
                setMidfielders(squad?.filter(p => p.position.includes("Midfield")))
                setForwards(squad?.filter(p => 
                    p.position.includes("Forward") || p.position.includes("Winger")))
                setCoach(filterSquad[0]?.coach)
            }
        }
    }, [filterSquad])

    function getAge(string) {
        if (string == null) return;
        let value = string.split("-").join("");
        let age = moment(value, "YYYYMMDD").fromNow(true);
        return(age.slice(0,2));
    }
    function consolidate(string) {
        if (string == "Goalkeeper") {
            return "GK";
        }
        else {
            if (string == null) return;
            const words = string.split(/[\s-]+/);
            const initials = words.map(word => word.charAt(0));
            return initials.join("");
        }
    }

    return (
        <div className="container squadTable">
            <div className="imageHolder">
                <img src={`${filterSquad[0]?.crest}`}/>
            </div>
            <table id="squadTable" className="scoreStandings table table-striped table-dark table-hover table-background"
            >
                {/* COACH */}
                <thead>
                    <tr className="headerText">
                        <th className="">Coach</th>
                        <th className="playerText">Position</th>
                        <th className="playerText">Age</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="tableRow">
                        <td colSpan={3} className="nationalityPlayer">
                            <div className="flagCircle">
                                <NationalityFlag country={coach?.nationality}/> 
                            </div>
                            <div className="playerName">{coach.name}</div>
                        </td>
                        <td></td>
                        <td className="playerText playerAge">{getAge(coach?.dateOfBirth)}</td>
                    </tr>
                </tbody>
                
                {/* GOALKEEPERS */}
                <thead>
                    <tr className="headerText">
                        <th colSpan={3} className="positionTitle">Goalkeepers</th>
                    </tr>
                </thead>
                <tbody>
                    {goalkeepers.map((gk, index) => (
                        <tr className="tableRow">
                            <td className="nationalityPlayer">
                                <div className="flagCircle">
                                    <NationalityFlag country={gk.nationality}/> 
                                </div>
                                <div className="playerName">{gk.name}</div>
                            </td>
                            <td title={gk.position} className="playerText playerPosition">{consolidate(gk.position)}</td>
                            <td className="playerText playerAge">{getAge(gk.dateOfBirth)}</td>
                        </tr>
                    ))}
                </tbody>

                {/* DEFENDERS */}
                <thead>
                    <tr className="headerText">
                        <th colSpan={3}>Defenders</th>
                    </tr>
                </thead>
                <tbody> 
                    {defenders.map((def, index) => (
                        <tr className="tableRow">
                            <td className="nationalityPlayer">
                                <div className="flagCircle">
                                    <NationalityFlag country={def.nationality}/> 
                                </div>
                                <div className="playerName">{def.name}</div>
                            </td>
                            <td title={def.position} className="playerText playerPosition">{consolidate(def.position)}</td>
                            <td className="playerText playerAge">{getAge(def.dateOfBirth)}</td>
                        </tr>
                    ))}
                </tbody>
                {/* MIDFIELDERS */}
                <thead>
                    <tr className="headerText">
                        <th colSpan={3}>Midfielders</th>
                    </tr>
                </thead>
                <tbody> 
                    {midfielders.map((mid, index) => (
                        <tr className="tableRow">
                            <td className="nationalityPlayer">
                                <div className="flagCircle">
                                    <NationalityFlag country={mid.nationality}/> 
                                </div>
                                <div className="playerName">{mid.name}</div>
                            </td>
                            <td title={mid.position} className="playerText playerPosition">{consolidate(mid.position)}</td>
                            <td className="playerText playerAge">{getAge(mid.dateOfBirth)}</td>
                        </tr>
                    ))}
                </tbody>
                {/* FORWARDS */}
                <thead>
                    <tr className="headerText">
                        <th colSpan={3}>Forwards</th>
                    </tr>
                </thead>
                <tbody> 
                    {forwards.map((striker, index) => (
                        <tr className="tableRow">
                            <td className="nationalityPlayer">
                                <div className="flagCircle">
                                    <NationalityFlag country={striker.nationality}/> 
                                </div>
                                <div className="playerName">{striker.name}</div>
                            </td>
                            <td title={striker.position} className="playerText playerPosition">{consolidate(striker.position)}</td>
                            <td className="playerText playerAge">{getAge(striker.dateOfBirth)}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}