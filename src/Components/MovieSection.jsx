import React from 'react'

const MovieSection = ({movie:{
    title,poster_path,vote_average,release_date,original_language
                      }}
) => {
    return (
        <div className="movie-card">
        <img src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}`:"/no-movie.png"} alt={title}/>
        <div className="mt-4">
        <h3>{title}</h3>
            <div className="content">
                <div className="rating d-flex
                flex-block">
                    <img src="star.svg" alt="Star icon"/>
                    <p>{vote_average? vote_average.toFixed(1):'N/A'}</p>
                </div>
                <p className="lang">{original_language}</p>

                <span>•</span>
                <p className="year">
                    {release_date ? release_date.split('-')[0] : 'N/A'}
                </p>
            </div>
        </div>
        </div>
    )
}
export default MovieSection
