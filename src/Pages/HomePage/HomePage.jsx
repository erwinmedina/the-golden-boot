import { Link } from 'react-router-dom';
import "./HomePage.css";


export default function HomePage() {
    return (
        <div className="HomePage">
            <div className="HomePageMain">
                <img src="https://i.imgur.com/vMIlJl0.jpeg" alt="" />
                <div className="HomePageMainText">
                    <h3>An easier way to stay up-to-date with the latest games in your favorite soccer leagues</h3>
                </div>
            </div>
            <div className="features">
                <div className="card coverage">
                    <img className="card-img-top" src="https://i.imgur.com/ijVcQYQ.jpeg" alt="" />
                    <div className="card-body coverageDetails">
                        <p className="card-title">Matches</p>
                        <p className="card-text"> Here you can filter by matchday, allowing you quickly see the teams you're going up against or check out previous games and see how you did.</p>
                        <div className="coverageDetailsButton">
                            <Link className="cardButton btn btn-primary" to="/matches">Check it out <i className="arrow right"></i></Link>
                        </div>
                    </div>
                </div>
                <div className="card coverage">
                    <img className="card-img-top" src="https://i.imgur.com/fUgLxtB.jpeg" alt="" />
                    <div className="card-body coverageDetails">
                        <p className="card-title">Teams</p>
                        <p className="card-text"> This is the place to filter by your favorite team and see all upcoming (and previous) matches for that specific team!</p>
                        <Link className="cardButton btn btn-primary" to="/teams">Check it out <i className="arrow right"></i></Link>
                    </div>
                </div>
                <div className="card coverage">
                    <img className="card-img-top" src="https://i.imgur.com/3JUdZ2X.jpeg" alt="" />
                    <div className="card-body coverageDetails">
                        <p className="card-title">Standings</p>
                        <p className="card-text"> Want to see how your team is performing (or has performed)? Check out the standings and where they are in the table. Also check out who's leading the goal scoring!</p>
                        <Link className="cardButton btn btn-primary" to="/standings">Check it out <i className="arrow right"></i></Link>
                    </div>
                </div>
                <div className="card coverage">
                    <img className="card-img-top" src="https://i.imgur.com/HwoYFNe.jpeg" alt="" />
                    <div className="card-body coverageDetails">
                        <p className="card-title">League Coverage</p>
                        <div className="leagueCoverage card-text">
                            <div className="league">
                                <div>🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
                                <div>Premier League</div>
                            </div>
                            <div className="league">
                                <div>🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
                                <div>Championship</div>
                            </div>
                            <div className="league">
                                <div>🇪🇸</div>
                                <div>La Liga</div>
                            </div>
                            <div className="league">
                                <div>🇩🇪</div>
                                <div>Bundesliga</div>
                            </div>
                            <div className="league">
                                <div>🇮🇹</div>
                                <div>Serie A</div>
                            </div>
                            <div className="league">
                                <div>🇫🇷</div>
                                <div>Ligue 1</div>
                            </div>
                            <div className="league">
                                <div>🇵🇹</div>
                                <div>Premeira Liga</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card coverage">
                    <img className="card-img-top" src="https://i.imgur.com/i7hbeMI.jpeg" alt="" />
                    <div className="card-body coverageDetails">
                        <p className="card-title">Features</p>
                        <p className="card-text">
                            <div>- Filter for match days</div>
                            <div>- Filter for your favorite teams</div>
                            <div>- Check out team standings</div>
                            <div>- See leading goal scorers</div>
                            <div>- Adjust the season year</div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}