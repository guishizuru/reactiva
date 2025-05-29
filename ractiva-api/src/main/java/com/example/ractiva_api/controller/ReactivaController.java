package com.example.ractiva_api.controller;

import com.example.ractiva_api.Model.PromptRequest;
import com.example.ractiva_api.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/carta")
public class ReactivaController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping
    public Mono<String> gerarCarta(@RequestBody PromptRequest request){
        return geminiService.gerarCarta(request.getPrompt());
    }

}
