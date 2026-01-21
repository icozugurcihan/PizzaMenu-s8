import "../styles/header.css";

export default function Header() {
  return (
    <header className="app-header">
      <h1 className="app-logo">Teknolojik Yemekler</h1>
      <p className="breadcrumb">
        Anasayfa <span>-</span> <strong>Sipariş Oluştur</strong>
      </p>
    </header>
  );
}
