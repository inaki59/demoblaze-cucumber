class Inventory{
    constructor(){

    }
    visit() {
        cy.visit('https://demoblaze.com');
      }
      selectSamsung(itemName){
        cy.wait(100)
        cy.contains('.card-title a', itemName).click();
      }
      espectedProduct(name){
        cy.wait(200)
        cy.url().should('include', 'prod.html?idp_');
        cy.contains('.name', name).should('be.visible');
      }
      filterByCategory(category) {
        cy.contains('.list-group-item', category).click();
        cy.wait(100)
      }
      verifyItemsInCategory(category) {
        cy.get('.card-title').each(($el) => {
          cy.wrap($el).should('be.visible'); 
        });
      }
      addItemToCart(item) {
        cy.contains('.hrefch', item).click();
        cy.contains('Add to cart').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Product added');
          cy.window().then((win) => {
            win.alert = () => {}; 
          });
        });
        cy.get('.nav-link').contains('Home').click(); 
      }
      proceedToCheckout() {
        cy.get('#cartur').click();
        cy.contains('Place Order').click();
        cy.get('#name').clear().focus().type('John Doe');
        cy.get('#country').clear().focus().type('USA');
        cy.get('#city').clear().focus().type('New York');
        cy.get('#card').clear().focus().type('1234567812345678');
        cy.get('#month').clear().focus().type('12');
        cy.get('#year').clear().focus().type('2024');
        cy.contains('Purchase').click();
      }
      verifyOrderConfirmation() {
        cy.contains('Thank you for your purchase!').should('be.visible'); 
      }
    
}
module.exports=new Inventory();