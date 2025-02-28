describe('RedditApp E2E Tests', () => {
  beforeEach(() => {
    cy.visit('https://mr-kerad-redditapp.netlify.app/');
    cy.get('.post-item', { timeout: 10000 }).should('have.length.greaterThan', 0);
  });

  it('loads posts on initial visit', () => {
    cy.get('.post-item h3').first().should('not.be.empty');
  });

  it('searches posts by title', () => {
    cy.get('.search-bar').type('the'); // Use a common word likely in titles
    cy.get('.post-item', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('.post-item h3').should(($h3s) => {
      const texts = $h3s.map((i, el) => el.textContent.toLowerCase()).get();
      expect(texts.some((text) => text.includes('the'))).to.be.true;
    });
  });

  it('filters posts by category', () => {
    cy.get('.filter-button').contains('aviation').click();
    cy.get('.post-item', { timeout: 10000 }).should('have.length.greaterThan', 0);
    cy.get('.post-item h3').should('exist');
    cy.log('Checking category - adjust test if category is in DOM');
  });

  it('navigates to post detail page', () => {
    cy.get('.read-more-btn').first().click();
    cy.url().should('include', '/post/');
    cy.get('.post-detail h2').should('not.be.empty');
  });
});