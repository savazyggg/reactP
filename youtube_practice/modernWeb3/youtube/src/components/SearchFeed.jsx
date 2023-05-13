import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchFormAPI } from "../utils/fetchFormAPI";
import { Video } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFormAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchTerm]);
  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" md={2} sx={{ color: "white" }}>
        Search Results for:
        <span style={{ color: "#F31503" }}> {searchTerm}</span> videos
      </Typography>
      <Video videos={videos} />
    </Box>
  );
};

export default SearchFeed;
