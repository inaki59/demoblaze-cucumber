class Homepage {
    constructor(){

    }
    visit() {
      cy.visit('https://demoblaze.com');
    }
  
    openSignUp() {
      cy.get('#signin2').click();
    }
    registerEmpty(){
      cy.get('#sign-username').type(" ");   
          cy.get('#sign-password').type(" "); 
          cy.get('.modal-footer .btn-primary').contains('Sign up').click();
    }
    loadUserExisting(){
      cy.fixture("users").then((userData)=>{
        //nos los pilla bien
        this.password=userData.existingUser.password 
        this.username=userData.existingUser.username   
        cy.wait(300)
      })
    }
    registerExistingUser(){
      cy.get('#sign-username').type("admin");   
      cy.get('#sign-password').type("admin"); 
      cy.get('.modal-footer .btn-primary').contains('Sign up').click();
      
    }
    openLogin() {
      cy.get('#login2').click();
    }
    createUser(){
      cy.fixture("users").then((userData)=>{
       this.username=`${userData.newUser.username}${ Math.floor(1000 + Math.random() * 9000)}`;   
       cy.wait(300)
      })
    }
    register() {
        cy.fixture("users").then((userData)=>{
          cy.get('#sign-username').clear().focus().type(this.username,{ delay: 100 });   
          cy.get('#sign-password').type(userData.newUser.password,{ delay: 100 }); 
          cy.get('.modal-footer .btn-primary').contains('Sign up').click();

        })
    }
    loginUser(username, password){

      cy.get('#loginusername').clear().focus().type(username, { delay: 200 });
      cy.get('#loginpassword').clear().focus().type(password, { delay: 200 });
      cy.wait(100)
      
  }
  loginIncomplete(username){
    cy.get('#loginusername').clear().focus().type(username, { delay: 100 });
}
  clickToLogin(){
    cy.get('button[onclick="logIn()"]').click();
  }
  logout(){
    cy.get("#logout2").click()
  }
  loginValidator(){
    cy.wait(200)
    cy.get("#nameofuser").should('be.visible');
  }
  validateLogout(){
    cy.get("#nameofuser").should('not.be.visible');

  }
  filterByCategory(category) {
    cy.contains('.list-group-item', category).click();
  }


  verifyItemsFromCategory(category) {
    cy.get('.card-title').each(($el) => {
      cy.wrap($el).parent().parent().find('.card-block').invoke('text').then((text) => {
        cy.wrap($el).should('contain.text', category);
      });
    });
  }

  verifyAlertMessage(expectedMessage) {
    cy.on('window:alert', (str) => {
      expect(str).to.equal(expectedMessage);
    });
  }
  }
  
module.exports=new Homepage();
  