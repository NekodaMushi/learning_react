import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>WorldWise</h1>
      <Link to="/pricing">Pricing</Link>
    </div>
  );
}

export default HomePage;
