import { useCallback, useEffect, useState } from "react";

let isLoadingTelegramAuth = false;

export const useTelegramAuth = (botId?: number, enabled = true) => {
  const [isReady, setIsReady] = useState(() => {
    // Проверяем сразу при инициализации
    return !!window.Telegram?.Login?.auth;
  });

  useEffect(() => {
    if (!enabled) return;

    if (window.Telegram?.Login?.auth) {
      queueMicrotask(() => {
        setIsReady(true);
      });

      return;
    }

    const existingScript = document.querySelector(
      'script[src*="telegram-widget"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => setIsReady(true));

      return;
    }

    if (isLoadingTelegramAuth) return;
    isLoadingTelegramAuth = true;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.onload = () => setIsReady(true);
    script.onerror = () => {
      isLoadingTelegramAuth = false;
      console.error("Failed to load Telegram script");
    };
    document.body.appendChild(script);
  }, [enabled]);

  const login = useCallback(
    ({
      onSuccess,
      onError,
    }: {
      onSuccess?: (data?: ITelegramUserAuth) => void;
      onError?: (error?: Error) => void;
    }) => {
      if (!window.Telegram?.Login?.auth) {
        onError?.(new Error("TELEGRAM_API_UNAVAILABLE"));

        return;
      }

      window.Telegram.Login.auth(
        { bot_id: botId, request_access: "write", lang: "ru" },
        (data) => {
          console.log("data", data);
          if (!data) {
            onError?.(new Error("TELEGRAM_AUTH_ERROR"));
          } else {
            onSuccess?.(data);
          }
        },
      );
    },
    [botId],
  );

  return { login, isReady };
};
