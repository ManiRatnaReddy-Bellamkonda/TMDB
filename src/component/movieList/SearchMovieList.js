import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"
import "./Header.css"
import { Link, useNavigate } from "react-router-dom"


const MovieList1 = () => {
    const history=useNavigate();
    const [movieList, setMovieList] = useState([])
    const [search,setSearch]=useState('');

    let si = localStorage.getItem("s");
    console.log(si);


    useEffect(() => {
        getData()
    }, [])



    const getData = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=7e83857727f0ae529a5a7188be7f3eea&query=${si}}&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }

    const lo = (e) => {
        e.preventDefault();
        localStorage.clear();
        history("/");
    };




    return (
        <>
                <div className="header">
            <div className="headerLeft">
                <Link to="/home"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>TopRated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
 
                <Link to="/" onClick={lo} style={{textDecoration: "none", paddingLeft: 700}}><span>Logout</span></Link>

            </div>
        </div>
        
        
        <div className="movie__list">
            <h2 className="list__title">Search Results</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
        
        
        
        
        </>
        

    )
}

export default MovieList1