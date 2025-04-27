# TMDb Cypress Testing Project

This project contains end-to-end tests for The Movie Database (TMDb) website and API using Cypress. It includes tests for searching movies on the UI, fetching movie data via the TMDb API, and handling invalid inputs.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher (recommended). Download from [nodejs.org](https://nodejs.org/).
- **npm**: Comes with Node.js, but ensure it's version 8.x or higher.
- **Git**: For cloning the repository. Download from [git-scm.com](https://git-scm.com/).
- A modern web browser (e.g., Chrome, Firefox, or Edge) for running Cypress tests.
- A TMDb API key. Sign up at [themoviedb.org](https://www.themoviedb.org/) and generate an API key.

## Installation

Follow these steps to set up the project locally:

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/muhammad-hamza-liaqat/cypress-testing.git
    cd tmdb-cypress-testing
    ```

2.  **Install Dependencies**:
    Install the required npm packages, including Cypress:

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**:
    Create a `cypress.config.env` file in the project root and add your TMDb API key:

    ```bash
    echo "tmdbApiKey=your-api-key-here" > .env
    ```

    Replace `your-api-key-here` with your actual TMDb API key.

          ```bash

    echo {
    "tmdbApiKey": "2edbbcf30b4b9ebbe5a8dc5187e6d2c4"
    }

    ```

    ```

## Running the Tests

You can run the tests in two modes: interactive (Cypress Test Runner) or headless (command line).

### Interactive Mode

Open the Cypress Test Runner to run tests interactively:

```bash
npx cypress open
```

- Select "E2E Testing" in the Cypress UI.
- Choose a browser (e.g., Chrome).
- Click on `tmdb.spec.js` to run the test suite.
- The Test Runner will display logs and test results in real-time.

### Headless Mode

Run all tests in the terminal without a browser UI:

```bash
npx cypress run
```

- Results will be displayed in the terminal.
- Screenshots and videos (if configured) will be saved in the `cypress/screenshots` and `cypress/videos` folders.

## Project Structure

- `cypress/e2e/tmdb.spec.js`: Contains the end-to-end test suite for TMDb.
- `cypress.config.js`: Cypress configuration file.
- `package.json`: Lists project dependencies and scripts.
- `.env`: Stores environment variables (not committed to version control).

## Test Suite Overview

The test suite includes the following tests:

1. **UI Search**: Searches for a movie (e.g., "Mission: Impossible") on the TMDb website and verifies results.
2. **API Fetch**: Retrieves movie data from the TMDb API and validates the response.
3. **API-to-UI Validation**: Uses API data to search the UI and verify consistency.
4. **Invalid UI Search**: Tests the UI with an invalid movie name.
5. **Invalid API Key**: Verifies API behavior with an invalid API key.

## Troubleshooting

- **Cypress fails to open**: Ensure Node.js and npm are correctly installed. Run `npm install cypress --save-dev` to reinstall Cypress.
- **API key errors**: Verify your TMDb API key in the `.env` file. Ensure it matches the key from your TMDb account.
- **Tests timeout**: Increase the timeout in the test (e.g., `{ timeout: 15000 }`) or check your internet connection.
- **Cookie consent issues**: The tests automatically handle the cookie consent popup, but if it fails, manually accept it during interactive mode.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make changes and commit (`git commit -m "Add your feature"`).
4. Push to your fork (`git push origin feature/your-feature`).
5. Open a pull request.

Please include tests for new features and update this README if necessary.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cypress](https://www.cypress.io/) for the testing framework.
- [The Movie Database (TMDb)](https://www.themoviedb.org/) for the API and website.
