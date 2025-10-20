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
- **Dark/Light Mode** - Professional color theme switcher with persistent preference
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

This project includes a complete MVP integration with the VTU.ng API v2, providing both backend and frontend functionality for purchasing digital services.

### Features

**Backend (VTUApiClient):**
- ✅ JWT authentication with automatic token refresh and caching
- ✅ Comprehensive error handling with VTU error codes
- ✅ Retry logic for transient errors (wallet busy, rate limit, timeout)
- ✅ Configurable request timeout and retry attempts
- ✅ Support for all major VTU operations

**Frontend:**
- ✅ Functional forms for airtime and data purchase
- ✅ Real-time wallet balance display
- ✅ Dynamic data plan fetching based on network
- ✅ Error and success message handling
- ✅ Loading states and input validation

**Security:**
- ✅ Optional X-API-KEY header validation for internal API routes
- ✅ Never exposes VTU credentials to frontend
- ✅ All secrets managed via environment variables

### Environment Variables

**Required Variables:**

- `VTU_BASE_URL` - Base URL for VTU.ng API (default: https://vtu.ng/wp-json)
- `VTU_USERNAME` - Your VTU.ng account username
- `VTU_PASSWORD` - Your VTU.ng account password

**Optional Variables:**

- `VTU_USER_PIN` - Your VTU.ng user PIN for transaction authorization
- `VTU_API_KEY` - VTU.ng API key (if using Token authentication instead of JWT)
- `VTU_TIMEOUT` - Request timeout in milliseconds (default: 30000)
- `VTU_MAX_RETRIES` - Maximum retry attempts for transient errors (default: 3)
- `VTU_SERVER_API_KEY` - API key for protecting your internal API routes (RECOMMENDED)

**Security Best Practices:**

1. **Generate a strong server API key:**
   ```bash
   openssl rand -hex 32
   ```
   Add this to your `.env.local` as `VTU_SERVER_API_KEY`

2. **Never commit secrets:**
   - Use `.env.local` for development (already in .gitignore)
   - Use your hosting platform's environment variables for production

3. **Use the server API key:**
   - If you set `VTU_SERVER_API_KEY`, all API routes will require an `x-api-key` header
   - This prevents unauthorized access to your VTU API endpoints
   - Example with API key:
     ```bash
     curl -X GET http://localhost:3000/api/vtu/balance \
       -H "x-api-key: your_server_api_key_here"
     ```

### API Routes

The following API routes are available for server-side integration:

#### Balance
```bash
# Get account balance
curl -X GET http://localhost:3000/api/vtu/balance

# With API key protection
curl -X GET http://localhost:3000/api/vtu/balance \
  -H "x-api-key: your_server_api_key_here"
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

#### Transaction History
```bash
# Get transaction history
curl -X GET "http://localhost:3000/api/vtu/transactions"

# With pagination and filtering
curl -X GET "http://localhost:3000/api/vtu/transactions?page=1&limit=20&status=successful"
```

#### Recharge Card Generation
```bash
# Generate recharge cards
curl -X POST http://localhost:3000/api/vtu/recharge-cards \
  -H "Content-Type: application/json" \
  -d '{
    "network": "mtn",
    "amount": 100,
    "quantity": 5
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
- Comprehensive error handling with retry logic
- Request timeouts and exponential backoff

### Error Handling

The VTU client includes comprehensive error handling:

**Error Types:**

1. **Authentication Errors** (401)
   - Invalid credentials
   - Expired token
   - Solution: Verify VTU_USERNAME and VTU_PASSWORD

2. **Validation Errors** (400)
   - Missing required fields
   - Invalid input format
   - Solution: Check request payload matches API documentation

3. **Transient Errors** (Automatically Retried)
   - Wallet busy
   - Rate limit exceeded
   - Network timeouts
   - The client will automatically retry with exponential backoff (up to VTU_MAX_RETRIES)

4. **Server Errors** (500)
   - VTU API service issues
   - Solution: Wait and retry, or contact VTU support

**Error Response Format:**

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

**VTU Error Codes:**

The VTU API may return specific error codes in the response. Common codes include:
- `INSUFFICIENT_BALANCE` - Wallet balance too low
- `INVALID_VARIATION` - Invalid plan/variation code
- `NETWORK_ERROR` - Network provider issue
- `DUPLICATE_TRANSACTION` - Transaction already processed

### Troubleshooting

**Issue: "Failed to get access token"**
- Check VTU_USERNAME and VTU_PASSWORD are correct
- Verify your VTU.ng account is active
- Check network connectivity

**Issue: "Unauthorized: Invalid or missing API key"**
- You have VTU_SERVER_API_KEY set but didn't provide x-api-key header
- Solution: Add header or remove VTU_SERVER_API_KEY for development

**Issue: "Request timeout"**
- VTU API is slow or unresponsive
- Solution: Increase VTU_TIMEOUT (default 30000ms)
- Client will auto-retry transient errors

**Issue: "Wallet busy" errors**
- Multiple simultaneous transactions
- Solution: Client automatically retries with exponential backoff
- Adjust VTU_MAX_RETRIES if needed (default: 3)

**Issue: Data plans not loading**
- Verify network code matches VTU.ng network codes
- Check /api/vtu/variations endpoint returns data
- Try different network selection

### Testing Without Real API Calls

For development and testing without hitting the VTU API:

1. **Mock the API routes:** Create mock responses in your API routes for testing
2. **Use environment check:** Add conditional logic to return mock data in development:
   ```typescript
   if (process.env.NODE_ENV === 'development' && process.env.USE_MOCK_DATA === 'true') {
     return mockData;
   }
   ```

3. **Test with small amounts:** When testing with real API, use minimum amounts to minimize costs

## Design Philosophy

The platform follows modern fintech app design principles:
- **Minimalist** - Clean interfaces with clear call-to-actions
- **Colorful** - Service cards use distinct colors for easy identification
- **Mobile-First** - Optimized for mobile devices with bottom navigation
- **Fast** - Built with Next.js for optimal performance
- **Accessible** - Clear typography and intuitive navigation
- **Theme Support** - Professional dark and light modes for comfortable viewing

## Theme Switching

The application features a professional color theme switcher that allows users to toggle between light and dark modes.

### Features
- **Toggle Button** - Easily accessible theme switch button in the header with sun/moon icons
- **Persistent Preference** - Theme choice is saved in localStorage and persists across sessions
- **System Preference** - Defaults to system/browser preference if no choice is stored
- **Smooth Transitions** - CSS transitions provide smooth color changes when switching themes
- **Universal Support** - All pages and components respect the chosen theme

### Usage
Click the theme toggle button in the top-right corner of the header to switch between light and dark modes. Your preference will be automatically saved.

### For Developers
The theme system is implemented using:
- **React Context** - `ThemeProvider` in `contexts/ThemeContext.tsx` manages theme state
- **Tailwind CSS** - Class-based dark mode strategy with `dark:` prefix classes
- **localStorage** - Stores user preference with key `theme`
- **Custom Hook** - `useTheme()` hook provides theme state and toggle function

To add dark mode support to new components:
```tsx
// Use Tailwind's dark: prefix for dark mode styles
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

To customize theme colors, edit the CSS variables in `app/globals.css`:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0f172a;
  --foreground: #f1f5f9;
}
```

## Architecture Overview

### Backend Layer

**VTUApiClient (`lib/vtuClient.ts`)**
- TypeScript class wrapping all VTU.ng API endpoints
- Handles authentication (JWT with /jwt-auth/v1/token endpoint, fallback to /wp/v2/users/login)
- Token caching and automatic refresh
- Retry logic with exponential backoff
- Request timeout support
- Type-safe interfaces for all operations

**API Routes (`app/api/vtu/*/route.ts`)**
- Server-side Next.js API routes
- Never expose VTU credentials to client
- Optional API key validation (VTU_SERVER_API_KEY)
- Input validation and error handling
- All routes follow consistent response format

### Frontend Layer

**Service Forms (`app/services/*/`)**
- Client components with form state management
- Real-time API integration
- Error/success message handling
- Input validation
- Loading states

**Shared Components (`components/`)**
- WalletCard: Real-time balance display
- ServiceCard, QuickActions, etc.: Reusable UI components

### Security Architecture

1. **Credentials never reach the browser:**
   - All VTU API calls go through Next.js API routes
   - Environment variables only accessible server-side

2. **Optional API key protection:**
   - Set VTU_SERVER_API_KEY to require x-api-key header
   - Protects your internal API from unauthorized access

3. **Rate limiting (future):**
   - Can add rate limiting middleware to API routes
   - Prevents abuse of your endpoints

## Extending the MVP

### Adding New Service Forms

To add a functional form for other services (TV, electricity, etc.):

1. **Create form component** (e.g., `app/services/tv/TVForm.tsx`):
   ```typescript
   'use client';
   import { useState } from 'react';
   
   export default function TVForm() {
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState('');
     // ... form state
     
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       setLoading(true);
       
       const response = await fetch('/api/vtu/tv', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ /* data */ })
       });
       
       // ... handle response
     };
     
     return (/* form JSX */);
   }
   ```

2. **Update page to use form:**
   ```typescript
   // app/services/tv/page.tsx
   import TVForm from './TVForm';
   export default function TVPage() {
     return <TVForm />;
   }
   ```

### Adding New API Endpoints

If VTU adds new endpoints:

1. **Add interface and method to VTUClient:**
   ```typescript
   // lib/vtuClient.ts
   export interface NewServiceRequest {
     field1: string;
     field2: number;
   }
   
   async newService(data: NewServiceRequest): Promise<VTUApiResponse> {
     return this.makeRequest('/api/v1/new-service', 'POST', data);
   }
   ```

2. **Create API route:**
   ```typescript
   // app/api/vtu/new-service/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   import { getVTUClient } from '@/lib/vtuClient';
   import { validateApiKey } from '@/lib/apiKeyValidation';
   
   export async function POST(request: NextRequest) {
     if (!validateApiKey(request)) {
       return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
     }
     
     const body = await request.json();
     // Validate inputs...
     
     const client = getVTUClient();
     const result = await client.newService(body);
     
     return NextResponse.json({ success: true, data: result });
   }
   ```

### Production Deployment Checklist

- [ ] Set all environment variables in production
- [ ] Generate and set VTU_SERVER_API_KEY
- [ ] Test all endpoints with real API credentials
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Add rate limiting to API routes
- [ ] Enable HTTPS only
- [ ] Set up logging for transactions
- [ ] Configure CORS if needed
- [ ] Add user authentication layer
- [ ] Implement transaction history storage
- [ ] Add wallet funding functionality

## Future Enhancements

Potential features for future versions:
- [ ] User authentication and profiles (NextAuth.js)
- [ ] Payment gateway integration (Paystack, Flutterwave)
- [ ] Database for transaction history (PostgreSQL, MongoDB)
- [ ] Transaction history with filtering and export
- [ ] Wallet funding options
- [ ] Referral system with rewards
- [ ] Push notifications (Web Push API)
- [ ] Admin dashboard for monitoring
- [ ] Analytics and reporting
- [ ] Webhook handlers for transaction status updates
- [ ] Rate limiting and request throttling
- [ ] Comprehensive unit and integration tests
- [ ] CI/CD pipeline setup

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is available for use and modification.

## Support

For support or questions, please open an issue in the repository.
