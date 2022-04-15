import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Navbar, Nav, Col, Card, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
const axios = require("axios");

function App() {
  return (
    <Router>
      <Navbar expand="lg" variant="light" bg="dark">
        <Navbar.Brand />
        <Link to="/" style={({ color: "white" }, { bg: "dark" })}>
          Catstagram
        </Link>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<Feed />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}
function Feed() {
  const [breeds, setBreeds] = useState([]);
  const fetchData = () => {
    axios
      .get("https://api.thecatapi.com/v1/breeds")
      // .then((response) => {
      //   console.log(response);
      //   setBreeds(response.data);
      // })
      .then((response) => {
        console.log(response);
        setBreeds(
          response.data.filter((data) => {
            return data.image;
          })
        );
      })
      .catch((error) => {
        alert("error", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2>Feed</h2>
      <div>
        <Row>
          {breeds.map((breed) => {
            return <FeedCard key={breed.id} breed={breed} />;
          })}
        </Row>
      </div>
    </div>
  );
}
function FeedCard(props) {
  return (
    <Col sm={4}>
      <Card style={{ width: "100%", marginBottom: "20px" }}>
        <Card.Img variant="top" src={props.breed.image.url} />
        {/* {props.breed.image ? (
          <Card.Img variant="top" src={props.breed.image.url} />
        ) : (
          <Card.Img variant="top" src={""} />
        )} */}
        <Card.Body>
          <Card.Title>{props.breed.name}</Card.Title>
          <Card.Text>{props.breed.description}</Card.Text>
          <Link to={"/profile/" + props.breed.id}>Profile</Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Profile() {
  const urlParams = useParams();
  const [images, setImage] = useState([]);
  const fetchData = () => {
    axios
      .get(
        "https://api.thecatapi.com/v1/images/search?breed_id=" +
          urlParams.id +
          "&limit=5"
      )
      .then((response) => {
        console.log(response);
        setImage(response.data);
      })
      .catch((error) => {
        alert("error", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {console.log(images)}
      <h2>{urlParams.id} Profile</h2>
      {images.map((image) => (
        <img src={image.url} />
      ))}
    </div>
  );
}

export default App;
