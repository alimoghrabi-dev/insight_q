"use client";

import ReactConfetti from "react-confetti";
import { useConfetti } from "@/hooks/use-confetti";

const ConfettiProvider = () => {
  const confetti = useConfetti();

  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[150]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
};

export default ConfettiProvider;
