package com.example.ractiva_api.model.modelRequest;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConteudoRequest {
    @JsonProperty("parts")
    private List<PartesRequest> partes;
}
