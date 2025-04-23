# New User Registration Form

This Vite-based project is designed to provide a simple and fast implementation of a new user registration form using React. The project also includes a robust testing setup using Jest and React Testing Library to ensure the form works as expected.

## Assumptions

- The form data persists in the localstorage, and is updated on input
- The saved data won't be used to fill the form on page reload, to keep a smooth user experience

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v22 LTS)
- [npm](https://www.npmjs.com/) package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ginpie/user-registration-form.git
   cd user-registration-form
   ```

2. **Install dependencies**:
   Using npm:
   ```bash
   npm install
   ```

3. **Start the development server**:
   Using npm:
   ```bash
   npm run dev
   ```

   The development server will start, and you can access the app at `http://localhost:5173`.

### Build for Production

To create a production build:
```bash
npm run build
```
The build will be available in the `dist` folder.

### Run the Production Build Locally

To preview the production build locally:
```bash
npm run preview
```

## Testing

The project uses Jest and React Testing Library for testing.

### Run Tests

To execute all test cases:
```bash
npm run test
```

### Testing Setup

- **Jest**: Used as the test runner and assertion library.
- **React Testing Library**: Used for testing React components and simulating user interactions.

Tests are located in the `src/tests/` directory. Each component typically has a corresponding test file.

## Project Structure

```
├── public/               # Static assets
├── src/
│   ├── app/              # Page
│   ├── components/       # React components
│   ├── tests/            # Test files
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .gitignore            # Git ignore file
├── jest.config.js        # Jest configuration
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
└── vite.config.js        # Vite configuration
```
