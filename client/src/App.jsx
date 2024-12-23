import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Signup from './pages/Signup';
import WaterPage from './pages/Water';
import NutritionPage from './pages/Nutrition';
import ExercisePage from './pages/Exercise';
import WeightPage from './pages/Weight';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/water" element={<WaterPage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/weight" element={<WeightPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
