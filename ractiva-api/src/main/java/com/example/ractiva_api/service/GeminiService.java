package com.example.ractiva_api.service;

import com.example.ractiva_api.config.GeminiConfig;
import com.example.ractiva_api.exception.GeminiApiException;
import com.example.ractiva_api.model.modelRequest.ConteudoRequest;
import com.example.ractiva_api.model.modelRequest.GeminiRequest;
import com.example.ractiva_api.model.modelRequest.PartesRequest;
import com.example.ractiva_api.model.modelResponse.GeminiReponseHandler;
import com.example.ractiva_api.model.modelResponse.GeminiResponse;
import com.example.ractiva_api.repository.CartaRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GeminiService {

    @Autowired
    private CartaRepository cartaRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private GeminiConfig configuracoesGemini;

    @Autowired
    private GeminiReponseHandler geminiReponseHandler;

    @Autowired
    private CartaBuilderService cartaBuilderService;


    public String gerarCarta(String prompt) throws JsonProcessingException {

        GeminiRequest request = new GeminiRequest(
                List.of(new ConteudoRequest(
                        List.of(new PartesRequest(
                                prompt)))
        ));

        String jsonBody = objectMapper.writeValueAsString(request);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                configuracoesGemini.getUrlSecret(),
                HttpMethod.POST,
                entity,
                String.class
        );

        try {
            GeminiResponse geminiResponse = geminiReponseHandler.validarEConverter(response);
            String textoGerado = geminiReponseHandler.extrairTexto(geminiResponse);
            cartaBuilderService.criarCarta(prompt, textoGerado);

            return textoGerado;

        } catch (Exception e) {
            throw new GeminiApiException();
        }
    }
}