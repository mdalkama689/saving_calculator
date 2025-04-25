import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="text-center text-black py-5">
      <p>© {new Date().getFullYear()} SavingsGoal. All rights reserved.</p>
    </div>
  );
};
