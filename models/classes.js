// ============================================
// models/classes.js
// Sistema Cidadão Seguro - Classes POO
// ============================================

const mysql = require("mysql2");

// Configuração da conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "alunolab",
    database: "cidadao_seguro"
});

conexao.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar ao banco de dados:", erro);
        return;
    }
    console.log("Conectado ao banco de dados MySQL!");
});

// ============================================
// CLASSE: Cidadao
// ============================================
class Cidadao {
    constructor(nome, cpf, email, telefone, endereco, dataNascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
    }

    cadastrar(callback) {
        const sql = `INSERT INTO cidadao (nome, cpf, email, telefone, endereco, data_nascimento) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        const valores = [this.nome, this.cpf, this.email, this.telefone, this.endereco, this.dataNascimento];
        
        conexao.query(sql, valores, (erro, resultado) => {
            if (erro) return callback(erro);
            callback(null, resultado);
        });
    }

    static listar(callback) {
        const sql = "SELECT id_cidadao, nome FROM cidadao ORDER BY nome";
        conexao.query(sql, (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados);
        });
    }
}

// ============================================
// CLASSE: Agente
// ============================================
class Agente {
    constructor(nome, cpf, email, telefone, matricula, cargo, turno) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.matricula = matricula;
        this.cargo = cargo;
        this.turno = turno;
    }

    cadastrar(callback) {
        const sql = `INSERT INTO agente (nome, cpf, email, telefone, matricula, cargo, turno) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const valores = [this.nome, this.cpf, this.email, this.telefone, this.matricula, this.cargo, this.turno];
        
        conexao.query(sql, valores, (erro, resultado) => {
            if (erro) return callback(erro);
            callback(null, resultado);
        });
    }

    static listar(callback) {
        const sql = "SELECT id_agente, nome FROM agente ORDER BY nome";
        conexao.query(sql, (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados);
        });
    }
}

// ============================================
// CLASSE: Bairro
// ============================================
class Bairro {
    constructor(nomeBairro, zona, populacaoEstimada, observacoes) {
        this.nomeBairro = nomeBairro;
        this.zona = zona;
        this.populacaoEstimada = populacaoEstimada;
        this.observacoes = observacoes;
    }

    cadastrar(callback) {
        const sql = `INSERT INTO bairro (nome_bairro, zona, populacao_estimada, observacoes) 
                     VALUES (?, ?, ?, ?)`;
        const valores = [this.nomeBairro, this.zona, this.populacaoEstimada, this.observacoes];
        
        conexao.query(sql, valores, (erro, resultado) => {
            if (erro) return callback(erro);
            callback(null, resultado);
        });
    }

    static listar(callback) {
        const sql = "SELECT id_bairro, nome_bairro FROM bairro ORDER BY nome_bairro";
        conexao.query(sql, (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados);
        });
    }
}

// ============================================
// CLASSE: Ocorrencia
// ============================================
class Ocorrencia {
    constructor(idCidadao, idAgente, idBairro, tipoOcorrencia, descricao, dataHora, status) {
        this.idCidadao = idCidadao;
        this.idAgente = idAgente;
        this.idBairro = idBairro;
        this.tipoOcorrencia = tipoOcorrencia;
        this.descricao = descricao;
        this.dataHora = dataHora;
        this.status = status;
    }

    cadastrar(callback) {
        const sql = `INSERT INTO ocorrencia 
                     (id_cidadao, id_agente, id_bairro, tipo_ocorrencia, descricao, data_hora, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const valores = [
            this.idCidadao, this.idAgente, this.idBairro, 
            this.tipoOcorrencia, this.descricao, this.dataHora, this.status
        ];
        
        conexao.query(sql, valores, (erro, resultado) => {
            if (erro) return callback(erro);
            callback(null, resultado);
        });
    }

    static listar(callback) {
        const sql = `
            SELECT 
                o.id_ocorrencia, o.tipo_ocorrencia, o.descricao, o.data_hora, o.status,
                c.nome AS nome_cidadao, a.nome AS nome_agente, b.nome_bairro
            FROM ocorrencia o
            INNER JOIN cidadao c ON o.id_cidadao = c.id_cidadao
            INNER JOIN agente a ON o.id_agente = a.id_agente
            INNER JOIN bairro b ON o.id_bairro = b.id_bairro
            ORDER BY o.data_hora DESC
        `;
        conexao.query(sql, (erro, resultados) => {
            if (erro) return callback(erro);
            callback(null, resultados);
        });
    }
}

module.exports = { Cidadao, Agente, Bairro, Ocorrencia };