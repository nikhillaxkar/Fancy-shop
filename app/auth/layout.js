import AuthLayoutClient from "@/components/AuthLayoutClient";

export const metadata = {
  title: "Authentication | FancyShop",
  description: "Login or Register to access the admin dashboard",
};

export default function AuthLayout({ children }) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}
