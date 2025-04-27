describe('The Movie Database (TMDb) End-to-End Testing', () => {
    const SEARCH_MOVIE = 'Mission: Impossible';
    const invalidMovie = 'InvalidMovie12345';


    beforeEach(() => {
        cy.session('tmdb-session', () => {
            cy.visit('/');
            cy.get('body').then(($body) => {
                if ($body.find('#onetrust-accept-btn-handler').length) {
                    cy.get('#onetrust-accept-btn-handler').click();
                    cy.log('Accepted cookie consent');
                }
            });
        });
    });

    it('should search for a movie on the website', () => {
        cy.visit('/');
        cy.get('body').then(($body) => {
            if ($body.find('#onetrust-accept-btn-handler').length) {
                cy.get('#onetrust-accept-btn-handler').click();
                cy.log('Accepted cookie consent in test');
            }
        });
        cy.log(`Searching for movie: ${SEARCH_MOVIE}`);
        cy.get('#inner_search_v4').type(`${SEARCH_MOVIE}{enter}`);
        cy.get('.card', { timeout: 10000 }).should('have.length.greaterThan', 0);
        cy.get('.card').first().should('contain', SEARCH_MOVIE);
    });

    it('should fetch movie data from the API', () => {
        cy.log(`Making API request for: ${SEARCH_MOVIE}`);
        cy.request({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${Cypress.env('tmdbApiKey')}&query=${encodeURIComponent(SEARCH_MOVIE)}`,
        }).then((response) => {
            expect(response.status).to.eq(200, 'API request should return 200');
            expect(response.body.results).to.have.length.greaterThan(0, 'API should return results');
            expect(response.body.results[0].title).to.include(SEARCH_MOVIE, 'First result should be Mission: Impossible');
            cy.log(`API returned ${response.body.results.length} results`);
        });
    });

    it('should use API data to search and validate UI', () => {
        cy.log(`Fetching API data for: ${SEARCH_MOVIE}`);
        cy.request({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${Cypress.env('tmdbApiKey')}&query=${encodeURIComponent(SEARCH_MOVIE)}`,
        }).then((response) => {
            expect(response.status).to.eq(200, 'API request should return 200');
            const movieTitle = response.body.results[0].title;
            cy.log(`Fetched movie title: ${movieTitle}`);

            cy.visit('/');
            cy.get('body').then(($body) => {
                if ($body.find('#onetrust-accept-btn-handler').length) {
                    cy.get('#onetrust-accept-btn-handler').click();
                    cy.log('Accepted cookie consent in API test');
                }
            });
            cy.log(`Searching UI for: ${movieTitle}`);
            cy.get('#inner_search_v4').type(`${movieTitle}{enter}`);
            cy.get('.card', { timeout: 10000 }).first().should('contain', movieTitle);
        });
    });

    it('should handle invalid movie search on UI', () => {
        cy.visit('/');
        cy.get('body').then(($body) => {
            if ($body.find('#onetrust-accept-btn-handler').length) {
                cy.get('#onetrust-accept-btn-handler').click();
                cy.log('Accepted cookie consent for invalid search');
            }
        });
        cy.log(`Searching for invalid movie: ${invalidMovie}`);
        cy.get('#inner_search_v4').type(`${invalidMovie}{enter}`);
        cy.get('.card', { timeout: 10000 }).should('not.exist');
    });

    it('should handle invalid API key', () => {
        cy.log('Testing invalid API key');
        cy.request({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/movie?api_key=INVALID_KEY&query=${encodeURIComponent(SEARCH_MOVIE)}`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401, 'Expected 401 for invalid API key');
            cy.log('Invalid API key test completed');
        });
    });
});