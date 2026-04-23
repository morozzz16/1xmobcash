Перед первым запуском dev запустить - npm install

Чтобы запустить только Разработку (Dev):
docker-compose --profile dev up

Чтобы запустить только Продакшн (Prod):
docker-compose --profile prod up -d

Чтобы остановить всё:
docker-compose --profile dev --profile prod down