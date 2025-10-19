# Next.js VTU Services Platform

A modern Virtual Top-Up (VTU) platform built with Next.js 15, TypeScript, and Tailwind CSS. The interface is inspired by popular fintech apps like OPay and PalmPay, providing a seamless user experience for purchasing digital products and services.

## Features

### Digital Services
- **Airtime Recharge** - Buy airtime for all major networks (MTN, Airtel, Glo, 9Mobile)
- **Data Bundles** - Purchase data plans for mobile networks
- **TV Subscriptions** - Pay for DSTV, GOTV, Startimes, and other cable TV services
- **Electricity Bills** - Buy prepaid and postpaid electricity tokens
- **Exam Pins** - Purchase WAEC, NECO, JAMB, and NABTEB exam pins
- **Education Services** - Buy result checker PINs for various examination bodies
- **Internet Services** - Recharge for Smile, Spectranet, and other ISPs
- **Recharge Card Printing** - Generate bulk recharge cards for resale

### User Interface Features
- **Modern Design** - Clean, intuitive interface inspired by OPay/PalmPay
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- **Wallet System** - View balance, bonus, and referral information
- **Quick Actions** - Fast access to frequently used features
- **Transaction History** - Track recent purchases and their status
- **Service Cards** - Easy-to-navigate service categories with icons
- **Bottom Navigation** - Mobile-optimized navigation bar

## Tech Stack

- **Framework:** Next.js 15.5.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Runtime:** React 19
- **Build Tool:** Turbopack

## Getting Started

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mederhoo-script/nextjs_vtu.git
cd nextjs_vtu
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your VTU.ng API credentials:
```env
VTU_BASE_URL=https://vtu.ng/wp-json
VTU_USERNAME=your_username_here
VTU_PASSWORD=your_password_here
VTU_USER_PIN=your_pin_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
nextjs_vtu/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   └── services/            # Service pages
│       ├── airtime/         # Airtime purchase page
│       ├── data/            # Data bundle page
│       ├── tv/              # TV subscription page
│       ├── electricity/     # Electricity bills page
│       ├── exam/            # Exam pins page
│       ├── education/       # Education services page
│       ├── internet/        # Internet services page
│       └── recharge-card/   # Recharge card printing page
├── components/              # Reusable components
│   ├── Header.tsx          # App header with navigation
│   ├── ServiceCard.tsx     # Service card component
│   ├── QuickActions.tsx    # Quick action buttons
│   └── RecentTransactions.tsx # Transaction history
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
└── package.json            # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features Overview

### Homepage
- Wallet balance display with bonus and referral counters
- Quick action buttons for common tasks
- Grid of service cards for all VTU products
- Recent transaction history
- Promotional banners

### Service Pages
Each service has a dedicated page with:
- Provider/network selection
- Product/plan options
- Input fields for transaction details
- Quick amount/plan selectors
- Helpful information cards

## VTU.ng API Integration

This project includes a complete integration with the VTU.ng API v2, providing backend functionality for purchasing digital services.

### Environment Variables

Required environment variables (see `.env.example`):

- `VTU_BASE_URL` - Base URL for VTU.ng API (https://vtu.ng/wp-json)
- `VTU_USERNAME` - Your VTU.ng account username
- `VTU_PASSWORD` - Your VTU.ng account password
- `VTU_USER_PIN` - Your VTU.ng user PIN for transaction authorization

### API Routes

The following API routes are available for server-side integration:

#### Balance
```bash
# Get account balance
curl -X GET http://localhost:3000/api/vtu/balance
```

#### Airtime Purchase
```bash
# Purchase airtime
curl -X POST http://localhost:3000/api/vtu/airtime \
  -H "Content-Type: application/json" \
  -d '{
    "network": "mtn",
    "phone": "08012345678",
    "amount": 100
  }'
```

#### Data Purchase
```bash
# Purchase data bundle
curl -X POST http://localhost:3000/api/vtu/data \
  -H "Content-Type: application/json" \
  -d '{
    "network": "mtn",
    "phone": "08012345678",
    "variation_code": "mtn-1gb"
  }'
```

#### Get Variations
```bash
# Get data variations
curl -X GET "http://localhost:3000/api/vtu/variations?service_type=data"

# Get TV variations
curl -X GET "http://localhost:3000/api/vtu/variations?service_type=tv"
```

#### Verify Customer
```bash
# Verify customer details (for TV, electricity, etc.)
curl -X POST http://localhost:3000/api/vtu/verify-customer \
  -H "Content-Type: application/json" \
  -d '{
    "service_type": "dstv",
    "billersCode": "1234567890",
    "variation_code": "dstv-compact"
  }'
```

#### Electricity Purchase
```bash
# Purchase electricity token
curl -X POST http://localhost:3000/api/vtu/electricity \
  -H "Content-Type: application/json" \
  -d '{
    "service_type": "ikeja-electric",
    "billersCode": "1234567890",
    "variation_code": "prepaid",
    "amount": 5000,
    "phone": "08012345678"
  }'
```

#### Betting
```bash
# Fund betting account
curl -X POST http://localhost:3000/api/vtu/betting \
  -H "Content-Type: application/json" \
  -d '{
    "service_type": "betway",
    "billersCode": "1234567890",
    "amount": 1000,
    "phone": "08012345678"
  }'
```

#### TV Subscription
```bash
# Purchase TV subscription
curl -X POST http://localhost:3000/api/vtu/tv \
  -H "Content-Type: application/json" \
  -d '{
    "service_type": "dstv",
    "billersCode": "1234567890",
    "variation_code": "dstv-compact",
    "phone": "08012345678"
  }'
```

#### E-pins
```bash
# Purchase e-pins
curl -X POST http://localhost:3000/api/vtu/epins \
  -H "Content-Type: application/json" \
  -d '{
    "service_type": "waec",
    "amount": 3500,
    "quantity": 1
  }'
```

#### Requery Transaction
```bash
# Check transaction status
curl -X POST http://localhost:3000/api/vtu/requery \
  -H "Content-Type: application/json" \
  -d '{
    "request_id": "transaction_request_id"
  }'
```

### Using the API with Node.js

Example using the `fetch` API in Node.js:

```javascript
// Get balance
const balanceResponse = await fetch('http://localhost:3000/api/vtu/balance');
const balanceData = await balanceResponse.json();
console.log(balanceData);

// Purchase airtime
const airtimeResponse = await fetch('http://localhost:3000/api/vtu/airtime', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    network: 'mtn',
    phone: '08012345678',
    amount: 100,
  }),
});
const airtimeData = await airtimeResponse.json();
console.log(airtimeData);
```

### Response Format

All API routes return a consistent response format:

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response data from VTU.ng API
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

### VTU Client Library

The VTU client library is available in `lib/vtuClient.ts` and can be used directly in your server-side code:

```typescript
import { getVTUClient } from '@/lib/vtuClient';

// Get client instance (uses environment variables)
const client = getVTUClient();

// Get balance
const balance = await client.getBalance();

// Purchase airtime
const result = await client.purchaseAirtime({
  network: 'mtn',
  phone: '08012345678',
  amount: 100,
});
```

The client handles:
- JWT authentication with automatic token refresh
- Token caching to minimize API calls
- Type-safe API requests with TypeScript
- Error handling

## Design Philosophy

The platform follows modern fintech app design principles:
- **Minimalist** - Clean interfaces with clear call-to-actions
- **Colorful** - Service cards use distinct colors for easy identification
- **Mobile-First** - Optimized for mobile devices with bottom navigation
- **Fast** - Built with Next.js for optimal performance
- **Accessible** - Clear typography and intuitive navigation

## Future Enhancements

Potential features for future versions:
- User authentication and profiles
- Payment gateway integration
- Real-time transaction processing
- Transaction history with filtering
- Wallet funding options
- Referral system
- Push notifications
- API integration with VTU providers
- Admin dashboard
- Analytics and reporting

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is available for use and modification.

## Support

For support or questions, please open an issue in the repository.
