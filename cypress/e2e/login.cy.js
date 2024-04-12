describe('bookApp', () => {
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

  describe('Добавление книг', () => {
    beforeEach(() => {
      cy.login('bropet@mail.ru', '123')
      cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible')
    })
  
    it('Добавить новую книгу и разместить в "Избранное"', () => {      
      cy.addNewBook('Горе от ума', 'Комедия', 'А. С. Грибоедов')
      cy.contains('Горе от ума').should('be.visible')
      cy.contains('Горе от ума').contains('Add to favorite').click()
      cy.get('h4').click()
      cy.contains('Горе от ума').should('be.visible')
    })
  
    it('Добавить новую книгу в "Избранное"', () => {      
      cy.addNewBook_favorite('Преступление и наказание', 'Роман', 'Ф. М. Достоевский')
      cy.contains('Преступление и наказание').should('be.visible')
    })
  
    it('Показать книги из раздела "Избранное"', () => {     
      cy.addNewBook_favorite('А зори здесь тихие', 'Повесть', 'Б. Л. Васильев')
      cy.contains('А зори здесь тихие').should('be.visible')
      cy.get('h4').click()
      cy.contains('А зори здесь тихие').contains('Delete from favorite').should('be.visible')
    })
  
    it('Удалить книгу из раздела "Избранное"', () => {     
      cy.addNewBook_favorite('Что делать?', 'Роман', 'Н. Г. Чернышевский')
      cy.get('h4').click()
      cy.contains('Что делать?').should('be.visible')
      cy.contains('Что делать?').contains('Delete from favorite').click()
      cy.contains('Что делать?').should('not.exist')
      cy.contains('Books list').click()
      cy.contains('Что делать?').should('be.visible')
    })
  })
})
