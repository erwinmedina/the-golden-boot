import "./Navbar.css";
import "../../Pages/App/App.css"
import { Link } from 'react-router-dom';

export default function Navbar({setId, setFilter, setSeasonID, themeToggler}) {
    
    function handleMatch() {
        setFilter('match');
    }
    function handleTeam() {
        setFilter('team')
    }
    function handleTable() {
        setFilter('table')
    }
    function handleTransfer() {
        setFilter('transfer')
    }
    function handleSeason(event) {
        setSeasonID(parseInt(event.target.value));
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">The Golden Boot</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <Link className="nav-link" to="/matches">Matches</Link>
                    {/* <a onClick={handleMatch} class="nav-link" href="#">Matches</a> */}
                </li>
                <li>
                    <Link className="nav-link" to="/teams">Teams</Link>
                    {/* <a onClick={handleTeam} class="nav-link" href="#">Team</a> */}
                </li>
                {/* <li>
                    <a onClick={handleTransfer} class="nav-link" href="#">Transfer</a>
                </li> */}
                <li>
                    {/* <a onClick={handleTable} class="nav-link" href="#">Table</a> */}
                    <Link className="nav-link" to="/standings">Standings</Link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Leagues</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" onClick={() => setId(2021)} href="#"><span className="flag">Premier League <span className="actualFlag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span></span></a>
                        <a class="dropdown-item" onClick={() => setId(2016)} href="#"><span className="flag">Championship <span className="actualFlag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span></span></a>
                        <a class="dropdown-item" onClick={() => setId(2014)} href="#"><span className="flag">La Liga <span className="actualFlag">🇪🇸</span></span></a>
                        <a class="dropdown-item" onClick={() => setId(2002)} href="#"><span className="flag">Bundesliga <span className="actualFlag">🇩🇪</span></span></a>
                        <a class="dropdown-item" onClick={() => setId(2019)} href="#"><span className="flag">Serie A <span className="actualFlag">🇮🇹</span></span></a>
                        <a class="dropdown-item" onClick={() => setId(2015)} href="#"><span className="flag">Ligue 1 <span className="actualFlag">🇫🇷</span></span></a>
                        {/* <a class="dropdown-item" onClick={() => setId(2001)} href="#">CHAMPIONS LEAGUE?</a> */}
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Season</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" onClick={() => setSeasonID(2022)} value="2022" href="#">2022-2023</a>
                        <a class="dropdown-item" onClick={() => setSeasonID(2021)} value="2021" href="#">2021-2022</a>
                        <a class="dropdown-item" onClick={() => setSeasonID(2020)} value="2020" href="#">2020-2021</a>
                    </div>
                </li>
                {/* <li className="listSelect">
                    <select className="navbar-select custom-select custom-select-sm" onChange={handleSeason} name="season" id="season">
                        <option value="2022">2022-2023</option>
                        <option value="2021">2021-2022</option>
                        <option value="2020">2020-2021</option>
                    </select>
                </li> */}
            </ul>
        </div>
      </nav> 
    )
}