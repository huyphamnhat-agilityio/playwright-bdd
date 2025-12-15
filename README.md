# Playwright BDD Training

A comprehensive end-to-end testing framework using Playwright with Behavior-Driven Development (BDD) approach. This project demonstrates modern testing practices with Gherkin feature files, TypeScript, and automated browser testing.

## Plan

- Google Docs: [Playwright-bdd](https://docs.google.com/document/d/1SYEEO0x9Pdkzz30Ou-neryyJIE4y-yNaHneudV5qqBI/edit?usp=sharing)

## 🚀 Features

- **BDD Testing**: Gherkin feature files with step definitions
- **Multi-Browser Support**: Chrome, Firefox, Safari, and Edge
- **Authentication Testing**: Login/logout flows with session management
- **User Management**: Complete CRUD operations testing
- **API Integration**: Backend API testing alongside UI tests
- **Parallel Execution**: Fast test execution with parallel workers
- **CI/CD Ready**: GitLab CI integration with proper reporting
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks

## 📋 Test Coverage

### Authentication (`@auth`)

- User login with valid credentials
- Login validation and error handling
- Session management and logout

### User Management (`@user`)

- **Create**: User creation with validation
- **Edit**: User profile updates and form validation
- **Delete**: User removal functionality
- **Search**: User search and filtering
- **Sort**: User list sorting capabilities

## 🛠️ Tech Stack

- **Testing Framework**: [Playwright](https://playwright.dev/)
- **BDD Framework**: [playwright-bdd](https://vitalets.github.io/playwright-bdd/)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier, Husky
- **CI/CD**: GitLab CI
- **Environment**: Node.js

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone https://gitlab.asoft-python.com/huy.phamnhat/playwright-bdd-training.git
cd playwright-bdd-training

# Install dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install

# Copy environment file
cp .env.example .env
```

### Environment Configuration

Update `.env` file with your application settings:

```env
BASE_URL=http://localhost:3000
# Add other environment variables as needed
```

## 🚀 Usage

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in headed mode (visible browser)
pnpm test:headed

# Run specific feature
pnpm playwright test --grep "@TC_USERS_001"

# Run tests for specific browser
pnpm playwright test --project=chromium

# Run authentication setup only
pnpm auth:setup
```

### Test Reports

```bash
# View HTML report
pnpm report

# Generate and open report
pnpm playwright show-report
```

### Development Commands

```bash
# Generate BDD test files
pnpm bddgen

# Run linting
pnpm lint

# Format code
pnpm format
```

## 📁 Project Structure

```
src/
├── configs/           # Test configuration files
│   ├── auth.setup.ts  # Authentication setup
│   └── browsers.ts    # Browser configurations
├── constants/         # Test data and constants
│   ├── auth-credentials.ts
│   ├── endpoints.ts
│   └── user-test-data.ts
├── features/          # Gherkin feature files
│   ├── @auth/         # Authentication features
│   └── @user/         # User management features
├── fixtures/          # Test fixtures and context
│   ├── auth.fixture.ts
│   └── users.fixture.ts
├── pages/             # Page Object Model classes
│   ├── LoginPage.ts
│   ├── UsersPage.ts
│   └── DashboardPage.ts
├── services/          # API service layer
│   ├── apiContext.ts
│   └── user.ts
├── steps/             # Step definitions
│   ├── auth/
│   └── user/
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🧪 Writing Tests

### Feature Files

Create Gherkin feature files in `src/features/`:

```gherkin
@slow
Feature: User Creation

  @TC_USERS_001
  Scenario: User can create a user with valid value
    Given the user is on the Users page
    When the user clicks the "New Record" button
      And the user fills the email field with valid data
      And the user fills the password field with valid data
      And the user fills the password confirm field with valid data
      And the user clicks the "Create" button to submit the form
    Then the API should return success for user creation
      And the user should see the created user in the list
```

### Step Definitions

Implement step definitions in `src/steps/`:

```typescript
import { Given, When, Then } from "@/fixtures/users.fixture";

Given("the user is on the Users page", async ({ usersPage }) => {
  await usersPage.navigateTo();
});

When('the user clicks the "New Record" button', async ({ usersPage }) => {
  await usersPage.newRecordButton.click();
});
```

### Page Objects

Create page objects in `src/pages/`:

```typescript
export class UsersPage extends BasePage {
  readonly newRecordButton = this.page.locator('[data-testid="new-record"]');
  readonly emailField = this.page.locator('[name="email"]');

  async navigateTo() {
    await this.page.goto("/users");
  }
}
```

## 🔧 Configuration

### Playwright Configuration

Main configuration in `playwright.config.ts`:

- Multi-browser setup (Chrome, Firefox, Safari, Edge)
- Parallel execution settings
- Authentication state management
- Test patterns and matching

### Browser Configuration

Browser settings in `src/configs/browsers.ts`:

- Device configurations
- Viewport settings
- Browser-specific options

## 🎯 Best Practices

### Test Organization

- Use descriptive test IDs (`@TC_USERS_001`)
- Group related scenarios in feature files
- Implement proper cleanup in After hooks
- Use tagged hooks to prevent cross-contamination

### Code Quality

- Follow TypeScript best practices
- Use Page Object Model pattern
- Implement proper error handling
- Write maintainable step definitions

### Data Management

- Use unique test data (timestamps)
- Implement proper test isolation
- Clean up test data after scenarios
- Use environment-specific configurations

## 🚦 CI/CD Integration

The project includes GitLab CI configuration with:

- Automated test execution
- HTML report generation
- Artifact collection
- Multi-stage pipeline support

## Author

- huy.phamnhat@asnet.com.vn
