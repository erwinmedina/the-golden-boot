import { useEffect, useState } from "react"
import "./ExpandMatchCard.css";
import StadiumMap from "./StadiumMap";


export default function ExpandMatchCard({index, match, teamArray, filter}) {
    const [stadium, setStadium] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [wiki, setWiki] = useState([
        {
            name: "home",
            wiki: "https://en.wikipedia.org/wiki/" + match.homeTeam.name,
            active: false,
            dataTarget: "#homeTeam" + index,
            dataID: "homeTeam" + index,
        },
        {
            name: "away",
            wiki: "https://en.wikipedia.org/wiki/" + match.awayTeam.name,
            active: false,
            dataTarget: "#awayTeam" + index,
            dataID: "awayTeam" + index,
        }
    ])
    function handleWikiClick(index) {
        setWiki(prevWiki =>
            prevWiki.map((item, idx) => 
                idx === index ? { ...item, active: !item.active } : { ...item, active: false } 
        ))
    }

    useEffect(function() {
        async function getDate() {
            const dateInfo = new Date(match.utcDate);
            const dateArray = dateInfo.toLocaleString().split(",")
            setDate(dateInfo.toDateString());
            setTime(dateArray[1]);
        } getDate();

        function updateWiki() {
            setWiki(prevWiki => [
                {
                    ...prevWiki[0],
                    wiki: "https://en.wikipedia.org/wiki/" + match.homeTeam.name
                },
                {
                    ...prevWiki[1],
                    wiki: "https://en.wikipedia.org/wiki/" + match.awayTeam.name
                },

            ])
        }
        updateWiki();

        async function stadiumName() {
            const team = teamArray.find(team => team.id === match.homeTeam.id);
            if (team) {
                setStadium(team.venue);
            }
        } stadiumName();

    }, [match, filter, teamArray])

    return(
        <div>
            <div className="ExpandCard">
                <div className="ExpandCardLeft btn-group-vertical">
                    <div>
                        <button className="btnArena btn btn-dark" onClick={() => handleWikiClick(0)} data-toggle="collapse" data-target={wiki[0].dataTarget}>
                            Wiki <br/>{match.homeTeam.name}
                        </button>
                    </div>
                    <div>
                        <button className="btnArena btn btn-dark" onClick={() => handleWikiClick(1)} data-toggle="collapse" data-target={wiki[1].dataTarget}>
                            Wiki <br/>{match.awayTeam.name}
                        </button>
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
                                <td>{match.referees.length >= 1 && match.referees[0].name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="page" id="accordion">
                {wiki.map((item, index) => (
                    <div class="stadiumMapShow collapse" data-parent="#accordion" id={item.dataID} key={index}>
                        {item.active && (
                            <div class="embed-responsive embed-responsive-1by1">
                                <iframe key={item.dataID + item.active} class="embed-responsive-item" src={item.wiki} allowfullscreen></iframe>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}