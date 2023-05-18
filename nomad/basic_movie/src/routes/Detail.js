import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const [detail, setDetail] = useState([]);
  const [stateCheck, setStateCheck] = useState(false);
  const { id } = useParams();

  async function fetchDetail() {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const body = await response.json();
    console.log(body.data.movie);
    setDetail(body.data.movie);
  }

  useEffect(() => {
    setStateCheck(true);
    fetchDetail();
  }, []);
  console.log(detail);
  return (
    <div>
      <h1>detail</h1>
      {stateCheck && (
        <div>
          <img src={detail.medium_cover_image} alt={detail.title}></img>
        </div>
      )}
    </div>
  );
};

export default Detail;
