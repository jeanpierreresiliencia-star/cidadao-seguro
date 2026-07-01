-- ============================================
-- BANCO DE DADOS: Sistema Cidadao Seguro
-- ============================================

CREATE DATABASE IF NOT EXISTS cidadao_seguro 
    DEFAULT CHARACTER SET utf8mb4 
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE cidadao_seguro;

-- ============================================
-- TABELA: Cidadao
-- ============================================
CREATE TABLE IF NOT EXISTS cidadao (
    id_cidadao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    data_nascimento DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABELA: Agente
-- ============================================
CREATE TABLE IF NOT EXISTS agente (
    id_agente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    matricula VARCHAR(50) NOT NULL UNIQUE,
    cargo VARCHAR(50) NOT NULL,
    turno VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABELA: Bairro
-- ============================================
CREATE TABLE IF NOT EXISTS bairro (
    id_bairro INT AUTO_INCREMENT PRIMARY KEY,
    nome_bairro VARCHAR(100) NOT NULL,
    zona VARCHAR(50) NOT NULL,
    populacao_estimada INT,
    observacoes TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABELA: Ocorrencia (tabela central de relacionamento)
-- ============================================
CREATE TABLE IF NOT EXISTS ocorrencia (
    id_ocorrencia INT AUTO_INCREMENT PRIMARY KEY,
    id_cidadao INT NOT NULL,
    id_agente INT NOT NULL,
    id_bairro INT NOT NULL,
    tipo_ocorrencia VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_hora DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Aberta',
    
    CONSTRAINT fk_ocorrencia_cidadao 
        FOREIGN KEY (id_cidadao) REFERENCES cidadao(id_cidadao)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    
    CONSTRAINT fk_ocorrencia_agente 
        FOREIGN KEY (id_agente) REFERENCES agente(id_agente)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    
    CONSTRAINT fk_ocorrencia_bairro 
        FOREIGN KEY (id_bairro) REFERENCES bairro(id_bairro)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índices para performance
CREATE INDEX idx_ocorrencia_status ON ocorrencia(status);
CREATE INDEX idx_ocorrencia_data_hora ON ocorrencia(data_hora);
