"use client";
import { Toaster } from "@/components/ui/toaster";
import MyForm, { FormWrapper } from "../components/EntryForm";
import { VisitsProvider } from "../context/VisitsContext";
import AddressForm from "../components/AddressForm";
import ExampleUsage from "../components/ExampleUsage";
import { OutreachProvider } from "../context/OutreachContext";

export default function Playground() {
  return (
    <OutreachProvider>
      <main>
        <div className="w-full min-h-[100vh] flex flex-col items-center p-4">
          <div className="w-full max-w-prose">
            <AddressForm
              onSubmit={(data) => {
                console.log("Address Data:", data);
              }}
            />

            <FormWrapper />
          </div>

          <div className="w-full max-w-prose">
            <ExampleUsage />
          </div>
        </div>

        <Toaster />
      </main>
    </OutreachProvider>
  );
}
