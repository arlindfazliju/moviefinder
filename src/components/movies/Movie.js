import React, { Component, Fragment } from "react";
import Spinner from "../layout/Spinner";
import SimilarMovies from "../similarMovies/SimilarMovies";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Movie extends Component {
  componentDidMount() {
    this.props.getMovie(this.props.match.params.id);
    this.props.getSimilarMovies(this.props.match.params.id);
  }

  static propTypes = {
    loading: PropTypes.bool,
    movie: PropTypes.object.isRequired,
    similarMovies: PropTypes.array.isRequired,
    getMovie: PropTypes.func.isRequired,
    getSimilarMovies: PropTypes.func.isRequired,
  };
  render() {
    const {
      title,
      poster_path,
      popularity,
      adult,
      release_date,
      runtime,
      overview,
      budget,
      vote_average,
      vote_count,
      tagline,
      homepage,
    } = this.props.movie;

    const { loading, similarMovies } = this.props;
    const image_path = "https://image.tmdb.org/t/p/w500";

    if (loading) {
      return <Spinner />;
    }
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Kthehu ne kryefaqe
        </Link>
        Preferohet per femije:{" "}
        {adult ? (
          <i className="fas fa-times-circle text-danger" />
        ) : (
          <i className="fas fa-check text-success" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={`${image_path}${poster_path}`}
              alt=""
              style={{ width: "300px" }}
            />
            <h1>{title}</h1>
            <h3>Quote:</h3>
            <p>"{tagline}"</p>
            <h3>Data e premieres:</h3>
            <p>{release_date}</p>
          </div>
          <div>
            {overview && (
              <Fragment>
                <h3>Plot:</h3>
                <p>{overview}</p>
              </Fragment>
            )}
            <a href={homepage} className="btn btn-dark my-1">
              Vizito faqen zyrtare
            </a>
            <ul>
              <li>
                {runtime && (
                  <Fragment>
                    <strong>Kohezgjata e filmit: </strong>
                    {runtime} Minuta
                  </Fragment>
                )}
              </li>
              <li>
                {budget && (
                  <Fragment>
                    <strong>Bugjeti: </strong>
                    {budget} Dollare
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-danger">Popullariteti: {popularity}</div>
          <div className="badge badge-dark">Numri i votave: {vote_count}</div>
          <div className="badge badge-success">
            Vleresimi mestar: {vote_average}
          </div>
        </div>
        <div className="text-center">
          <h1>Filma te ngjashem: </h1>
        </div>
        <div className="grid-3">
          <SimilarMovies similarMovies={similarMovies} />
        </div>
      </Fragment>
    );
  }
}

export default Movie;
