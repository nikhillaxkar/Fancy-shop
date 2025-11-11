import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast"; // ✅ import this

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Your main layout */}
        <Header />
        <main className="min-h-screen p-6">{children}</main>
        <Footer />

        {/* ✅ Add Toaster here (shows popups globally) */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
