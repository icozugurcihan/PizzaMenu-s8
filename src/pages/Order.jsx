import { useState } from "react";
import "../styles/order.css";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";
import axios from "axios";

const malzemelerListesi = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Jalapeno",
  "Sarımsak",
  "Biber",
  "Ananas",
  "Kabak",
];

const BASE_PRICE = 85.5;
const EXTRA_PRICE = 5;

export default function Order({ setOrder }) {
  const [formData, setFormData] = useState({
    boyut: "",
    hamur: "",
    malzemeler: [],
    notlar: "",
    adet: 1,
  });

  const history = useHistory();

  const isFormValid =
    formData.boyut &&
    formData.hamur &&
    formData.malzemeler.length >= 4 &&
    formData.malzemeler.length <= 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMalzemeChange = (malzeme) => {
    setFormData((prev) => {
      const secili = prev.malzemeler.includes(malzeme);
      return {
        ...prev,
        malzemeler: secili
          ? prev.malzemeler.filter((m) => m !== malzeme)
          : [...prev.malzemeler, malzeme],
      };
    });
  };

  const adetAzalt = () => {
    if (formData.adet > 1) {
      setFormData({ ...formData, adet: formData.adet - 1 });
    }
  };

  const adetArtir = () => {
    setFormData({ ...formData, adet: formData.adet + 1 });
  };

  const toplamFiyat =
    (BASE_PRICE + formData.malzemeler.length * EXTRA_PRICE) *
    formData.adet;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const payload = {
      boyut: formData.boyut,
      hamur: formData.hamur,
      malzemeler: formData.malzemeler,
      notlar: formData.notlar,
      adet: formData.adet,
      toplamFiyat,
    };

    try {
      const response = await axios.post(
        "https://reqres.in/api/pizza",
        payload,
        {
          headers: { "x-api-key": "reqres-free-v1" },
        }
      );

      setOrder(response.data);
      history.push("/success");
    } catch (error) {
      const fallbackOrder = {
        ...payload,
        id: "offline-order",
        createdAt: new Date().toISOString(),
      };

      setOrder(fallbackOrder);
      history.push("/success");
    }
  };

  return (
    <>
      <Header />

      <main className="order">
        <h2>Position Absolute Acı Pizza</h2>
        <p className="price">{BASE_PRICE}₺</p>

        <p className="description">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizzadan sana göre. Pizza, domates, peynirle geliştirici malzemelerle
          hazırlanmıştır.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="order-layout">
            {/* SOL FORM */}
            <div className="order-form">
              {/* BOYUT */}
              <section>
                <h4>Boyut Seç *</h4>
                <div className="size-options">
                  {[
                    { label: "S", value: "Küçük" },
                    { label: "M", value: "Orta" },
                    { label: "L", value: "Büyük" },
                  ].map((b) => (
                    <label
                      key={b.value}
                      className={`size-btn ${
                        formData.boyut === b.value ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="boyut"
                        value={b.value}
                        checked={formData.boyut === b.value}
                        onChange={handleChange}
                      />
                      {b.label}
                    </label>
                  ))}
                </div>
              </section>

              {/* HAMUR */}
              <section>
                <h4>Hamur Seç *</h4>
                <select
                  name="hamur"
                  value={formData.hamur}
                  onChange={handleChange}
                >
                  <option value="">Hamur Kalınlığı</option>
                  <option value="İnce">İnce</option>
                  <option value="Orta">Orta</option>
                  <option value="Kalın">Kalın</option>
                </select>
              </section>

              {/* MALZEMELER */}
              <section>
                <h4>Ek Malzemeler</h4>
                <p>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>

                <div className="ingredients">
                  {malzemelerListesi.map((malzeme) => (
                    <label key={malzeme}>
                      <input
                        type="checkbox"
                        checked={formData.malzemeler.includes(malzeme)}
                        onChange={() => handleMalzemeChange(malzeme)}
                      />
                      {malzeme}
                    </label>
                  ))}
                </div>
              </section>

              {/* NOT */}
              <section>
                <h4>Sipariş Notu</h4>
                <textarea
                  name="notlar"
                  placeholder="Siparişine eklemek istediğin bir not var mı?"
                  value={formData.notlar}
                  onChange={handleChange}
                />
              </section>

              {/* ADET */}
              <section className="quantity">
                <button type="button" onClick={adetAzalt}>-</button>
                <span>{formData.adet}</span>
                <button type="button" onClick={adetArtir}>+</button>
              </section>
            </div>

            {/* SAĞ ÖZET */}
            <div className="order-summary-box">
              <h4>Sipariş Toplamı</h4>

              <p>
                Seçimler:{" "}
                <strong>
                  {formData.malzemeler.length * EXTRA_PRICE}₺
                </strong>
              </p>

              <p className="total">
                Toplam: <strong>{toplamFiyat}₺</strong>
              </p>

              <button
                className="submit"
                type="submit"
                disabled={!isFormValid}
              >
                SİPARİŞ VER
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
