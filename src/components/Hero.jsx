import { Link } from "react-router-dom";
import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <header className="hero-header">
        <h3 className="logo">Teknolojik Yemekler</h3>
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
