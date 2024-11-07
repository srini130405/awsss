describe('Check if button is present inside the live preview div', () => {
    it('should find a button with the text "Press here"', () => {
      // Visit the main app (assuming it's running on localhost)
      cy.visit('http://localhost:5173'); // Update this URL to match your app's URL
  
      // Wait for the div to be populated with content
      cy.get('#preview-div') // Target the div where your preview content is rendered
        .should('be.visible') // Ensure the div is visible
        .within(() => {
          // Look for the button inside the div
          cy.contains('button', 'Press here') // Check if the button contains the text
            .should('exist'); // Assert the button exists
        });
    });
  });
  