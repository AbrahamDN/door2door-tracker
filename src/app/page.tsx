import PostCodeInput from "./components/PostCodeInput";
import VisitForm from "./components/VisitForm";
import VisitList from "./components/VisitList";
import VisitStats from "./components/VisitStats";
import { VisitsProvider } from "./context/VisitsContext";

export default function Home() {
  return (
    <VisitsProvider>
      <main>
        <div className="w-full min-h-[100vh] flex flex-col items-center">
          <div className="my-4">
            <h1 className="text-2xl">Door2Door Tracker</h1>
          </div>

          {/* <div className="container">
          <h2>What's the Post code?</h2>
          <PostCodeInput />
        </div> */}

          <div className="">
            <VisitForm />
          </div>

          <div className="">
            <VisitList />
          </div>

          <div className="w-full max-w-prose">
            <VisitStats />
          </div>
        </div>
      </main>
    </VisitsProvider>
  );
}
