import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL, API_KEY } from "../../../contexts/tmb";
import { Card, Grid, Header, Segment } from "semantic-ui-react";

const MoviesList = ({ gender, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);
  const [totalResults, setTotalResults] = useState(-1);

  const callTMBApi = useCallback(
    (page) => {
      const params = {
        api_key: API_KEY,
        page,
      };

      if (gender) {
        params.with_genres = gender;
      }

      setIsLoading(true);

      axios
        .get(`${BASE_URL}/discover/movie/`, { params })
        .then(({ data }) => {
          setMovies((previousMovies) => {
            const existingMovies = previousMovies || [];
            return [...existingMovies, ...data.results];
          });
          setTotalPage(data.total_pages);
          setTotalResults(data.total_results);
        })
        .finally(() => {
          setIsLoading(false);
          setPage((previousPage) => previousPage + 1);
        });
    },
    [gender]
  );

  useEffect(() => {
    if (!isLoading && !movies) {
      callTMBApi(page);
    }
  }, [callTMBApi, isLoading, movies, page]);

  if (isLoading || !movies) {
    return "The movies are loading";
  }

  if (!movies.length) {
    return "No movies";
  }

  return (
    <div>
      <Header as="h3" dividing>
        Movies {movies.length}/{totalResults}
      </Header>
      <Segment>
        <Grid>
          <Grid.Row columns={3}>
            {movies.map(({ id, original_title }) => (
              <Grid.Column key={id}>
                <Card color="green" onClick={(event) => onClick(event, id)}>
                  <Card.Content>
                    <Card.Header>{original_title}</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Segment>
      <div>Number of pages {totalPage}</div>
    </div>
  );
};

MoviesList.propTypes = {
  onClick: PropTypes.func.isRequired,
  gender: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

MoviesList.defaultProps = {
  gender: null,
};

export default MoviesList;
