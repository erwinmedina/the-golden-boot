import "./Navbar.css";
import "../../Pages/App/App.css"
import { Link, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from "../../Contexts/AuthContext";

export default function Navbar({ setId, setSeasonID }) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const auth = getAuth();
    const { user } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out..", error)
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">The Golden Boot</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
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
            {/* <ul className="navbar-nav navbar-login">
                { user ? 
                    <>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Welcome, {user.displayName || "User"}!</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                <Link className="dropdown-item" onClick={handleSignOut}>Log Out</Link>
                            </div>
                        </li>
                    </>
                    :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/registration">Log In</Link>
                        </li>
                    </>
                }
            </ul> */}
        </div>
      </nav> 
    )
}