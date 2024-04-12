describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Нормальный вход', () => {
    cy.login("bropet@mail.ru", "123")
    cy.contains('Добро пожаловать').should('be.visible')
  })

  it('Пустой логин', () => {
    cy.login(null, "123")
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.")
    })
  })

  it('Пустой пароль', () => {
    cy.login("bropet@mail.ru", null)
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.")
    })
  })
})