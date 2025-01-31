"use client";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";

const PostCodeInput = () => {
  const [postCode, setPostCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load post code from local storage when the component mounts
  useEffect(() => {
    const savedPostCode = localStorage.getItem("postCode");
    if (savedPostCode) {
      setPostCode(savedPostCode);
    }
  }, []);

  const handlePostCode = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newPostCode = e.target.value;
    setPostCode(newPostCode);
    setSubmitted(false); // Reset submitted to false on postCode change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("postCode", postCode); // Save to local storage
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex fap-2">
      <input
        type="text"
        placeholder="M9"
        value={postCode} // Bind the input value to postCode state
        onChange={handlePostCode}
      />
      <input
        type="submit"
        value={!submitted ? "Enter" : "Submitted"}
        className={clsx(submitted ? "bg-green-400" : "bg-blue-400", "p-2")}
        disabled={submitted}
      />
    </form>
  );
};

export default PostCodeInput;
