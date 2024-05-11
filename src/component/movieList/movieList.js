import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"
import "./Header.css"
import { Link, useNavigate } from "react-router-dom"

const MovieList = () => {
    const history=useNavigate();
    const [movieList, setMovieList] = useState([])
    const [search,setSearch]=useState('');
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=7e83857727f0ae529a5a7188be7f3eea&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }

    const lo = (e) => {
        e.preventDefault();
        localStorage.clear();
        history("/");
    };

    async function submit(e){
        e.preventDefault();

        try{
            
             const s = "";
            
            localStorage.setItem("s", search);
          
            let si = localStorage.getItem("s");
            console.log(si);

           
            history("/mov/search");

        }
        catch(e){
            console.log(e);

        }

    }
    return (
        <>
                <div className="header">
            <div className="headerLeft">
                <Link to="/home"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>TopRated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                <form action="POST" style={ {marginLeft: 440}}>
                <input onChange={(e) => { setSearch(e.target.value) }}     style={{
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #ced4da",
        width: "150px" // Adjust width as needed
       // Optional margin bottom for spacing
    }} placeholder="Search Movie"  />  
                <input  type="submit" value="Search" style={{
        cursor: "pointer",
        backgroundColor: "#f3ce13",
        color: "black",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop:"5px",
        paddingBottom:"5px",
        borderRadius: "5px"
    }} onClick={submit}  />
            </form>
                <Link to="/" onClick={lo} style={{textDecoration: "none"}}><span>Logout</span></Link>

            </div>
        </div>
        
        
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
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

export default MovieList