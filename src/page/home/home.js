import React, { useEffect, useState } from "react"
import "./home.css"
import "./Header.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from "react-router-dom";
import MovieList from "../../component/movieList/movieList";


const Home = () => {
    const history=useNavigate();
    const [ popularMovies, setPopularMovies ] = useState([])
    const [search,setSearch]=useState('');


    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=7e83857727f0ae529a5a7188be7f3eea&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

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
                <form action="POST" style={ {marginLeft: 450}}>
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
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie ? movie.backdrop_path: ""}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
              
             
            </div>
        </>
    )
}

export default Home
