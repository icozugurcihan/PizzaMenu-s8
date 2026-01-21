import "../styles/header.css";
import logo from "../assets/logo.svg";
export default function Header() {
  return (
    <header className="app-header">
      <img
              src={logo}
              alt="Teknolojik Yemekler"
              className="success-logo"
            />
      <p className="breadcrumb">
        Anasayfa <span>-</span> <strong>Sipariş Oluştur</strong>
      </p>
    </header>
  );
}
