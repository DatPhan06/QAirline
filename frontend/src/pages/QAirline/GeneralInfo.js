import React, { useEffect, useState } from "react";
import axios from "axios";

const GeneralInfo = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/general-info`
        );
        setInfo(response.data);
      } catch (error) {
        console.error("Error fetching general info:", error);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div>
      <h1>Thông Tin Chung</h1>
      <ul>
        {info.map((item) => (
          <li key={item.info_id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneralInfo;
