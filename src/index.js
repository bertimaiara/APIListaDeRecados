import express from "express";

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
  usuarios.push({
    id: Math.floor(Math.random() * 6584123),
    nome: usuario.nome,
    email: usuario.email,
    senha: usuario.senha,
  });
  response.json("Usuário criado com sucesso");
});

// Read - lê todos os usuários
app.get("/usuarios", (request, response) => {
  //para mostrar a informação ao front-end:
  response.status(200).json(usuarios);
})

// Read - um usuário só (route params)
app.get('/usuarios/:id', (request, response)=> {
  const id = request.params.id;
  const usuario = usuarios.find(usuario => usuario.id == id);
  if(usuario){
    response.json(usuario)
} else {
    response.json("Id invalido")
}
})

// Update - edita/atualiza informações do usuário
app.put('/usuarios/:id', (request, response) => {
  const usuario = request.body;
  const id = Number(request.params.id);
  const indiceUsuario = usuarios.findIndex(usuario => usuario.id === id)
  
  if (indiceUsuario !== -1) {
    usuarios[indiceUsuario] = {
      id: id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
    }
    response.status(201).json(usuarios[indiceUsuario]);  
  } else {
    response.status(401).json()
  }
})


// Delete
app.delete('/usuarios/:id', (request, response) => {
  const id = Number(request.params.id);
  const indiceUsuario = usuarios.findIndex(usuario => usuario.id === id)
  if (indiceUsuario !== -1) {
    usuarios.splice(indiceUsuario, 1);
    response.status(200).json()
  } else {
    response.status(401).json()
  }
})
//----------------------------------------------------------------------------------------------

// CRUD PARA CRIAR RECADO
let recados = [];

//Create - POST
app.post("/usuarios/:id/recados", (request, response) => {
  const recado = request.body;
  recados.push({
    id: Math.floor(Math.random() * 6584123),
    titulo: recado.titulo,
    descricao: recado.descricao,
  });
  response.json("Recado criado com sucesso");
});

// Read - lê todos os recados
app.get("/usuarios/:id/recados", (request, response) => {
  //para mostrar a informação ao front-end:
  response.status(200).json(recados);
})

// Read - um recado só (route params)
app.get('/usuarios/:id/recados/:id', (request, response)=> {
  const id = request.params.id;
  const recado = recados.find(recado => recado.id == id);
  if(recado){
    response.json(recado)
} else {
    response.json("Id invalido")
}
})

// Update - edita/atualiza informações do usuário
app.put('/usuarios/:id/recados/:id', (request, response) => {
  const recado = request.body;
  const id = Number(request.params.id);
  const indiceRecado = recados.findIndex(recado => recado.id === id)
  
  if (indiceRecado !== -1) {
    recados[indiceRecado] = {
      id: id,
      titulo: recado.titulo,
      descricao: recado.descricao,
    }
    response.status(201).json("Recado editado com sucesso!");  
  } else {
    response.status(401).json()
  }
})

// Delete
app.delete('/usuarios/:id/recados/:id', (request, response) => {
  const id = Number(request.params.id);
  const indiceRecado = recados.findIndex(recado => recado.id === id)
  if (indiceRecado !== -1) {
    recados.splice(indiceRecado, 1);
    response.status(200).json("Recado deletado com sucesso!")
  } else {
    response.status(401).json()
  }
})
//----------------------------------------------------------------------------------------------