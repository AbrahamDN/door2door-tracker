import PostCodeInput from "./components/PostCodeInput";
import VisitForm from "./components/VisitForm";
import VisitList from "./components/VisitList";
import { VisitsProvider } from "./context/VisitsContext";

export default function Home() {
  return (
    <VisitsProvider>
      <div className="w-full min-h-[100vh] flex flex-col items-center">
        <main>
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

          <div className="container"></div>
        </main>
      </div>
    </VisitsProvider>
  );
}
