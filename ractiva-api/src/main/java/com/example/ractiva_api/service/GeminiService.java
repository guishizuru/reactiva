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
        String jsonBody = String.format("""
                {
                  "prompt": {
                    "text": "%s"
                  },
                  "temperature": 0.7,
                  "maxOutputTokens": 256
                }
                """, prompt);


        return webClient.post()
                .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(jsonBody)
                .retrieve()
                .bodyToMono(String.class)
                .map(resposta -> {
                    try {
                        Object json = objectMapper.readValue(resposta, Object.class);
                        ObjectWriter writer = objectMapper.writerWithDefaultPrettyPrinter();
                        String jsonFormatado = writer.writeValueAsString(json);
                        logger.info("Resposta Gemini formatada:\n{}", jsonFormatado);
                    } catch (Exception e) {
                        logger.info("Resposta Gemini (raw): {}", resposta);
                    }

                    Carta carta = Carta.builder()
                            .prompt(prompt)
                            .resposta(resposta)
                            .criadoEm(System.currentTimeMillis())
                            .build();
                    cartaRepository.save(carta);
                    return resposta;
                })
                .doOnError(e -> logger.error("Erro ao chamar Gemini API", e));
    }
}
