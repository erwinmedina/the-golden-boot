import { useEffect, useState } from "react"
import "./ExpandMatchCard.css";
import StadiumMap from "./StadiumMap";


export default function ExpandMatchCard({index, match, teamArray, filter}) {
    const [stadium, setStadium] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    let mapIndex = "map" + index;
    let mapIndexHash = "#map" + index;
    let homeWiki = "https://en.wikipedia.org/wiki/" + match.homeTeam.homeTeamSearch;
    let awayWiki = "https://en.wikipedia.org/wiki/" + match.awayTeam.awayTeamSearch;


    useEffect(function() {
        async function getDate() {
            const dateInfo = new Date(match.utcDate);
            const dateArray = dateInfo.toLocaleString().split(",")
            setDate(dateArray[0]);
            setTime(dateArray[1]);
        } getDate();


        async function stadiumName() {
            for (let i = 0; i < teamArray.length; i++) {
                if (match.homeTeam.id === teamArray[i].id) {
                    return (setStadium(teamArray[i].venue));
                }
            }
        } stadiumName();

    }, [match, filter])

    return(
        <div>
            <div className="ExpandCard">
                <div className="ExpandCardLeft btn-group-vertical">
                    <a href={homeWiki} target="_blank">
                        <div className="btnArena btn btn-primary">Wiki <br/>{match.homeTeam.name}</div>
                    </a>
                    <a href={awayWiki} target="_blank">
                        <button className="btnArena btn btn-primary">Wiki <br/>{match.awayTeam.name}</button>
                    </a>
                    <div>
                        <button type="button" className="btnArena btn btn-primary" data-toggle="collapse" data-target={mapIndexHash}>Map / Arena</button>
                    </div>
                </div>

                <div className="ExpandCardRight">
                    <table className="table table-hov">
                        <tbody>
                            <tr>
                                <td>Date:</td>
                                <td>{date}</td>
                            </tr>
                            <tr>
                                <td>Local Time:</td>
                                <td>{time}</td>
                            </tr>
                            <tr>
                                <td>Stadium:</td>
                                <td>{stadium}</td>
                            </tr>
                            <tr>
                                <td>Referee:</td>
                                <td>{match.referees[0]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="stadiumMapShow collapse" id={mapIndex}>
                <StadiumMap lat={51.5549} lng={-0.109112}/>
            </div>

            
        </div>
    )
}