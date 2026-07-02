import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

export const App = () => {
  const [records, setRecords] = useState<{ id: number; text: string }[]>([]);
  return (
    <div>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => {
          setRecords((prev) => [
            ...prev,
            {
              id: prev.length,
              text: "login",
            },
          ]);
        }}
      >
        login
      </button>
      {!!records.length && (
        <div>
          {records?.map((record) => (
            <div key={record?.id}>{record?.text}</div>
          ))}
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
