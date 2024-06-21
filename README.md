### 🚀 Como rodar o projeto 
Para rodar o projeto você vai precisar ter o docker, docker compose e npm(ou pnpm) instalados na sua máquina

1. 🪞 Faça um clone do projeto com:<br>
```git clone https://github.com/debatedor/debatedor-backend```

2. 📁 Entre na pasta do projeto com:<br>
```cd debatedor-backend```

3. ⬇️ Instale as dependências com:<br>
```npm install```

4. 🐳 Com o docker configurado, execute:<br>
```docker compose up -d```
(sem o "-" mesmo)

5. 🛢️ Crie o banco com:
```npx prisma migrate dev```

6. ✅ Rode o projeto com:
```npm run dev```
(vai estar rodando na porta 3131)
