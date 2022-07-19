import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled/macro";

const Container = styled("div")`
  max-width: 1200px;
  padding: 16px;
  width: 100%;
  margin: auto;
`;

const App = () => {
  return (
    <>
      <Link to="/characters">Characters</Link>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
