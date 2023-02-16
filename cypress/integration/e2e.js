/// <reference types="cypress" />

import todoApp from "../support/page-object/pom"



describe("E2E - Todo App", () => {

    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/index.html")
    })

    it("Should add one task", () => {
        todoApp.mainInput.type("Learn JavaScript {enter}");
        cy.get(".list-group-item").eq(0).should('contain', 'Learn JavaScript');
    })

    it("Should add two tasks", () => {
        todoApp.mainInput.type("Learn JavaScript {enter}");
        todoApp.mainInput.type("Learn Python {enter}");
        cy.get(".list-group-item").eq(0).should('contain', 'Learn JavaScript');
        cy.get(".list-group-item").eq(1).should('contain', 'Learn Python');


    })

    it("Should mark the first task out of 2 as a completed", () => {
        todoApp.mainInput.type("Learn JavaScript {enter}");
        todoApp.mainInput.type("Learn Python {enter}");
        cy.get(".done-button").first().click();
        const newDiv = cy.get(".new-div").first();
        newDiv.should('have.class', 'completed');
        newDiv.get("li").first().should('contain', 'Learn JavaScript');
    })

    it("Should mark two tasks as completed", () => {
        todoApp.mainInput.type("Learn JavaScript {enter}");
        todoApp.mainInput.type("Learn Python {enter}");
        todoApp.doneButton.eq(0).check()
        todoApp.doneButton.eq(1).check();
        todoApp.doneButton.should('be.checked');
        todoApp.doneButton.eq(1).should('be.checked')

    })

    it("Should remove one task", () => {
        todoApp.mainInput.type("Learn JavaScript {enter}");
        todoApp.mainInput.type("Learn Python {enter}");
        cy.get(".delete-button").first().click();
        cy.contains("Learn JavaScript").should('not.exist');

    })

    it("Should check if the id of a task is right after refreshing the page", () => {
        todoApp.mainInput.type("Learn JavaScript {enter}");
        todoApp.mainInput.type("Learn Python {enter}");
        cy.reload();
        cy.contains("Learn JavaScript").parent().should('have.id', '0');
        cy.contains("Learn Python").parent().should('have.id', '1')
    })

    it("Should check if you can add an empty todo", () => {
        cy.get("#addNewTodo").click();
        cy.on("window:alert", text => {
            expect(text).to.equal("Input field is empty")
        })
    })
    it("Should check if todo has changed after edit", () => {
        todoApp.mainInput.type("Learn JavaScript {enter}");
        cy.get(".list-group-item").click();
        cy.get(".edit-input").clear().type("Learn Selenium {enter}");
        cy.contains("Learn Selenium").should('be.visible')
    })

    it("Should check if the id of the task is correct after deleting middle todo", () => {
        todoApp.mainInput.type("Learn JavaScript {enter}");
        todoApp.mainInput.type("Learn Python {enter}");
        todoApp.mainInput.type("Learn Selenium {enter}");
        cy.get(".delete-button").eq(1).click();
        cy.contains("Learn JavaScript").parent().should('have.id', '0');
        cy.contains("Learn Selenium").parent().should('have.id', '1')
    })

    it("Should check if after refreshing the page, all todos are the same as before refreshing", () => {
        todoApp.mainInput.type("Learn JavaScript {enter}");
        todoApp.mainInput.type("Learn Python {enter}");
        cy.reload();
        cy.contains("Learn JavaScript").should('be.visible');
        cy.contains("Learn Python").should('be.visible')
    })

})

