package com.example.ractiva_api.controller;

import com.example.ractiva_api.dtos.CartaResponseDto;
import com.example.ractiva_api.dtos.PromptRequestDto;

import com.example.ractiva_api.service.CartaBuilderService;
import com.example.ractiva_api.service.GeminiService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/reactiva")
@CrossOrigin(origins = "http://localhost:4200")
public class ReactivaController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private CartaBuilderService cartaBuilderService;

    @PostMapping
    public ResponseEntity<CartaResponseDto> gerarCarta(@RequestBody PromptRequestDto request) throws JsonProcessingException {
        return ResponseEntity.ok(new CartaResponseDto(geminiService.gerarCarta(cartaBuilderService.getGerarPrompt(request.getPrompt()))));
    }

}
