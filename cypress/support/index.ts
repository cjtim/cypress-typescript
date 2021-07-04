// load type definitions that come with Cypress module
/// <reference types="cypress" />

import { Message, Profile } from "@line/bot-sdk/dist/types";
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Mockup Line login
             */
            lineLogin(): void;
        }
    }
}

Cypress.Commands.add("lineLogin", () => {
    cy.visit(Cypress.config("baseUrl") as string, {
        onBeforeLoad: (window: any) => {
            const profile: Profile = {
                displayName: "mockDisplayName",
                userId: "[mock]U1234567890",
                pictureUrl:
                    "https://ourfunnylittlesite.com/wp-content/uploads/2018/07/1-4-696x696.jpg",
                statusMessage: "liff is controlled by Cypress",
            };

            const openWindowMock = (params: any) => {
                expect(params).to.have.property("url");
            };
            const sendMessagesMock = (messages: Message[]) => {
                expect(messages.length).to.eq(1);
            };
            window.Cypress.liffMock = {
                init: cy.stub().as("init").resolves(),
                isLoggedIn: cy.stub().as("isLoggedIn").returns(true),
                getProfile: cy.stub().as("getProfile").resolves(profile),
                isInClient: cy.stub().as("isInClient").returns(true),
                getOS: cy.stub().as("getOS").returns("web"),
                getLanguage: cy
                    .stub()
                    .as("getLanguage")
                    .returns(navigator.language),
                getVersion: cy.stub().as("getVersion").returns("9999"),
                getFriendship: cy.stub().as("getFriendship").resolves({
                    friendFlag: true,
                }),
                openWindow: cy
                    .stub()
                    .as("openWindow")
                    .callsFake(openWindowMock),
                sendMessages: cy
                    .stub()
                    .as("sendMessages")
                    .callsFake(sendMessagesMock),
                getAccessToken: cy
                    .stub()
                    .as("getAccessToken")
                    .returns("myAccessToken"),
                getDecodedIDToken: cy
                    .stub()
                    .as("getDecodedIDToken")
                    .resolves({
                        iss: "https://access.line.me",
                        sub: "U1234567890abcdef1234567890abcdef ",
                        aud: "1234567890",
                        exp: 1504169092,
                        iat: 1504263657,
                        nonce: "0987654asdf",
                        amr: ["pwd"],
                        name: "Taro Line",
                        picture: "https://sample_line.me/aBcdefg123456",
                    }),
            };
        },
    });
});
