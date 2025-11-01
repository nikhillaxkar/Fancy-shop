import { Suspense } from "react";
import OrderForm from "./OrderForm"; // Naye component ko import karein

export default function OrderPage() {
  return (
    <div>
      <Suspense fallback={<p className="text-center mt-10">Loading form...</p>}>
        <OrderForm />
      </Suspense>
    </div>
  );
}