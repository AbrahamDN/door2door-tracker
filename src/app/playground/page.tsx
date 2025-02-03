import { Toaster } from "@/components/ui/toaster";
import MyForm, { FormWrapper } from "../components/EntryForm";
import { VisitsProvider } from "../context/VisitsContext";

export default function Playground() {
  return (
    <VisitsProvider>
      <main>
        <div className="w-full min-h-[100vh] flex flex-col items-center p-4">
          <div className="w-full max-w-prose">
            <FormWrapper showCancel />
          </div>
        </div>

        <Toaster />
      </main>
    </VisitsProvider>
  );
}
