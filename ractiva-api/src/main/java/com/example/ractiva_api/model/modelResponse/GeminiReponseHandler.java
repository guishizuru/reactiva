package com.example.ractiva_api.model.modelResponse;

import com.example.ractiva_api.exception.GeminiApiException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class GeminiReponseHandler {

    private final ObjectMapper objectMapper;

    public GeminiResponse validarEConverter(ResponseEntity<String> response) {
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            try {
                return objectMapper.readValue(response.getBody(), GeminiResponse.class);
            } catch (JsonProcessingException e) {
                throw new GeminiApiException("Erro ao converter a resposta da API Gemini", e);
            }
        } else {
            throw new GeminiApiException("A resposta da API Gemini foi inválida ou vazia.");
        }
    }

    public String extrairTexto(GeminiResponse geminiResponse) {
        try {
            return geminiResponse
                    .getOpcoes().get(0)
                    .getConteudoResponse()
                    .getPartesResponseList().get(0)
                    .getMensagemGerada();
        } catch (Exception e) {
            throw new GeminiApiException("Erro ao extrair mensagem gerada da resposta Gemini", e);
        }
    }
}