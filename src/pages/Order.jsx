import { useState } from "react";
import "../styles/order.css";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";

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

export default function Order() {
  const [formData, setFormData] = useState({
    isim: "",
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

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!isFormValid) return;

  console.log("Sipariş gönderildi:", formData);

  history.push("/success");
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

  return (
    <>
    <Header/>
    <main className="order">
      <h2>Position Absolute Acı Pizza</h2>
      <p className="price">85.50₺</p>

      <p className="description">
        Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
        pizzadan sana göre. Pizza, domates, peynirle geliştirici malzemelerle
        hazırlanmıştır.
      </p>

      <form onSubmit={handleSubmit}>
        {/* BOYUT */}
        <section>
          <h4>Boyut Seç *</h4>
          {["Küçük", "Orta", "Büyük"].map((boyut) => (
            <label key={boyut}>
              <input
                type="radio"
                name="boyut"
                value={boyut}
                checked={formData.boyut === boyut}
                onChange={handleChange}
              />
              {boyut}
            </label>
          ))}
        </section>

        {/* HAMUR */}
        <section>
          <h4>Hamur Seç *</h4>
          <select name="hamur" value={formData.hamur} onChange={handleChange}>
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

        {/* ÖZET */}
        <section className="summary">
          <p>Seçimler: {formData.malzemeler.length * 5}₺</p>
          <p className="total">Toplam: {85.5 * formData.adet}₺</p>
        </section>

        <button
            className="submit"
            type="submit"
            disabled={!isFormValid}
        >
            SİPARİŞ VER
        </button>

      </form>
    </main>
    </>
  );
}
