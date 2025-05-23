import { useEffect, useState } from "react"
import { PulseLoader } from "react-spinners";
import GetTeamMatches from "../../Components/HomePage/GetTeamMatches";
import MatchdayHeader from "../../Components/TeamsPage/MatchdayHeader";
import "../../Components/HomePage/GetAllMatches.css"
import "./MatchesPage.css"

export default function MatchesPage({id, seasonID}) {
    const [loading, setLoading] = useState(true);
    const [allTeamInfo, setAllTeamInfo] = useState({})
    const [teamArray, setTeamArray] = useState([]);
    const [allMatches, setAllMatches] = useState([]);
    const [matchday, setMatchday] = useState();
    const [numOfMatchesArray, setNumOfMatchesArray] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([])
    
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
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id, seasonID]);

    useEffect(() => {
        async function allTeamNames() {
            try {
                const allTeams = allTeamInfo;
                allTeams?.teams?.sort((a, b) => a.shortName > b.shortName ? 1 : -1);
                setTeamArray(allTeams.teams);
                setNumOfMatchesArray([]);
                setMatchday(allTeams.season.currentMatchday);
                for (let i = 1; i <= allTeams.count * 2 - 2; i++) {
                    setNumOfMatchesArray(numOfMatchesArray => [...numOfMatchesArray, i]);
                }
            } catch (error) {
                console.error('Error processing team names:', error);
            }
        }
        allTeamNames();
    }, [allTeamInfo]);
    
    function handleMatchday(event) {
        setMatchday(event.target.value);
    }

    useEffect(function() {
        async function filterMatches() {
            setFilteredMatches([])
            if (allMatches.length) {
                for (let i = 0; i < allMatches[0].matches.length; i++) {
                    if (allMatches[0].matches[i].matchday == matchday) {
                        setFilteredMatches(filteredMatches => [...filteredMatches, allMatches[0].matches[i]])
                    }
                }}
        }
        filterMatches();
    }, [allMatches, id, matchday])

    if (loading) {
        return (
            <div className="loader">
                <PulseLoader color="#FFFFFF" />
            </div>
        )
    }
    

    return (
        <div className="matchesPage">
            <div className="matchesPageHeader">
                <MatchdayHeader
                    allMatches={allMatches}
                    seasonID={seasonID}
                    numOfMatchesArray={numOfMatchesArray}
                    matchday={matchday}
                    setMatchday={setMatchday}
                />
            </div>
            <div className="matchesPageTeams teamsPageinfo">
                <div className="teamsPageMatches">
                    <GetTeamMatches
                        teamArray={teamArray}
                        filteredMatches={filteredMatches}
                        matchday={matchday}
                        filter={'team'}
                    />
                </div>
            </div>
        </div>
    )
}