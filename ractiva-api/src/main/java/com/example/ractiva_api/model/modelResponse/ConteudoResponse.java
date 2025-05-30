package com.example.ractiva_api.model.modelResponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ConteudoResponse {

    @JsonProperty("parts")
    private List<PartesResponse> partesResponseList;
}
