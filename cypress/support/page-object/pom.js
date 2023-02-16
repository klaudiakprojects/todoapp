class todoApp {
    get mainInput() {
        return cy.get(".form-control");
    }

    get doneButton() {
        return cy.get(".done-button");
    }

}

export default new todoApp();