import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const CLIENT_ID = "be61349678ae49f6805a60ce294514c3";
const CLIENT_SECRET = "1fbddfbea56140c9883b75ee81ca0911";

function App() {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    //api access token
    var authParameters = {
      method: "POST",
      headeers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="search for artist"
            type="input"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                console.log("press enter");
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={() => console.log("hi")}>Search</Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
          <Card>
            <Card.Img src="#" />
            <Card.Body>
              <Card.Title>album</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
