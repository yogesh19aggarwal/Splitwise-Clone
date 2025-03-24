# Splitwise Mobile App Clone

A React Native mobile application clone of Splitwise for managing shared expenses.

## Environment Setup

1. Update the `.env` file with your configuration:

``` text
API_KEY=your_splitwise_api_key
BASE_URL=https://secure.splitwise.com/api/v3.0/
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/splitwise-react-native.git
```

2. Install dependencies:

```bash
cd splitwise-react-native
npm install
```

3. Start the development server:

```bash
npm start
```

## Features

### User Management

- User authentication
- Profile management
- Account settings

### Groups

- Create and manage groups
- Add/remove members
- Track group expenses
- Group settings and deletion

### Friend Management

- Manage friend connections
- Track shared expenses
- View balances

### Expense Management

- Add expenses
- Split bills
- Settle balances

## Project Structure

``` text
splitwise/
├── .env.example              # Environment variables template
├── components/              # Reusable UI components
│   ├── account/
│   ├── friends/
│   └── group/
├── context/                # Global state management
├── navigation/            # Navigation configuration
├── screens/              # Main screen components
├── services/            # API integration services
└── App.js              # Application entry point
```

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- VsCode
- Xcode (for iOS development, macOS only)

### Running the App

Development mode:

```bash
npm start
```

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

## Testing

Run tests:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Acknowledgments

- Splitwise for inspiration
- React Native community
- Open source contributors
