describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      body: { success: true, data: require('../fixtures/ingredients.json') }
    }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', {
      body: require('../fixtures/user.json')
    }).as('getUser');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавлять булку в конструктор', () => {
      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .click();
      cy.get('[data-cy="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i'
      );
    });

    it('должен добавлять начинку в конструктор', () => {
      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .click();
      cy.get('[data-cy="constructor-ingredients"]').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('должен открываться при клике на ингредиент', () => {
      cy.contains('Краторная булка N-200i').as('bun').click();
      cy.get('[data-cy="modal"]').should('be.visible').and('contain', 'Краторная булка N-200i');
    });

    it('должен закрываться по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('@modal').should('not.exist');
    });

    it('должен закрываться по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/api/orders', {
        body: require('../fixtures/order.json')
      }).as('createOrder');

      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      });
      cy.setCookie('accessToken', 'test-access-token');

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      cy.window().then((win) => {
        win.localStorage.removeItem('refreshToken');
      });
      cy.clearCookie('accessToken');
    });

    it('должен оформлять заказ, показывать номер и очищать конструктор', () => {
      cy.contains('Краторная булка N-200i')
        .closest('li')
        .find('button')
        .click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('li')
        .find('button')
        .click();

      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').as('modal').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '12345');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('@modal').should('not.exist');

      cy.contains('Выберите булки').should('be.visible');
      cy.get('[data-cy="constructor-ingredients"]').should(
        'contain',
        'Выберите начинку'
      );
    });
  });
});
