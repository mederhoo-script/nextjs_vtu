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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

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
