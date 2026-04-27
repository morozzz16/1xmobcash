/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Добавляем конфигурацию webpack для работы Hot Reload в Docker
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000, // Проверять изменения каждую секунду
      aggregateTimeout: 300, // Задержка перед сборкой (защита от двойных срабатываний)
    }
    return config
  },
}

export default nextConfig;