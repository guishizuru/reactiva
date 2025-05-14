import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:8080/',
});

export const enviarMensagem = async (mensagem) => {
    try {
        const response = await api.post('/romantico', { mensagem });
        return response.data;
    } catch (erro) {
        console.error('Erro ao enviar mensagem', erro);
        throw erro;
    }
};

