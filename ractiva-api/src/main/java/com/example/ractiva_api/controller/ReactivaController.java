package com.example.ractiva_api.controller;

import com.example.ractiva_api.model.PromptRequest;
import com.example.ractiva_api.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/reactiva")
@CrossOrigin(origins = "http://localhost:4200")
public class ReactivaController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping
    public String gerarCarta(@RequestBody PromptRequest request){
        return geminiService.gerarCarta(request.getPrompt());
    }

}
