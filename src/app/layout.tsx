import { IBM_Plex_Sans } from "next/font/google";

import type { Metadata, Viewport } from "next";
import type { ReactElement, ReactNode } from "react";

import "normalize.css";
import "@/styles/global.css";
import "@/styles/widget.css";


export const metadata: Metadata = {
    title: "Widget",
    description: "Widget for a speaking"
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0
};

const ibmPlexSans = IBM_Plex_Sans({
    subsets: [
        "latin",
        "cyrillic"
    ],
    weight: [
        "400",
        "700"
    ],
    display: "swap"
});

export default function Layout({ children }: { children: ReactNode }): ReactElement {
    return (
        <html lang="ru" className={ibmPlexSans.className}>
            <head>
                <base target="_blank" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
