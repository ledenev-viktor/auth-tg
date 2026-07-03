import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { useTelegramAuth } from "./hooks/useTelegramAuth";

export const App = () => {
  const [records, setRecords] = useState<{ id: number; text: string }[]>([]);
  const botId = import.meta.env.VITE_TELEGRAM_AUTH_BOT_ID;

  const { login, isReady: isReadyTgAuth } = useTelegramAuth(botId);

  return (
    <div>
      <button
        disabled={!isReadyTgAuth}
        style={{ cursor: isReadyTgAuth ? "pointer" : "default" }}
        onClick={() => {
          login?.({
            onSuccess: (data) => {
              if (data?.username || data?.id) {
                console.log("Ошибка 1", data);

                return;
              }

              console.log("success", data);

              setRecords((prev) => [
                ...prev,
                {
                  id: prev.length,
                  text: `${data?.username} ${data?.id}`,
                },
              ]);
            },
            onError: (err) => {
              console.log("Ошибка 2", err);
            },
          });
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
