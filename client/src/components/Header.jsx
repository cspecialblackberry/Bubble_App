import { Link } from "react-router-dom";

export default function Header() {
    return (
      <>
        <Link to="/">
          <img className="logo" src="../public/bubble-app-logo.svg" alt="Bubble App" />
        </Link>
      </>
    );
  }
  