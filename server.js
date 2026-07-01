const express = require("express");
const path = require("path");
const { Cidadao, Agente, Bairro, Ocorrencia } = require("./models/classes");

const app = express();
const porta = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// --- ROTAS DE CADASTRO (POST) ---

app.post("/cadastrar-cidadao", (req, res) => {
    const { nome, cpf, email, telefone, endereco, data_nascimento } = req.body;
    const novoCidadao = new Cidadao(nome, cpf, email, telefone, endereco, data_nascimento);
    novoCidadao.cadastrar((erro) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send("Erro ao cadastrar cidadão.");
        }
        res.redirect("/cadastro-cidadao.html?sucesso=true");
    });
});

app.post("/cadastrar-agente", (req, res) => {
    const { nome, cpf, email, telefone, matricula, cargo, turno } = req.body;
    const novoAgente = new Agente(nome, cpf, email, telefone, matricula, cargo, turno);
    novoAgente.cadastrar((erro) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send("Erro ao cadastrar agente.");
        }
        res.redirect("/cadastro-agente.html?sucesso=true");
    });
});

app.post("/cadastrar-bairro", (req, res) => {
    const { nome_bairro, zona, populacao_estimada, observacoes } = req.body;
    const novoBairro = new Bairro(nome_bairro, zona, populacao_estimada, observacoes);
    novoBairro.cadastrar((erro) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send("Erro ao cadastrar bairro.");
        }
        res.redirect("/cadastro-bairro.html?sucesso=true");
    });
});

app.post("/cadastrar-ocorrencia", (req, res) => {
    const { id_cidadao, id_agente, id_bairro, tipo_ocorrencia, descricao, data, hora, status } = req.body;
    const dataHora = `${data} ${hora}:00`; // Formata para o banco (DATETIME)
    
    const novaOcorrencia = new Ocorrencia(id_cidadao, id_agente, id_bairro, tipo_ocorrencia, descricao, dataHora, status);
    novaOcorrencia.cadastrar((erro) => {
        if (erro) {
            console.error(erro);
            return res.status(500).send("Erro ao cadastrar ocorrência.");
        }
        res.redirect("/cadastro-ocorrencia.html?sucesso=true");
    });
});

// --- ROTAS PARA PREENCHER OS SELECTS (GET) ---

app.get("/api/cidadaos", (req, res) => {
    Cidadao.listar((erro, resultados) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar cidadãos" });
        res.json(resultados);
    });
});

app.get("/api/agentes", (req, res) => {
    Agente.listar((erro, resultados) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar agentes" });
        res.json(resultados);
    });
});

app.get("/api/bairros", (req, res) => {
    Bairro.listar((erro, resultados) => {
        if (erro) return res.status(500).json({ erro: "Erro ao buscar bairros" });
        res.json(resultados);
    });
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});