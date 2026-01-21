import "../styles/success.css";
import logo from "../assets/logo.svg";

export default function Success() {
  return (
    <main className="success">
      <img
        src={logo}
        alt="Teknolojik Yemekler"
        className="success-logo"
      />

      <h1 className="success-title">
        TEBRİKLER! <br />
        SİPARİŞİNİZ ALINDI!
      </h1>
    </main>
  );
}
