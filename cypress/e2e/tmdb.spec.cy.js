describe('The Movie Database (TMDb) End-to-End Testing', () => {
    beforeEach(() => {
        cy.session('tmdb-session', () => {
            cy.visit('/');
            cy.get('body').then(($body) => {
                if ($body.find('#onetrust-accept-btn-handler').length) {
                    cy.get('#onetrust-accept-btn-handler').click();
                }
            });
        });
    });

    it('should search for a movie on the website', () => {
        cy.visit('/');
        cy.get('body').then(($body) => {
            if ($body.find('#onetrust-accept-btn-handler').length) {
                cy.get('#onetrust-accept-btn-handler').click();
            }
        });
        cy.get('#inner_search_v4').type('Mission: Impossible{enter}');
        cy.get('.card', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('.card').first().should('contain', 'Mission: Impossible');
    });

    it('should fetch movie data from the API', () => {
        cy.request({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${Cypress.env('tmdbApiKey')}&query=Mission:%20Impossible`,
        }).then((response) => {
            expect(response.status).to.eq(200, 'API request should return 200');
            expect(response.body.results).to.have.length.greaterThan(0, 'API should return results');
            expect(response.body.results[0].title).to.include('Mission: Impossible', 'First result should be Mission: Impossible');
        });
    });

    it('should use API data to search and validate UI', () => {
        cy.request({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${Cypress.env('tmdbApiKey')}&query=Mission:%20Impossible`,
        }).then((response) => {
            expect(response.status).to.eq(200, 'API request should return 200');
            const movieTitle = response.body.results[0].title;
            cy.log(`Fetched movie title: ${movieTitle}`);

            cy.visit('/');
            cy.get('body').then(($body) => {
                if ($body.find('#onetrust-accept-btn-handler').length) {
                    cy.get('#onetrust-accept-btn-handler').click();
                }
            });
            cy.get('#inner_search_v4').type(`${movieTitle}{enter}`);
            cy.get('.card', { timeout: 10000 }).first().should('contain', movieTitle);
        });
    });

    it('should handle invalid movie search on UI', () => {
        cy.visit('/');
        // Accept cookies
        cy.get('body').then(($body) => {
            if ($body.find('#onetrust-accept-btn-handler').length) {
                cy.get('#onetrust-accept-btn-handler').click();
            }
        });
        cy.get('#inner_search_v4').type('InvalidMovie12345{enter}');
        cy.get('.card', { timeout: 10000 }).should('not.exist');
    });

    it('should handle invalid API key', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie?api_key=INVALID_KEY&query=Mission:%20Impossible',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401, 'Expected 401 for invalid API key');
        });
    });
});