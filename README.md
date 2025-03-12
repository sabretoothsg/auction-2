# Protected Note Auction Interface

This project implements a web interface for a token auction system with price protection mechanisms. The interface allows users to participate in multi-round auctions with features like price protection thresholds, early bid discounts, and interactive price visualizations.

## Features

- Multi-round auction system with uniform pricing
- Interactive price and demand curve visualizations
- Price protection mechanisms with reserve and trigger thresholds
- Bidding options: simple bid, advanced bid, and token selling
- Real-time transaction history and auction progress tracking
- Early bid discount system
- Responsive design for various screen sizes

## Technical Implementation

The interface is built using:
- HTML5, CSS3, and JavaScript
- Chart.js for data visualization
- Chart.js plugins for annotations and data labels
- Custom styling for a modern financial interface

## Key Components

- Price status visualization with protection thresholds
- Cumulative demand curve analysis
- Bid distribution heatmap
- Auction progress timeline
- Transaction history with filtering options

## Running the Project

To run the project locally:

1. Clone the repository
2. Navigate to the project directory
3. Start a local web server:
   ```
   python3 -m http.server 8000
   ```
   or
   ```
   npx serve
   ```
4. Open your browser and go to `http://localhost:8000/pages/auction3.html`

## Recent Fixes

- Fixed vertical price lines on the bid heatmap chart
- Improved annotation positioning and labeling
- Enhanced visual distinction between price thresholds

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