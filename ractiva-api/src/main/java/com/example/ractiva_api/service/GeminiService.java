package com.example.ractiva_api.service;


import com.example.ractiva_api.Model.Carta;
import com.example.ractiva_api.repository.CartaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
 ;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    //TODO COLOCAR COMO VARIAVEL STATIC FINAL BASE URL

    private static final String GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    private final WebClient webClient = WebClient.builder()
            .baseUrl(GEMINI_BASE_URL)
            .build();

    @Autowired
    private CartaRepository cartaRepository;

    public Mono<String> gerarCarta(String prompt) {
        String jsonBody = String.format( """
        {
          "contents": [
            {
              "parts": [
                {
                  "text": "%s"
                }
              ]
            }
          ]
        }
        """,prompt);

        return webClient.post()
                .uri(uriBuilder ->uriBuilder.queryParam("key",apiKey).build())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(jsonBody)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(resposta -> {
                    Carta carta = Carta.builder()
                            .prompt(prompt)
                            .resposta(resposta)
                            .criadoEm(System.currentTimeMillis())
                            .build();
                    cartaRepository.save(carta);
                    return Mono.just(resposta);
                });

    }
}
