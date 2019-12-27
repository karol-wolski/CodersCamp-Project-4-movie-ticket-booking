import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moviesApi from 'static/moviesAPI';
import routes from 'static/routes';
import MovieDetails from 'components/MovieDetails';

const Details = (props) => {
  const { id } = useParams();
  //* destructure object keys
  const { homepage, dateSelection } = routes;
  //*
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${moviesApi}`, { signal: controller.signal })
      .then(res => res.json())
      .then(json => setMovies(json.results))
      .catch(err => {
        if (err.name === 'AbortError') {
          return
        }
      })
    return () => controller.abort();
  }, []);

  console.log(movies);

  const posterUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
      <MovieDetails 
        image={`${posterUrl}${movies.poster_path}`}
        title={movies.title}
        vote={movies.vote_average}
        releaseDate={movies.release_date}
        content={movies.overview}
        />
      <button><Link to={dateSelection(id)}>See date selection page</Link></button>
      <button><Link to={homepage}>Go back</Link></button>
    </div>
  );
};

export default Details;
