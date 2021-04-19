import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = "YOUR_TOKEN_HERE";

const TMBContext = createContext(null);

export const TMBProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/authentication/token/new`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then(({ data }) => setToken(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <TMBContext.Provider
      value={{
        token,
        isLoading,
      }}
    >
      {children}
    </TMBContext.Provider>
  );
};

TMBProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGenderMovie = (options = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [genders, setGenders] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          ...options,
        },
      })
      .then(({ data }) => setGenders(data.genres))
      .finally(() => setIsLoading(false));
  }, [options]);

  return {
    isLoading,
    genders,
  };
};

export default TMBContext;
