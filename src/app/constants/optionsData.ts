export interface OptionsType {
  value: string;
  icon: string;
  closed?: boolean;
}

export const doorStatusOptions: OptionsType[] = [
  { value: "No Answer", icon: "" },
  { value: "Payer Unavailable", icon: "" },
  { value: "Pitched", icon: "" },
  { value: "Callback", icon: "📞" },
  { value: "Closed", icon: "🤑", closed: true },
];
export const pitchedOptions: OptionsType[] = [
  { value: "Intro", icon: "✅" },
  { value: "Qualify", icon: "✅✅" },
  { value: "Present", icon: "✅✅✅" },
];
