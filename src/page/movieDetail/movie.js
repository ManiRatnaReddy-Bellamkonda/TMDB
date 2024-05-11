import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import "./Header.css"
import { Link, useNavigate } from "react-router-dom"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()
    const [search,setSearch]=useState('');

    const history=useNavigate();
    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data))
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




<div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie__links">
              

                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>

        </div>
        </>
      
    )
}

export default Movie