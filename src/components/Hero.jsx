import { Link } from "react-router-dom";
import "../styles/hero.css";
import logo from "../assets/logo.svg";

export default function Hero() {
  return (
    <section className="hero">
      <header className="hero-header">
        <img
                src={logo}
                alt="Teknolojik Yemekler"
                className="success-logo"
              />
      </header>

      <div className="hero-content">
        <h1>
          KOD ACIKTIRIR <br />
          PİZZA, DOYURUR
        </h1>

        <Link to="/order">
          <button className="hero-button">ACIKTIM</button>
        </Link>
      </div>
    </section>
  );
}
