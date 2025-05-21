import "./GetStandings.css";
import { useEffect, useState} from "react";
import Top10GoalScorers from "../StandingsPage/Top10GoalScorers";
import PreviousWinners from "../StandingsPage/PreviousWinners";
import LeagueStandings from "../StandingsPage/LeagueStandings";

export default function GetStandings({standings, goalScorers, comp}) {

    const [filterComp, setFilterComp] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 380);
    
    useEffect(() => {
        async function filterCompetition() {
            const tempComp = comp;
            setFilterComp(tempComp?.seasons?.filter(c => c.winner != null));
        } filterCompetition();
    }, [comp]);

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);

    return (
        <div className="container homePageStandings">
            <div id="goalScorersAndWinners">
                <Top10GoalScorers goalScorers={goalScorers}/>
                <PreviousWinners goalScorers={goalScorers} filterComp={filterComp}/>
            </div>
            <LeagueStandings standings={standings} isSmallScreen={isSmallScreen}/>
        </div>
  );
}