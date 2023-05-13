import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.get("/", (request, response) => {
  return response.json("OK");
});
app.listen(5555, () => console.log("Servidor rodando"));

// CRUD PARA CRIAR USUÁRIO
let usuarios = [];

//Create - POST
app.post("/usuarios", (request, response) => {
  const usuario = request.body;
  const saltRounds = 10;

  bcrypt.hash(usuario.senha, saltRounds, function (err, hash) {
    if (hash) {
      usuarios.push({
        id: Math.floor(Math.random() * 6584123),
        nome: usuario.nome,
        email: usuario.email,
        senha: hash,
      });
    } else {
      return response.status(400).json(`Ocorreu um erro ${err}`);
    }
  });

  return response.json("Usuário criado com sucesso");
});

// Read - lê todos os usuários
app.get("/usuarios", (request, response) => {
  response.status(200).json(usuarios);
  //para mostrar a informação ao front-end:
});
//----------------------------------------------------------------------------------------------
//LOGIN
app.post("/usuarios/login", async (request, response) => {
    const login = request.body;
    const email = login.email;
    const senha = login.senha;

    const usuario = usuarios.find((usuario) => usuario.email === email);
    if (usuario) {
      return response.status(200).json("Usuário válido");
    } else {
      return response.status(402).json("Por favor, digite um email válido");
    }
  });

//----------------------------------------------------------------------------------------------

// CRUD PARA CRIAR RECADO
let recados = [];

//Create - POST
app.post("/usuarios/login/:id/recados", (request, response) => {
  const recado = request.body;
  recados.push({
    id: Math.floor(Math.random() * 6584123),
    titulo: recado.titulo,
    descricao: recado.descricao,
  });
  return response.json("Recado criado com sucesso");
});

// Read - lê todos os recados
app.get("/usuarios/login/:id/recados", (request, response) => {
  //para mostrar a informação ao front-end:
  return response.status(200).json(recados);
});

// Read - um recado só (route params)
app.get(
  "/usuarios/login/:id/recados/:id",
  validaIdRecado,
  (request, response) => {
    const id = request.params.id;
    const recado = recados.find((recado) => recado.id == id);
    if (recado) {
      return response.json(recado);
    } else {
      return response.json("Id invalido");
    }
  }
);

// Update - edita/atualiza informações do usuário
app.put(
  "/usuarios/login/:id/recados/:id",
  validaIdRecado,
  (request, response) => {
    const recado = request.body;
    const id = Number(request.params.id);
    const indiceRecado = recados.findIndex((recado) => recado.id === id);

    if (indiceRecado !== -1) {
      recados[indiceRecado] = {
        id: id,
        titulo: recado.titulo,
        descricao: recado.descricao,
      };
      return response.status(201).json("Recado editado com sucesso!");
    } else {
      return response.status(401).json();
    }
  }
);

// Delete
app.delete("/usuarios/login/:id/recados/:id", (request, response) => {
  const id = Number(request.params.id);
  const indiceRecado = recados.findIndex((recado) => recado.id === id);
  if (indiceRecado !== -1) {
    recados.splice(indiceRecado, 1);
    return response.status(200).json("Recado deletado com sucesso!");
  } else {
    return response.status(401).json();
  }
});
//----------------------------------------------------------------------------------------------
//MIDDLEWARES:
function validaIdRecado(request, response, next) {
  const id = request.params.id;
  //para validar se o id existe:
  const index = recados.findIndex((recado) => recado.id == id);
  if (index == -1) {
    return response.status(400).json("Por favor, passe um ID válido");
  } else {
    next();
  }
}
