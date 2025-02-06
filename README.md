# Rijksmuseum API

## Automation Framework with TypeScript & Playwright

---

## 🛠️ Tech Stack

The following technologies are used in this automation framework:

1. **TypeScript** - Strongly typed JavaScript for better maintainability.
2. **Playwright** - Modern end-to-end testing framework for UI automation.
3. **Axios** - A promise-based HTTP client for making API calls and handling asynchronous communication with backend services.
4. **Zod** - A TypeScript-first schema declaration and validation library that ensures runtime data integrity.

---

## 🚀 How to run the tests

### From the command line:

```sh
# Install Playwright
npx playwright install

# Install dependencies
npm install

# Add API key
rename .env.example file to .env
add API_KEY value

# Run API tests
npm run test

```

### GitHub Actions:

The tests can also be executed as part of the **CI/CD pipeline** in **GitHub Actions**.
A workflow runs API and UI tests whenever a pull request is created for the main branch.

## 🔍 Approach

### 🔗 API Tests

- The API tests are located in `tests/api-tests` folder
- The tests include both **successful and unsuccessful scenarios**.
- Validation covers **status codes, response schemas and custom fields validation**.

## 🐞 Found Bugs Marked with `.fail()`

The following test cases are marked with `.fail()` due to known API issues:

### 📂 `collectionDetails.spec.ts`

- **`test.fail('Fetch Collection Details - Invalid Object')`**  
  🛑 _API returns `200` instead of `404` for an invalid object._

### 📂 `filters.spec.ts`

- **`test.fail('Invalid Data Type for Filter - Period as String')`**  
  🛑 _API returns `200` instead of `400` for an invalid data type._

### 📂 `pagination.spec.ts`

- **`test.fail('Invalid Pagination - Page Number Exceeds Limit')`**  
  🛑 _API returns `200` instead of `404` when the page number exceeds the limit._

- **`test.fail('Invalid Page Size - Exceeds Limit')`**  
  🛑 _API returns `200` instead of `400` when the page size exceeds the limit._

### 📂 `performance.spec.ts`

- **`test.fail('Retrieve a collection and measure response time')`**  
  🛑 _Skipping: Response time is frequently greater than 1000 ms._

---

These issues are currently under investigation. Updates will be provided when fixes become available. 🚧

## 📌 Next Steps

- Increase coverage.
- **Uncomment skipped tests** containing the bugs once they have been discussed with the team.
- Improve **test reporting and logging**.
- Enhance the schema to allow null values (in some art objects, `webImage` is `null` when `hasImage: false`).
- Verify it's possible to construct an image from the tiles.
