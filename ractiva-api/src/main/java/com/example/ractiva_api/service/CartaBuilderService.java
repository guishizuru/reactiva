package com.example.ractiva_api.service;
import com.example.ractiva_api.model.Carta;
import com.example.ractiva_api.repository.CartaRepository;
import org.springframework.stereotype.Service;

@Service
public class CartaBuilderService {

    private final CartaRepository cartaRepository;

    public CartaBuilderService(CartaRepository cartaRepository) {
        this.cartaRepository = cartaRepository;
    }

    public void criarCarta(String prompt, String resposta) {
        Carta carta = Carta.builder()
                .prompt(prompt)
                .resposta(resposta)
                .criadoEm(System.currentTimeMillis())
                .build();

        cartaRepository.save(carta);

    }

    public String getGerarPrompt(String prompt) {

        return String.format("""
                Você é um assistente que escreve cartas curtas e sentimentais com base no que o usuário deseja expressar. 
                Sempre responda apenas com o conteúdo da carta, sem explicações, saudações ou instruções extras.
                
                Inclua o nome ou a pessoa mencionada (como “minha mãe”, “João”, “meu namorado”) se o usuário indicar para 
                quem é a carta.
                
                A carta deve ser sensível, natural, emocional e fácil de ler, com no máximo 700 caracteres. Use linguagem 
                simples, bonita e direta. Nunca fuja do tema principal do sentimento descrito pelo usuário (como amor, 
                saudade, carinho, perdão ou gratidão). 
                Nunca fale de outros assuntos.
                
                Pedido do usuário:%s
                """, prompt);
    }
}
