import { useState, useEffect } from "react";

const useFetch = ({ url }) => {
  const [data, setData] = useState([]);
  const [err, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => (response.status !== 200 ? [] : response.json()))
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
        return setError(err);
      })
      .finally(() => setLoading(false));
  }, [url]);
  return { employeeData: data, loading, err };
};

export default useFetch;
