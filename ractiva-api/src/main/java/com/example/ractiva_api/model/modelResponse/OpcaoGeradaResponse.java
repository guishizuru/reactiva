package com.example.ractiva_api.model.modelResponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OpcaoGeradaResponse {

    @JsonProperty("content")
    private ConteudoResponse conteudoResponse;
}
