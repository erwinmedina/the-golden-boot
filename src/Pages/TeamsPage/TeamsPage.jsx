import { useEffect, useState } from "react"
import GetTeamMatches from "../../Components/HomePage/GetTeamMatches";
import { PulseLoader } from "react-spinners";
import "./TeamsPage.css";
import Squad from "../../Components/HomePage/Squad";
import MatchesHeader from "../../Components/HomePage/MatchesHeader";
import SmallStandings from "../../Components/HomePage/SmallStandings";

export default function TeamsPage({id, seasonID}) {
    const [loading, setLoading] = useState(true);
    const [standings, setStandings] = useState({});
    const [allTeamInfo, setAllTeamInfo] = useState({});
    const [teamArray, setTeamArray] = useState([]);
    const [allMatches, setAllMatches] = useState([]);
    const [matchday, setMatchday] = useState();
    const [numOfMatchesArray, setNumOfMatchesArray] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [team, setTeam] = useState();
    const [squadInfo, setSquadInfo] = useState([])
    const [filterSquad, setFilterSquad] = useState([])
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [isSquadVisible, setIsSquadVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(true);

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

                // Fetch standings
                const standingsResponse = await fetch(`/api/standings?id=${id}&seasonID=${seasonID}`);
                const standingsData = await standingsResponse.json();
                setStandings(standingsData);

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

    // Filters all teams to just 1 current team
    useEffect(() => {
        if (squadInfo.length > 0 && team) {
            const tempSquads = squadInfo[0]?.teams || [];
            const filtered = tempSquads.filter(s => s.name === team);
            setFilterSquad(filtered);
        }
    }, [squadInfo, team]);

    // Gets the 5 teams for the small standings table //
    useEffect(() => {
        if (standings && standings.standings && standings.standings.length > 0) {
            const teamsArray = standings?.standings[0].table;
            const currentTeamIndex = teamsArray?.findIndex(teamObj => teamObj?.team?.name === team);
            
            // checks to see if team exists before doing anything.
            if (currentTeamIndex !== -1) {
                const totalTeams = teamsArray.length;
                let start, end;

                // Top 2 teams, show 5 below
                if (currentTeamIndex <= 1) {
                    start = 0; end = 5;
                // Bottom 2 teams, show 5 above
                } else if (currentTeamIndex >= totalTeams-2) {
                    start = totalTeams - 5;
                    end = totalTeams;
                // All other teams, show 2 above and below.
                } else {
                    start = currentTeamIndex - 2;
                    end = currentTeamIndex + 3;
                }

                const teamsToDisplay = teamsArray?.slice(start, end);
                setSelectedTeams(teamsToDisplay);
            }
        }
    }, [squadInfo, team])

    useEffect(() => {
        async function allTeamNames() {
            try {
                const allTeams = allTeamInfo;
                allTeams?.teams?.sort((a, b) => a.shortName > b.shortName ? 1 : -1);
                setTeamArray(allTeams?.teams);
                setTeam(allTeams?.teams[0]?.name);
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
                <div className={`teamsPageMultiple ${isSquadVisible || isFormVisible ? '' : 'closed'}`}>
                    <div className="teamsPageSquad">
                        <div>
                            <h1 className="teamSquadTitle squadToggle" onClick={() => setIsSquadVisible(prev => !prev)}>
                                {filterSquad[0]?.shortName} Squad
                                <svg
                                    className={`arrowIcon ${isSquadVisible ? 'arrowDown' : 'arrowRight'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </h1>
                            {isSquadVisible && <Squad filterSquad={filterSquad}/>}
                        </div>
                    </div>
                    <div className="teamsPageForm">
                        <h1 className="teamSquadTitle squadToggle" onClick={() => setIsFormVisible(prev => !prev)}>
                            Current Form
                            <svg
                                className={`arrowIcon ${isFormVisible ? 'arrowDown' : 'arrowRight'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </h1>        
                        {isFormVisible && <SmallStandings selectedTeams={selectedTeams}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}