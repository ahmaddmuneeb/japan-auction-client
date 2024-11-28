import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCount, setCount } from "../redux/slices/counterSlice";

const useFetchData = () => {
  const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
const apiUrl = process.env.REACT_APP_URL;
  const headers = {
    "api-key": apiSecretKey,
  };

  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  useEffect(() => {
    if (count === 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const countResponse = await axios.get(`${apiUrl}/vehicles/count`, {
        headers,
      });
      const totalCount = countResponse.data.count;

      dispatch(setCount(totalCount));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export default useFetchData;
