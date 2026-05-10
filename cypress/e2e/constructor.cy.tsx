describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.education-services.ru/api/ingredients', {
      body: { success: true, data: require('../fixtures/ingredients.json') }
    }).as('getIngredients');
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
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
    });

    it('должен закрываться по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('должен закрываться по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://norma.education-services.ru/api/auth/user', {
        body: require('../fixtures/user.json')
      }).as('getUser');
      cy.intercept('POST', 'https://norma.education-services.ru/api/orders', {
        body: require('../fixtures/order.json')
      }).as('createOrder');

      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      });
      cy.setCookie('accessToken', 'test-access-token');
    });

    afterEach(() => {
      cy.window().then((win) => {
        win.localStorage.removeItem('refreshToken');
      });
      cy.clearCookie('accessToken');
    });

    it('должен оформлять заказ и показывать номер заказа', () => {
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

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '12345');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
});
