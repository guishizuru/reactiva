package com.example.ractiva_api.model.modelRequest;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PartesRequest {
    @JsonProperty("text")
    private String mensagem;
}
