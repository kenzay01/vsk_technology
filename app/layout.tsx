import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f59e0b",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vsktechnology.com'),
  title: "VSK Technology - Reliable Appliance Repair Services",
  description: "Professional appliance repair services by VSK Technology. Our qualified technicians provide efficient and quick solutions for all your appliance problems.",
  keywords: "appliance repair, VSK Technology, refrigerator repair, washing machine repair, appliance service, dishwasher repair, oven repair, stove repair, cooktop repair, microwave repair, Palm Springs",
  robots: "index, follow",
  applicationName: "VSK Technology LLC",
  authors: [{ name: "VSK Technology LLC" }],
  openGraph: {
    type: "website",
    url: "https://vsktechnology.com",
    title: "VSK Technology - Reliable Appliance Repair Services",
    description: "Professional appliance repair services by VSK Technology. Our qualified technicians provide efficient and quick solutions for all your appliance problems.",
    siteName: "VSK Technology",
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'VSK Technology Logo'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VSK Technology - Reliable Appliance Repair Services',
    description: 'Professional appliance repair services by VSK Technology',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://vsktechnology.com',
  },
  verification: {
    google: 'verification_token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://vsktechnology.com" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Palm Springs" />
        <meta name="geo.position" content="33.8303;-116.5453" />
        <meta name="ICBM" content="33.8303, -116.5453" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "VSK Technology LLC",
              "url": "https://vsktechnology.com",
              "logo": "https://vsktechnology.com/logo.png",
              "image": "https://vsktechnology.com/logo.png",
              "description": "Professional appliance repair services by VSK Technology. Our qualified technicians provide efficient and quick solutions for all your appliance problems.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2252 N INDIAN CANYON DR",
                "addressLocality": "PALM SPRINGS",
                "addressRegion": "CA",
                "postalCode": "92262-3065",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "33.8303",
                "longitude": "-116.5453"
              },
              "telephone": "213 715 5757",
              "email": "vsktechnology.us@gmail.com",
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday"],
                  "opens": "09:00",
                  "closes": "16:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/vsktechnology",
                "https://www.instagram.com/vsktechnology"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
