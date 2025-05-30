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
}
