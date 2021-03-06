import './App.css';
import Voters from './components/Voters';
import Candidates from './components/Candidates';
import CandidateDetail from './components/CandidateDetail';
import Home from './components/Home';
import NewElection from './components/NewElection';
import NewUser from './components/NewUser';
import Sidebar from './components/Sidebar';
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import Election from './components/Elections';
import Result from './components/Result'
import PrivateRoute from './routeHandler/privateRoute'

function App() {
  return (
    <Router>
      <div class="md:flex bg-[#D3E8E6]/20 h-screen">
        <div class="bg-[#2F313D] text-white md:hidden">
          <button class="p-4">
            <AiOutlineMenu />
          </button>
        </div>
        <div class="w-[25vw] inset-y-0 left-0 absolute transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
          <Sidebar />
        </div>
        <div class="flex-1 h-screen md:overflow-y-auto">
          <Routes>
            <Route path="/" exact element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/voters" element={
              <PrivateRoute>
                <Voters />
              </PrivateRoute>
            } />
            <Route path="/candidates" element={
              <PrivateRoute>
                <Candidates />
              </PrivateRoute>
            } />
            <Route path="/candidateDetail" element={
              <PrivateRoute>
                <CandidateDetail />
              </PrivateRoute>
            } />
            <Route path="/voters/newuser" element={
              <PrivateRoute>
                <NewUser />
              </PrivateRoute>
            } />
            <Route path="/elections" element={
              <PrivateRoute>
                <Election />
              </PrivateRoute>
            } />
            <Route path="/elections/newelection" element={
              <PrivateRoute>
                <NewElection />
              </PrivateRoute>
            } />
            <Route path="/results" element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            } />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
            <Route path="/admin/login" element={<Login />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
