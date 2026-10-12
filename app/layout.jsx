import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "The Lake Side by SR Group | Confidential Project Dossier",
  description: "Sanand's most exclusive weekend sanctuary. Unlock the master plan, price matrix and architectural brochure on WhatsApp.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
