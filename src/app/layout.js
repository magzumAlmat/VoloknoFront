import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";

import ReduxProvider from "@/store/provider";
import ThemeProviderWrapper from "@/store/themeProvider";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  // userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

// export const metadata = {
//   title: "Купить опто-волоконный кабель",
//   description:
//     "Купить волконно-оптический кабель, Купить телекоммуникационные шкафы, Купить силовые кабеля Купить электрический провод Купить оптические кросы Купить оптические муфты",
//   verification: {
//     google: "Qmi_pB30aPPO__Ht7NT-D8VY8E8xKifhiMwMRybaur4",
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <ReduxProvider>
        <body>
          <ThemeProviderWrapper>
            {/* <Header /> */}
            <main>{children}</main>
            <Footer />
          </ThemeProviderWrapper>
        </body>
      </ReduxProvider>

      {/* <GoogleAnalytics gaId="AW-16464823771" /> */}
    </html>
  );
}
