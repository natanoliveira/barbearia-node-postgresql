const constants = require('./constants');

const helpers = {
    validateEmail(email) {
        // Verifica se o email não está vazio
        if (!email) {
            return false;
        }

        // Verifica se há exatamente um "@" no email
        const posicaoArroba = email.indexOf('@');
        if (posicaoArroba === -1 || posicaoArroba !== email.lastIndexOf('@')) {
            return false;
        }

        // Verifica se há pelo menos um ponto "." após o "@"
        const posicaoPonto = email.indexOf('.', posicaoArroba);
        if (posicaoPonto === -1 || posicaoPonto === email.length - 1) {
            return false;
        }

        return true;

        // Expressão regular para validar o formato de um endereço de e-mail
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // return regex.test(email);
    },

    validatePhone(phone) {

        const response = [];

        // Remove todos os caracteres que não são dígitos
        const numeroLimpo = phone.replace(/\D/g, '');

        // Verifica se o número tem exatamente 11 dígitos
        if (numeroLimpo.length !== 11) {
            response.push('O telefone não possui 11 dígitos');
        }

        // Verifica se o número começa com "9" (código de celular no Brasil)
        if (numeroLimpo.length == 11) {
            const num = numeroLimpo.substring(2, 11);

            if (!num.startsWith('9')) {
                response.push('O telefone não inicia com o nono dígito (9)');
            }
        }

        if (numeroLimpo.length == 9 && !numeroLimpo.startsWith('9')) {
            response.push('O telefone não inicia com o nono dígito (9)');
        }

        // Verifica se todos os dígitos são iguais (não são permitidos números repetidos)
        if (/^(\d)\1+$/.test(numeroLimpo)) {
            response.push('O telefone possui todos os números iguais');
        }

        // Verifica se o DDD é válido (códigos de DDD válidos no Brasil)
        const dddsValidos = ['11', '12', '13', '14', '15', '16', '17', '18', '19',
            '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38',
            '41', '42', '43', '44', '45', '46', '47', '48', '49',
            '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69',
            '71', '73', '74', '75', '77', '79',
            '81', '82', '83', '84', '85', '86', '87', '88', '89',
            '91', '92', '93', '94', '95', '96', '97', '98', '99'];

        const ddd = numeroLimpo.substring(0, 2);

        if (!dddsValidos.includes(ddd)) {
            response.push('O telefone não possui DDD');
        }

        // Se todas as verificações passaram, o número é considerado válido
        return response;
    },

    validateCPF(cpf) {
        // Remove todos os caracteres que não são dígitos
        const cpfLimpo = cpf.replace(/\D/g, '');

        // Verifica se o CPF tem 11 dígitos
        if (cpfLimpo.length !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais (não são permitidos CPFs com todos os dígitos iguais)
        if (/^(\d)\1+$/.test(cpfLimpo)) {
            return false;
        }

        // Calcula o primeiro dígito verificador do CPF
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;

        // Verifica se o primeiro dígito verificador calculado é igual ao primeiro dígito verificador fornecido
        if (digitoVerificador1 !== parseInt(cpfLimpo.charAt(9))) {
            return false;
        }

        // Calcula o segundo dígito verificador do CPF
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;

        // Verifica se o segundo dígito verificador calculado é igual ao segundo dígito verificador fornecido
        if (digitoVerificador2 !== parseInt(cpfLimpo.charAt(10))) {
            return false;
        }

        // Se todas as verificações passarem, o CPF é considerado válido
        return true;
    },

    convertCurrency(valorEmMoeda) {
        // Remove os caracteres não numéricos (pontos, vírgulas e espaços)
        const valorLimpo = valorEmMoeda.replace(/[^\d,]/g, '');

        // Substitui a vírgula decimal por ponto
        const valorComPonto = valorLimpo.replace(',', '.');

        // Converte o valor para float
        const valorFloat = parseFloat(valorComPonto);

        return valorFloat;
    },

    validateBorn(dataNascimento) {
        // Verifica se a data de nascimento foi fornecida
        if (!dataNascimento) {
            return false;
        }

        // Verifica se a data de nascimento está no formato correto (DD/MM/AAAA)
        const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regexData.test(dataNascimento)) {
            return false;
        }

        // Divide a data em dia, mês e ano
        const [dia, mes, ano] = dataNascimento.split('/');

        // Cria um objeto Date com a data de nascimento
        const data = new Date(ano, mes - 1, dia); // Note que o mês é indexado em zero (janeiro é 0, fevereiro é 1, etc.)

        // Verifica se a data de nascimento é válida
        if (data.getFullYear() != ano || data.getMonth() + 1 != mes || data.getDate() != dia) {
            return false;
        }

        // Verifica se a data de nascimento é anterior à data atual
        const dataAtual = new Date();
        if (data > dataAtual) {
            return false;
        }

        // Só pode ser acima de 2 anos
        if (dataAtual.getFullYear() - ano <= constants.IDADE_PERMITIDA) {
            return false;
        }

        // Se todas as verificações passarem, a data de nascimento é considerada válida
        return true;
    },

    formatDate(dataNascimento) {
        // Verifica se a data de nascimento foi fornecida
        if (!dataNascimento) {
            return null; // Retorna null se a data não foi fornecida
        }

        // Verifica se a data de nascimento está no formato correto (DD/MM/AAAA)
        const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regexData.test(dataNascimento)) {
            return null; // Retorna null se a data não está no formato correto
        }

        // Divide a data em dia, mês e ano
        const [dia, mes, ano] = dataNascimento.split('/');

        // Formata a data no formato YYYY-MM-DD
        const dataFormatada = `${ano}-${mes}-${dia}`;

        return dataFormatada;
    },

    getAge(dataNascimento) {
        const dataAtual = new Date();
        const nascimento = new Date(dataNascimento);

        let idade = dataAtual.getFullYear() - nascimento.getFullYear();
        const mesAtual = dataAtual.getMonth() + 1;
        const mesNascimento = nascimento.getMonth() + 1;

        // Verifica se ainda não fez aniversário este ano
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && dataAtual.getDate() < nascimento.getDate())) {
            idade--;
        }

        return idade;
    },

    validateDate(input) {
        // Verifica se a data foi fornecida
        if (!input) {
            return false;
        }

        // Verifica se a data está no formato correto (DD/MM/AAAA)
        // const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
        const regexData = /^\d{4}-\d{2}-\d{2}$/;

        if (!regexData.test(input)) {
            return false;
        }

        // Divide a data em dia, mês e ano
        const [ano, mes, dia] = input.split('-');

        // Cria um objeto Date com a data
        const data = new Date(ano, mes - 1, dia); // Note que o mês é indexado em zero (janeiro é 0, fevereiro é 1, etc.)

        // Verifica se a data é válida
        if (data.getFullYear() != ano || data.getMonth() + 1 != mes || data.getDate() != dia) {
            console.log('invalida');
            return false;
        }

        // Se todas as verificações passarem, a data de nascimento é considerada válida
        return true;
    },

};

module.exports = helpers;