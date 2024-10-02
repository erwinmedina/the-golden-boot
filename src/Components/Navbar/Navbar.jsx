import "./Navbar.css";
import "../../Pages/App/App.css"
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ setId, setSeasonID }) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">The Golden Boot</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/matches">Matches</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/standings">Standings</Link>
                </li>
                <li className="nav-item dropdown">
                    <a className={`nav-link dropdown-toggle ${isHomePage ? 'disabled' : ''}`} href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Leagues</a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" onClick={() => setId(2021)} href="#"><span className="flag">Premier League <span className="actualFlag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span></span></a>
                        <a className="dropdown-item" onClick={() => setId(2016)} href="#"><span className="flag">Championship <span className="actualFlag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span></span></a>
                        <a className="dropdown-item" onClick={() => setId(2014)} href="#"><span className="flag">La Liga <span className="actualFlag">🇪🇸</span></span></a>
                        <a className="dropdown-item" onClick={() => setId(2002)} href="#"><span className="flag">Bundesliga <span className="actualFlag">🇩🇪</span></span></a>
                        <a className="dropdown-item" onClick={() => setId(2019)} href="#"><span className="flag">Serie A <span className="actualFlag">🇮🇹</span></span></a>
                        <a className="dropdown-item" onClick={() => setId(2015)} href="#"><span className="flag">Ligue 1 <span className="actualFlag">🇫🇷</span></span></a>
                        <a className="dropdown-item" onClick={() => setId(2017)} href="#"><span className="flag">Primeira Liga <span className="actualFlag">🇵🇹</span></span></a>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a className={`nav-link dropdown-toggle ${isHomePage ? 'disabled' : ''}`} href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Season</a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" onClick={() => setSeasonID(2024)} value="2022" href="#">2024-2025</a>
                        <a className="dropdown-item" onClick={() => setSeasonID(2023)} value="2022" href="#">2023-2024</a>
                        <a className="dropdown-item" onClick={() => setSeasonID(2022)} value="2022" href="#">2022-2023</a>
                        {/* <a className="dropdown-item" onClick={() => setSeasonID(2021)} value="2021" href="#">2021-2022</a>
                        <a className="dropdown-item" onClick={() => setSeasonID(2020)} value="2020" href="#">2020-2021</a> */}
                    </div>
                </li>
            </ul>
        </div>
      </nav> 
    )
}