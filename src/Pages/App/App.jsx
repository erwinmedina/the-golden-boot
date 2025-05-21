import './App.css';
import '../../firebase';
import HomePage from '../HomePage/HomePage';
import { Route, Routes, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MatchesPage from '../MatchesPage/MatchesPage';
import StandingsPage from '../StandingsPage/StandingsPage';
import Navbar from '../../Components/Navbar/Navbar';
import TeamsPage from '../TeamsPage/TeamsPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import { AuthProvider } from '../../Contexts/AuthContext';
import DashboardPage from '../DashboardPage/DashboardPage';

export default function App() {

  const [id, setId] = useState(2021);
  const [seasonID, setSeasonID] = useState(2024);

  return (
    <AuthProvider>
      <div className="App">
        <div className="sticky-top">
              <Navbar setId={setId} setSeasonID={setSeasonID}/>
        </div>
        <Routes>
          <Route path="/matches" element={<MatchesPage
              id={id}
              seasonID={seasonID}
              />} 
              />
          <Route path="/teams" element={<TeamsPage
              id={id}
              seasonID={seasonID}
              />} 
              />
          <Route path="/standings" element={<StandingsPage
              id={id}
              seasonID={seasonID}
              />} 
              />
          <Route path="/registration" element={<RegistrationPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

