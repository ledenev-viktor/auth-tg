interface ITelegramUserAuth {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface ITelegramLogin {
  auth?: (
    options: {
      bot_id?: string | number;
      request_access?: string;
      lang?: string;
    },
    callback?: (user?: ITelegramUserAuth) => void,
  ) => void;
}

interface Window {
  Telegram?: {
    Login?: ITelegramLogin;
  };
}
