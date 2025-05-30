package com.example.ractiva_api.config;


import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class GeminiConfig {

    @Value("${gemini.api.url}")
    private String urlBase;

    @Value("${gemini.api.key}")
    private String apiKey;

    public String getUrlSecret() {
        String texto = urlBase + apiKey;
        return texto;
    }

}
