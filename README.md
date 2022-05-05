# Front-End Coding Challenge

This is a coding exercise for new developers joining the team.

Please fork this repository and complete the challenge in your fork.

## Objective

Using Vue.js and TypeScript or JavaScript, your assignment is to build a simple [Pokédex](https://www.pokemon.com/us/pokedex/).

## Brief

Inside the `backend` directory, we have provided you with a [GraphQL](https://graphql.org/) server that serves the Pokémon data. It is non-persistent, hence the data will reset every time the server is restarted. For more information, please refer to the back-end's README.

Inside the `frontend` directory, we have provided you with a [Vue.js](https://vuejs.org/) base project as a starting point for your Pokédex front-end. You are free to replace, ignore or add any libraries or tooling you like. For more information, please refer to the front-end's README.

Your task is to create a simple Pokédex web application that looks similar to the designs provided bellow, but you're free to improve the design as you see fit.

List view           |  Detail view
:------------------:|:------------------:
![](example/example-list-view.png) | ![](example/example-detail-view.png)

A video example of the functionality of the Pokédex can be found in the `example` directory.

The Pokédex application you're building should communicate with the provided server to interact with the Pokémon data to allow users to perform the following actions:

- Search for a Pokémon by name using a search bar
- Filter the list of Pokémons by type using a dropdown menu
- Mark and unmark a Pokémon as favorite by clicking on a heart icon
- Use tabs to switch between the list of all Pokémons and the list of favorite Pokémons
- Change to grid or list view
- View a Pokémon's details by visiting the `/:name` route
- View a Pokémon's details by clicking on a Pokémon's name or image (i.e. redirect to the `/:name` route)
- On the Pokémon's details page, play the Pokémon's sound effect by clicking on a speaker icon

Addionallity, you are free to add the following optional features:

- Infinite scrolling or paginated list of Pokémons to handle on-demand loading of data
- "Quick view" button on the list view to view some of the Pokémon's details using a modal
- Toast notifications to display success and error messages when performing actions
- Page transitions

## Evaluation

We will check the following:

- Working functionalities as described
- Code architecture
- Code readability
- Implementation details
- Documentation
- Automated tests

## Additional information

- **It's not necessary to use the provided stack (Vue.js, TypeScript and SCSS). Please use it if you feel comfortable with it. Otherwise, feel free to use any other well-known technology (e.g. React, Angular; JSX; LESS).**
- There is no need to configure or optimize the final build. The development environment is sufficient.
- Good code quality is more important than the amount of features implemented.
- Test coverage doesn't need to be perfect, but we would like to see some tests that you consider to be valuable.
