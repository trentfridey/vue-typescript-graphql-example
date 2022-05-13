// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req, operationName) => {
  const { body } = req;
  return (
    // eslint-disable-next-line no-prototype-builtins
    body.hasOwnProperty("operationName") && body.operationName === operationName
  );
};

// Alias query if operationName matches
export const aliasQuery = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

// Alias mutation if operationName matches
export const aliasMutation = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    console.log(req);
    req.alias = `gql${operationName}Mutation`;
  }
};

context("Tests", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      // Queries
      aliasQuery(req, "GetAllPokemon");
      aliasQuery(req, "GetAllPokemonTypes");
      // Mutations
      aliasMutation(req, "favoritePokemon");
      aliasMutation(req, "unFavoritePokemon");
    });
  });

  describe("Initialization", () => {
    it("loads all 151 pokemon into a list", () => {
      cy.visit("/");
      cy.get(".list-item").should("have.length", 151);
    });
  });

  describe("Searching", () => {
    it("searches for Pikachu", () => {
      cy.visit("/");
      cy.get("[name='search']").type("Pikachu");
      cy.get(".list-item").should("have.length", 1);
      cy.get(".list-item-data-name").contains("Pikachu");
    });
  });

  describe("Filtering", () => {
    it("filters for Steel types", () => {
      cy.visit("/");
      cy.wait("@gqlGetAllPokemonTypesQuery");
      cy.get("[name='filter']").select("Steel");
      cy.get(".list-item-data-details").should("have.length", 2);
      cy.get(".list-item-data-details").each(($el) => {
        cy.wrap($el).should("contain", "Steel");
      });
    });
  });

  describe("List/Grid view toggle", () => {
    it("toggles the view to grid, then list", () => {
      cy.visit("/");
      cy.get("#view-grid").click();
      cy.get(".list-container").should("have.class", "grid");
      cy.get("#view-list").click();
      cy.get(".list-container").should("have.class", "list");
    });
  });

  describe("Toggle a favorite", () => {
    it("toggles the favorite on a Pokemon", () => {
      cy.visit("/");
      cy.get(".heart").first().click();
      cy.wait("@gqlfavoritePokemonMutation");
      cy.get(".tabs").contains("Favorites").click();
      cy.get(".list-item")
        .should("have.length", 1)
        .should("contain", "Bulbasaur");
      cy.get(".heart").first().click();
      cy.wait("@gqlunFavoritePokemonMutation");
      cy.get(".list-item").should("not.exist");
    });
  });

  describe("View the details and play sound", () => {
    it.only("views the details on Bulbasaur and play sound", () => {
      cy.visit("/");
      cy.get(".list-item-data-name").first().click();
      cy.location("pathname").should("eq", "/Bulbasaur");
      cy.get(".play").click();
    });
  });
});
