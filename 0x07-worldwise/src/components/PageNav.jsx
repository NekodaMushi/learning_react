import { Link } from "react-router-dom";

function PageNav() {
  const test = 2;
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product">Home</Link>
        </li>
        <li>
          <Link to="/pricing">Home</Link>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
