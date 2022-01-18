# klass
Klass é uma rede social desenvolvida com base na versão inicial do Facebook

## Link dos slides
https://docs.google.com/presentation/d/1L08zwgyAoURMAS5nGXjmjmdgP30i0GBikaaC6d_iuOQ/edit?usp=sharing

# Como rodar

Instalar Docker (se quiser)
https://docs.docker.com/engine/install/ubuntu/

Instalar Docker-Compose
https://docs.docker.com/compose/install/

Lembrete - Como iniciar docker
```
sudo service docker start
```

Subir o banco de dados
```
sudo docker-compose -f docker/database/docker-compose.yaml up -d
```

Iniciar o sistema
```
cd service
npm run start:dev
```

Iniciar o app
```
npm start
```
