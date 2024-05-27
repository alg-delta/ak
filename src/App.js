import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";

import Header from "./components/Header";

import data from "./data";

function App() {
  return (
    <Row>
      <Col md={8}>
        <Header products={data} />
      </Col>
    </Row>
  );
}

export default App;
