# CDP Wallet Subscription Demo

A Next.js application demonstrating blockchain subscription management using Coinbase Developer Platform (CDP) Wallet SDK on Base network.

## Features

- **Create Wallet**: Generate a new CDP wallet to manage subscriptions
- **Create Subscription**: Set up recurring subscriptions on Base blockchain
- **Get Subscription Status**: Check subscription status and view details
- **Charge Subscription**: Process subscription charges using the created wallet
- **Revoke Subscription**: Cancel active subscriptions

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Coinbase CDP SDK (@coinbase/cdp-sdk)
- Base Account SDK (@base-org/account)
- Viem for Ethereum interactions
- Framer Motion for animations

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cdp-wallet-subscription-demo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables (if needed):
```bash
cp env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Create Wallet**: Click "Create Wallet" to generate a new CDP wallet address
2. **Create Subscription**: After creating a wallet, set up a subscription with your desired amount
3. **Check Status**: Use "Get Subscription Status" to verify the subscription is active
4. **Charge**: Process charges from the active subscription
5. **Revoke**: Cancel the subscription when needed

## Important Notes

- This is a demo application. In production:
  - Never expose private keys to the frontend
  - Store private keys securely in a backend service
  - Implement proper authentication and authorization
  - Use environment variables for sensitive configuration
  - Follow security best practices for wallet management

## API Routes

- `POST /API/create-wallet`: Creates a new CDP wallet and returns the address
- `POST /API/charge-subscription`: Charges a subscription using the provided subscription ID and wallet
- `POST /API/revoke-subscription`: Revokes/cancels an active subscription

## Project Structure

```
cdp-wallet-subscription-demo/
├── app/
│   ├── API/              # Backend API routes
│   │   ├── create-wallet/
│   │   ├── charge-subscription/
│   │   └── revoke-subscription/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── SubscriptionManager.tsx  # Main UI component
├── spec/
│   └── spec.md           # Project specification
└── package.json
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## License

MIT
