describe('The Movie Database (TMDb) Login Test', () => {

    beforeEach(() => {
        cy.visit('/login');
    });

    it('should successfully log in with valid credentials', () => {
        cy.get('input#username')
            .should('be.visible')
            .type('hamza2888260');

        cy.get('input#password')
            .should('be.visible')
            .type('hamza2888260');

        cy.get('input#login_button')
            .should('be.visible')
            .click();

        cy.url().should('not.include', '/login');

        cy.get('body').then(($body) => {
            if ($body.find('.avatar').length) {
                cy.get('.avatar').should('be.visible');
                cy.log('Login successful, avatar found.');
            } else {
                cy.log('Login may have CAPTCHA protection.');
            }
        });
    });

});
