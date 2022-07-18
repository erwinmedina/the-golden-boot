import "./Navbar.css";

export default function Navbar({setId, setFilter, setSeasonID}) {
    function handleMatch() {
        setFilter('match');
    }
    function handleTeam() {
        setFilter('team')
    }
    function handleTable() {
        setFilter('table')
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
                    <a onClick={handleMatch} class="nav-link" href="#">Matches</a>
                </li>
                <li>
                    <a onClick={handleTeam} class="nav-link" href="#">Team</a>
                </li>
                <li>
                    <a onClick={handleTable} class="nav-link" href="#">Table</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Leagues</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" onClick={() => setId(2021)} href="#">Premier League</a>
                        <a class="dropdown-item" onClick={() => setId(2016)} href="#">English Championship</a>
                        <a class="dropdown-item" onClick={() => setId(2014)} href="#">La Liga</a>
                        <a class="dropdown-item" onClick={() => setId(2002)} href="#">Bundesliga</a>
                        <a class="dropdown-item" onClick={() => setId(2019)} href="#">Serie A</a>
                        <a class="dropdown-item" onClick={() => setId(2015)} href="#">Ligue 1</a>
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