# 📝 Todo Nest API

API RESTful de gerenciamento de tarefas desenvolvida com **NestJS** e **TypeScript**, com foco em organização, boas práticas e validações robustas.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- TypeScript
- UUID
- class-validator / class-transformer
- Jest (testes unitários)

---

## 📦 Instalação e Execução

1. **Clone o repositório:**
```bash
git clone https://github.com/ordozgoite/todo-nest.git
cd todo-nest
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute em modo de desenvolvimento:**
```bash
npm run start:dev
```

---

## 🔁 Endpoints da API

### 📍 `GET /tasks`
Lista todas as tarefas.

---

### 📍 `POST /tasks`
Cria uma nova tarefa.

**Body JSON:**
```json
{
  "title": "Estudar NestJS",
  "description": "Implementar o CRUD da aplicação"
}
```

**Resposta:**
```json
{
  "id": "uuid",
  "title": "Estudar NestJS",
  "description": "Implementar o CRUD da aplicação",
  "completed": false,
  "status": "pending",
  "createdAt": "2025-06-20T21:00:00.000Z"
}
```

---

### 📍 `PATCH /tasks/:id`
Atualiza o status de uma tarefa.

**Body JSON:**
```json
{
  "completed": true
}
```

---

### 📍 `DELETE /tasks/:id`
Remove uma tarefa pelo ID.

---

## ✅ Funcionalidades

- Armazenamento em memória
- CRUD completo de tarefas
- Validação de entrada com DTOs
- Tratamento de erros com HTTP status apropriados
- Testes unitários com Jest

---

## 🧪 Executar testes

```bash
npm run test
```

---

## 👨‍💻 Autor

Desenvolvido por **Victor Rafael Ordozgoite** como parte de um desafio técnico profissional.

---
