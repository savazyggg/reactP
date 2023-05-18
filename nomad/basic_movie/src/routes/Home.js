import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  async function fetchApi() {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    );
    const body = await response.json();
    setMovies(body.data.movies);
    setLoading(false);
  }

  useEffect(() => {
    fetchApi();
  }, []);
  console.log(movies);
  return (
    <div className="App">
      {loading ? (
        <h1>loading..</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              medium_cover_image={movie.medium_cover_image}
              title={movie.title}
              genres={movie.genres}
              description_full={movie.description_full}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
