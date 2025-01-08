export default function proxyConfig(env: Env) {
  return {
    [env.API_PATH]: {
      target: env.API_URL,
      secure: false,
      changeOrigin: true,
      timeout: 2000,
    },
    '/VladimirShestakov': {
      target: 'https://raw.githubusercontent.com',
      secure: false,
      changeOrigin: true,
    }
  };
}
