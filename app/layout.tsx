import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/Header";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
    title: "Gaming Haven Z",
    description:
        "Database of all existing video games. You can consult games, read descriptions and add to your own collection.",
    keywords: [
        "nextjs",
        "react",
        "web development",
        "videogames",
        "database",
        "collection",
    ],
    authors: [{ name: "Luciano Sanchez" }],
    icons: {
        icon: "/favicon.webp",
        apple: "/favicon.webp"
    },
    openGraph: {
        title: "Gaming Haven Z",
        description:
            "Database of all existing video games. You can consult games, read descriptions and add to your own collection.",
        url: "https://aerolab-challenge-steel.vercel.app/",
        siteName: "Gaming Haven Z",
        images: [
            {
                url: "/preview.webp",
                width: 806,
                height: 902,
                alt: "Homepage",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Arma tu colección de videojuegos!",
        description: "Database of all existing video games. You can consult games, read descriptions and add to your own collection.",
        images: ["/preview.webp"],
    },

    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // Pesos específicos que quieras usar
    variable: "--font-inter",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable}`}>
            <ReactQueryClientProvider>
                <body className="flex flex-col mx-auto bg-gray-100 min-h-screen font-sans">
                    <Header />
                    {children}
                </body>
            </ReactQueryClientProvider>
        </html>
    );
}
