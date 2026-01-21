describe("Teknolojik Yemekler - Sipariş Formu", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/order");
  });

 it("pizza boyutu seçilebiliyor", () => {
  cy.contains("Orta").click();
  cy.get('input[type="radio"]:checked').should("exist");
});


it("en az 4 malzeme seçilebiliyor", () => {
  cy.contains("Pepperoni").click();
  cy.contains("Sosis").click();
  cy.contains("Mısır").click();
  cy.contains("Soğan").click();

  cy.get('input[type="checkbox"]:checked').should("have.length.at.least", 4);
});

it("form eksikken sipariş verilemez", () => {
  cy.contains("SİPARİŞ VER").should("be.disabled");

  cy.contains("Orta").click();
  cy.contains("SİPARİŞ VER").should("be.disabled");
});

});
