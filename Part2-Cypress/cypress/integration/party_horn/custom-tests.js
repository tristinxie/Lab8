describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then(($el) => {
      expect($el).to.have.value(75);
    })
  })

  it('Volume input changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(33);
    })
  })

  it('Volume of audio changes when slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.prop('volume', 0.33);
    })
  })

  it('Sources change when selected radio button changes', () => {
    cy.get('#radio-party-horn').click();
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.attr('src', './assets/media/audio/party-horn.mp3');
    })

    cy.get('#sound-image').then(($el) => {
      expect($el).to.have.attr('src', './assets/media/images/party-horn.svg');
    })
  })

  it('Volume images changes when increasing volume', () => {
    for(let i = 0; i < 101; ++i){
      cy.get('#volume-slider').invoke('val', i).trigger('input');
      cy.get('#volume-image').then(($el) => {
      switch(i){
        case 0:
          expect($el).to.have.attr('src', './assets/media/icons/volume-level-0.svg');
          break;
        case 1:
          expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg');
          break;
        case 34:
          expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg');
          break;
        case 67:
          expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg');
      }
      })
    }
  })

  it('Disable honk if input empty or nonnumber', () => {
    cy.get('#volume-number').clear();
    cy.get('#honk-btn').then(($el) => {
      expect($el).to.have.attr('disabled')
    })
    cy.get('#volume-number').clear().type('e');
    cy.get('#honk-btn').then(($el) => {
      expect($el).to.have.attr('disabled')
    })
  })

  it('Error is shown when number ourside range for input', () => {
    cy.get('#volume-number').clear().type(100);
    cy.get('input:invalid').should('have.length', 0);

    cy.get('#volume-number').clear().type(200);
    cy.get('input:invalid').should('have.length', 1);
  })
});
