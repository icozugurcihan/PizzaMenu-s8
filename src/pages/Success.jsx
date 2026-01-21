import "../styles/success.css";
import logo from "../assets/logo.svg";

export default function Success({ order }) {
  if (!order) {
    return (
      <main className="success">
        <h2>Henüz bir sipariş yok</h2>
      </main>
    );
  }

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

      <div className="order-summary">
        <p><strong>Boyut:</strong> {order.boyut}</p>
        <p><strong>Hamur:</strong> {order.hamur}</p>
        <p><strong>Malzemeler:</strong></p>
        <ul>
          {order.malzemeler.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
