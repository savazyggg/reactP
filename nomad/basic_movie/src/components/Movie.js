import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Movie = ({ id, medium_cover_image, title, genres, description_full }) => {
  return (
    <>
      <img src={medium_cover_image} alt={title}></img>
      <h1>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h1>
      <ul>
        {genres.map((g) => {
          return <li key={g}>{g}</li>;
        })}
      </ul>
      <p>{description_full}</p>
    </>
  );
};

export default Movie;

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  g: PropTypes.string,
  description_full: PropTypes.string,
  medium_cover_image: PropTypes.string,
};
