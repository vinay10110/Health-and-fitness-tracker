import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WaterPage from './pages/Water';
import NutritionPage from './pages/Nutrition';
import ExercisePage from './pages/Exercise';
import WeightPage from './pages/Weight';


function App() {
  

  return (
    <>
       <Router>
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" component={DashBoard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/water" component={WaterPage} />
        <Route exact path="/nutrition" component={NutritionPage} />
        <Route exact path="/exercise" component={ExercisePage} />
        <Route exact path="/weight" component={WeightPage} />
        </Routes>
    </div>
  </Router>
    </>
  )
}

export default App
