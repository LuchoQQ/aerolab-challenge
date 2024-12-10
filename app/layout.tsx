import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/sections/Header";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
    title: "Gaming Haven Z",
    description:
        "Base de datos de todos los videojuegos existentes. Se puede consultar juegos, leer descripción y agregar a tu propia colección",
    icons: {
        icon: "/favicon.webp",
    },

    openGraph: {
        title: "Gaming Haven Z",
        description:
            "Base de datos de todos los videojuegos existentes. Se puede consultar juegos, leer descripción y agregar a tu propia colección",
        url: "https://aerolab-challenge-git-master-luchoqqs-projects.vercel.app/",
        siteName: "Gaming Haven Z",
        locale: "en_US",
        type: "website",
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
