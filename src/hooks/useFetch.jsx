import { useState, useEffect } from "react";

const useFetch = async (apiUrl, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(loading);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`❌ HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, options]);

  return { data, loading, error };
};

export default useFetch;
