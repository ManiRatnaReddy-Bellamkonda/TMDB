
import './App.css';

import Login from './page/Login/Login';
import Signup from './page/Signup/Signup';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import MovieList from './component/movieList/movieList';
import Home from './page/home/home';
import Movie from './page/movieDetail/movie';

function App() {
  return (
    <div className="App">
     <Router>
     
        <Routes>
            <Route index element = { <Login/> }></Route>
            <Route path="/home" element = { <Home/> }></Route>
            <Route path="/signup" element = { <Signup/> }></Route>
            <Route path="movie/:id" element={<Movie />}></Route>
            <Route path="movies/:type" element = {<MovieList />}></Route>
            <Route path="/*" element={<h1 > Error Page</h1>}></Route>
        </Routes>
     </Router>
    </div>
  );
}

export default App;
