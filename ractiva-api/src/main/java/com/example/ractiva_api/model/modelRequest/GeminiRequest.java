package com.example.ractiva_api.model.modelRequest;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeminiRequest {
    @JsonProperty("contents")
    private List<ConteudoRequest> conteudoRequests;
}
