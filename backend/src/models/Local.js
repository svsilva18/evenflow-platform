const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Local = sequelize.define('Local', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco:{
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
            enderecoValido(value) {
                if (value && typeof value === 'object') {
                    const camposObrigatorios = ['cep', 'rua', 'bairro', 'numero', 'cidade', 'estado'];
                    for (const campo of camposObrigatorios) {
                        if (!value[campo]) {
                            throw new Error(`O campo ${campo} é obrigatório.`);
                        }
                    }
                    if (value.estado.length !== 2) {
                        throw new Error('Estado deve ter 2 caracteres.');
                    }
                }
            }
        }        
    },
    capacidade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    status:{
        type: DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'ativo'
    }
});

module.exports = Local;