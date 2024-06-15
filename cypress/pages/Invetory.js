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
      checkPrice(){
        cy.get('#cartur').click();
        cy.get('#tbodyid').should('be.visible');
        cy.get('#totalp').should('be.visible');
        let sum = 0;
        cy.get('#tbodyid tr').should('have.length', 2);
        cy.get('#tbodyid tr').each(($row) => {
          cy.wrap($row).should('be.visible');
          cy.wrap($row).find('td:nth-child(3)').invoke('text').then((price) => {
            sum += parseFloat(price);
          });
        }).then(() => {
          cy.get('#totalp').invoke('text').then((total) => {
            const totalValue = parseFloat(total);
            expect(sum).to.equal(totalValue);
          });
        });
      }
      proceedToCheckout() {
        cy.contains('Place Order').click();
        cy.get('#name').clear().focus().type('John Doe');
        cy.get('#country').clear().focus().type('USA');
        cy.get('#city').clear().focus().type('New York');
        cy.get('#card').clear().focus().type('1234567812345678');
        cy.get('#month').clear().focus().type('12');
        cy.get('#year').clear().focus().type('2024');
        cy.contains('Purchase').should("be.visible").click();
        cy.contains('Thank you for your purchase!').should('be.visible'); 
       
        cy.contains('button', 'OK').should('be.visible').and('not.be.disabled').click();

      }
      cardEmpty(){
        cy.get('#cartur').should("be.visible").click();
        cy.get('.table-responsive').should('be.visible');
        cy.get('#tbodyid tr').should('have.length', 0);
      }
      verifyOrderConfirmation() {
        //cy.contains('Thank you for your purchase!').should('be.visible'); 
      }
    
}
module.exports=new Inventory();