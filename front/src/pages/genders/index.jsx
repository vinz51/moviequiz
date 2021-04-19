import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL, API_KEY } from "../../contexts/tmb";
import { Card, Grid, Segment } from "semantic-ui-react";

const Genders = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [genders, setGenders] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then(({ data }) => setGenders(data.genres))
      .finally(() => setIsLoading(false));
  }, []);

  const handleClick = useCallback(
    (event, genderId) => {
      onClick(event, genderId);
    },
    [onClick]
  );

  if (isLoading) {
    return "The genders are loading";
  }

  if (!genders) {
    return "The genders are empty";
  }

  return (
    <Segment>
      <Grid>
        <Grid.Row columns={3}>
          {genders.map(({ id, name }) => (
            <Grid.Column key={id}>
              <Card color="red" onClick={(event) => handleClick(event, id)}>
                <Card.Content>
                  <Card.Header>{name}</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

Genders.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Genders;
