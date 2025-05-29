package com.example.ractiva_api.service;


import com.example.ractiva_api.Model.Carta;
import com.example.ractiva_api.config.Configuracoes;
import com.example.ractiva_api.repository.CartaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);

    private final WebClient webClient = WebClient.builder()
            .baseUrl(Configuracoes.URL_GEMINI)
            .build();

    @Autowired
    private CartaRepository cartaRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Mono<String> gerarCarta(String prompt) {
        try {
            String escapedPrompt = objectMapper.writeValueAsString(prompt);

            String jsonBody = String.format("""
                    {
                      "contents": [
                        {
                          "parts": [
                            {
                              "text": %s
                            }
                          ]
                        }
                      ]
                    }
                    """, escapedPrompt);

            return webClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/v1beta/models/gemini-2.0-flash:generateContent")
                            .queryParam("key", apiKey)
                            .build())
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(jsonBody)
                    .retrieve()
                    .onStatus(status -> status.isError(), response -> {
                        return response.bodyToMono(String.class).flatMap(errorBody -> {
                            logger.error("Erro da API Gemini (HTTP {}): {}", response.statusCode(), errorBody);
                            return Mono.error(new RuntimeException("Erro da API Gemini: " + errorBody));
                        });
                    })
                    .bodyToMono(String.class)
                    .flatMap(resposta -> {
                        logger.info("Resposta crua da Gemini API:\n{}", resposta);

                        try {
                            var root = objectMapper.readTree(resposta);
                            var textoGerado = root.path("candidates")
                                    .get(0)
                                    .path("content")
                                    .path("parts")
                                    .get(0)
                                    .path("text")
                                    .asText();

                            Carta carta = Carta.builder()
                                    .prompt(prompt)
                                    .resposta(textoGerado)
                                    .criadoEm(System.currentTimeMillis())
                                    .build();

                            cartaRepository.save(carta);

                            return Mono.just(textoGerado);

                        } catch (Exception e) {
                            logger.error("Erro ao parsear a resposta Gemini", e);
                            return Mono.error(e);
                        }
                    })
                    .doOnError(e -> logger.error("Erro ao chamar Gemini API", e));

        } catch (Exception e) {
            logger.error("Erro ao preparar a requisição para Gemini API", e);
            return Mono.error(e);
        }
    }
}
