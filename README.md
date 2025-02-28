# Auction Platform

This repository contains the code for the Auction Platform with auto-bidding functionality.

## Features

- Real-time auction interface with countdown timers
- Simple auto-bidding functionality
- Transaction history

## Auto Bid Functionality

The auto bid functionality allows users to:
1. Place bids that will execute automatically at the end of the round
2. View pending and executed bids in the simple bidding tab
3. Track bid status with countdown timers

## Running the Project

To start the server:

```bash
npm start
```

Then open your browser to: http://localhost:8000/pages/auction.html

## Testing

The project includes comprehensive tests for the auto bid functionality. These tests ensure that the functionality works correctly and will not break with future changes.

### Running Tests

To run the tests:

```bash
# Run Jest tests (requires proper setup)
npm test

# Run custom standalone tests (recommended)
npm run test:custom
```

### Test Coverage

The tests cover:

- Bid creation and validation
- UI updates when a bid is placed
- Countdown timer functionality
- Bid execution when the countdown reaches zero

## Test Structure

- `countdown-test.js`: Custom standalone tests that verify core functionality

### Developing with Tests

When making changes to the auto bid functionality, always run the tests to ensure your changes don't break existing functionality:

```bash
npm run test:custom
```

This will verify:
1. Bid creation with correct properties
2. Input validation (amount, max price)
3. Countdown timer updates
4. Bid execution when the timer completes
5. UI updates for both simple bidding tab and history list

## Development Guidelines

When making changes to the auto bid functionality:

1. Ensure all tests pass before pushing changes
2. Add new tests for any new functionality
3. Update existing tests when changing behavior

## How to Contribute

1. Clone the repository
2. Install dependencies with `npm install`
3. Make your changes
4. Run tests with `npm test`
5. Submit a pull request 