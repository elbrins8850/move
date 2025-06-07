import Search from "./Components/Search.jsx";
import {useEffect, useState} from "react";
import Spinner from "./Components/Spinner.jsx";
import MovieSection from "./Components/MovieSection.jsx";
import {useDebounce} from "react-use";

const API_BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    }
}
const App = () => {
    const [searchText, setSearchText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [islodaing, setIslodaing] = useState(false);
    const[debouncedSearch, setDebouncedSearch] = useState('');
    useDebounce(()=>setDebouncedSearch(searchText),2000, [searchText]);
    const fetchMovies = async (query='') => {
        setIslodaing(true);
        setErrorMessage("");
        try {
            const endpoint =query?
                    `${API_BASE_URL}/search/movie?query=${query}`
                :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(`Failed to fetch movies`)
            }
            const data = await response.json();
            if (data.Response === "False") {
                setErrorMessage(data.Error || `filed fetch the movies`)
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);
        } catch (error) {
            console.log(`Error fetching movies${error}`);
            setErrorMessage(`Error fetching movies. please try aging later.`);
        } finally {
            setIslodaing(false)
        }
    }
    useEffect(() => {
        fetchMovies(debouncedSearch);
    }, [debouncedSearch]);
    return (
        <main className="overflow-hidden">
            <div className="pattern"/>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="image"/>
                    <h1>
                        Find <span className="text-gradient">Movies</span> You&#39;ll Enjoy without the Hassle
                    </h1>
                    <Search setSearchText={setSearchText} searchText={searchText}/>
                    <h5 className="text-white">{searchText}</h5>
                </header>
                <section className="all-movies">
                    <h2 className="mb-[20px] mt-[40px]">All Movies</h2>
                    {islodaing ? (
                        <Spinner/>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => {
                                return (
                                    // <p key={movie.id}>{movie.title}</p>
                                        <MovieSection key={movie.id} movie={movie}/>
                                )
                            })}
                        </ul>
                    )

                    }
                </section>
            </div>
        </main>
    )
}
export default App
