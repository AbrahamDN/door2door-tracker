export interface OptionsType {
  value: string;
  icon: string;
  closed?: boolean;
}

type DoorStatusOptionsProps = {
  noAnswer: OptionsType;
  unavailable: OptionsType;
  pitched: OptionsType;
  callback: OptionsType;
  closed: OptionsType;
};
type PitchedOptionsProps = {
  intro: OptionsType;
  qualify: OptionsType;
  present: OptionsType;
};

export const doorStatusOptions: DoorStatusOptionsProps = {
  noAnswer: { value: "No Answer", icon: "" },
  unavailable: { value: "Payer Unavailable", icon: "" },
  pitched: { value: "Pitched", icon: "" },
  callback: { value: "Callback", icon: "📞" },
  closed: { value: "Closed", icon: "🤑", closed: true },
};
export const pitchedOptions: PitchedOptionsProps = {
  intro: { value: "Intro", icon: "✅" },
  qualify: { value: "Qualify", icon: "✅✅" },
  present: { value: "Present", icon: "✅✅✅" },
};
