import React, { useEffect, useState } from "react";

let alertHandle = null;

export const showCustomAlert = (message) => {
  if (alertHandle) {
    alertHandle(message);
  }
};

const CustomAlerts = () => {
  const [mess, setmess] = useState("");
  const [visible, setvisible] = useState(true);

  useEffect(() => {
    alertHandle = (message) => {
      setmess(message);
      setvisible(true);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex justify-center pt-12 bg-black/50 z-50">
      <div className="bg-[#202124] text-white rounded-lg p-6 w-80 h-40">
        <p className="text-sm">{mess}</p>

        <div className="flex justify-end mt-10">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm"
            onClick={() => setvisible(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlerts;
