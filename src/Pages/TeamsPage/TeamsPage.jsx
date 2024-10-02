import { useEffect, useState } from "react"
import GetTeamMatches from "../../Components/HomePage/GetTeamMatches";
import { PulseLoader } from "react-spinners";
import "./TeamsPage.css";
import Squad from "../../Components/HomePage/Squad";
import MatchesHeader from "../../Components/HomePage/MatchesHeader";

export default function TeamsPage({id, seasonID}) {
    const [loading, setLoading] = useState(true);
    const [allTeamInfo, setAllTeamInfo] = useState({});
    const [teamArray, setTeamArray] = useState([]);
    const [allMatches, setAllMatches] = useState([]);
    const [matchday, setMatchday] = useState();
    const [numOfMatchesArray, setNumOfMatchesArray] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [team, setTeam] = useState();
    const [squadInfo, setSquadInfo] = useState([])
    const [filterSquad, setFilterSquad] = useState([])
    const [squadButton, setSquadButton] = useState(true);

    function handleButtonDisplay() {
        setSquadButton(prevState => !prevState)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                // Fetch team info
                const teamsResponse = await fetch(`/api/teams?id=${id}&seasonID=${seasonID}`);
                const teamsData = await teamsResponse.json();
                setAllTeamInfo(teamsData);

                // Fetch matches
                const matchesResponse = await fetch(`/api/matches?id=${id}&seasonID=${seasonID}`);
                const matchesData = await matchesResponse.json();
                setAllMatches([matchesData]);

                // Fetches players from MongoDB
                if (parseInt(seasonID) >= 2022) {
                    const squadResponse = await fetch(`/api/data?sportsId=${id}&year=${seasonID}`);
                    const squadResult = await squadResponse.json();
                    setSquadInfo(squadResult);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, seasonID]);


    useEffect(() => {
        if (squadInfo.length > 0 && team) {
            const tempSquads = squadInfo[0]?.teams || [];
            const filtered = tempSquads.filter(s => s.name === team);
            setFilterSquad(filtered);
        }
    }, [squadInfo, team]);

    useEffect(() => {
        async function allTeamNames() {
            try {
                const allTeams = allTeamInfo;
                allTeams?.teams?.sort((a, b) => a.shortName > b.shortName ? 1 : -1);
                setTeamArray(allTeams?.teams);
                setTeam(allTeams?.teams[0].name);
                setNumOfMatchesArray([]);
                setMatchday(allTeams?.season.currentMatchday);
                for (let i = 1; i <= allTeams?.count * 2 - 2; i++) {
                    setNumOfMatchesArray(numOfMatchesArray => [...numOfMatchesArray, i]);
                }
            } catch (error) {
                console.error('Error processing team names:', error);
            }
        }
        allTeamNames();
    }, [allTeamInfo]);

    if (loading) {
        return (
            <div className="loader">
                <PulseLoader color="#FFFFFF" />
            </div>
        )
    }
    return (
        <div className="teamsPage">
            <div className="teamsPageHeader">
                <MatchesHeader
                    id={id}
                    seasonID={seasonID}
                    teamArray={teamArray}
                    allMatches={allMatches}
                    filteredMatches={filteredMatches}
                    setFilteredMatches={setFilteredMatches}
                    team={team}
                    setTeam={setTeam}
                />
            </div>
            <div className="teamsPageinfo">
                <div className="teamsPageMatches">
                    <GetTeamMatches
                        teamArray={teamArray}
                        filteredMatches={filteredMatches}
                        matchday={matchday}
                        filter={'team'}
                    />
                </div>
                    <div className="teamsPageSquad">
                        <div className="showSquadButton">
                            <button onClick={handleButtonDisplay} className="btn btn-primary">{squadButton ? "Hide":"Show"} Squad</button>
                        </div>
                        {squadButton ? 
                            <div>
                                <h1 className="teamSquadTitle">{filterSquad[0]?.shortName} Squad</h1>
                                <Squad filterSquad={filterSquad}/>
                            </div>
                        :
                            ""
                        }
                    </div>
            </div>
        </div>
    )
}