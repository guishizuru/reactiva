package com.example.ractiva_api.service;

import com.example.ractiva_api.config.Configuracoes;
import com.example.ractiva_api.model.Carta;
import com.example.ractiva_api.repository.CartaRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final Logger logger = LoggerFactory.getLogger(GeminiService.class);

    @Autowired
    private CartaRepository cartaRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String gerarCarta(String prompt) {
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

            String url = Configuracoes.URL_GEMINI + "/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                logger.info("Resposta crua da Gemini API:\n{}", response.getBody());

                JsonNode root = objectMapper.readTree(response.getBody());
                String textoGerado = root.path("candidates")
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

                return textoGerado;
            } else {
                logger.error("Erro na chamada da Gemini API: Status {} - Body {}", response.getStatusCode(), response.getBody());
                throw new RuntimeException("Erro na chamada da Gemini API: " + response.getBody());
            }
        } catch (Exception e) {
            logger.error("Erro ao gerar carta com Gemini", e);
            throw new RuntimeException("Erro ao gerar carta com Gemini", e);
        }
    }
}
