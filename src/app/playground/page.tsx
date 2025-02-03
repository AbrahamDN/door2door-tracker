"use client";
import { OutreachProvider } from "../context/OutreachContext";

export default function Playground() {
  return (
    <OutreachProvider>
      <main>playground</main>
    </OutreachProvider>
  );
}
