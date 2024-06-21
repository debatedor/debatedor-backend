# Debatedor back-end

### 🎬 Video do projeto rodando:
https://youtu.be/R3nk2A4OLHQ

---
### 🚀 Como rodar o projeto na sua máquina
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

5. ⚙️ Configure as as variáveis de ambiente<br>
- Faça uma cópia do arquivo ".env.example"
- Renomeie o arquivo copiado para ".env"
- Coloque as informações de usuário, senha, banco de dados, ip, porta e demais informações na URL do banco

6. 🛢️ Crie o banco com:
```npx prisma migrate dev```

7. ✅ Rode o projeto com:
```npm run dev```
(vai estar rodando na porta 3131)


---

### 👨‍💻 Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/jef-loppes-reis"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/88293401?v=4" width="100px;"/><br /><sub><b>Jeferson Lopes</b></sub></a><br /><a>👨‍💻</a></td>
    <td align="center"><a href="https://github.com/DanielL159"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/106317396?v=4" width="100px;"/><br /><sub><b>Daniel Luiz</b></sub></a><br /><a>👨‍💻</a></td>
    <td align="center"><a href="https://github.com/juliameireles"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/132387639?v=4" width="100px;"/><br /><sub><b>Julia Meireles</b></sub></a><br /><a>👨‍💻</a></td>
        <td align="center"><a href="https://github.com/Vilehauk"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/151260459?v=4" width="100px;"/><br /><sub><b>Davi Martins</b></sub></a><br /><a>👨‍💻</a></td>
     <td align="center"><a href="https://github.com/Pedro-Chaves2505"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/107230091?v=4" width="100px;"/><br /><sub><b>Pedro Chaves</b></sub></a><br /><a>👨‍💻</a></td>
        <td align="center"><a href="https://github.com/GustavoHoreste"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/101297032?v=4" width="100px;"/><br /><sub><b>Gustavo Horestee</b></sub></a><br /><a>👨‍💻</a></td>
  </tr>
</table>
