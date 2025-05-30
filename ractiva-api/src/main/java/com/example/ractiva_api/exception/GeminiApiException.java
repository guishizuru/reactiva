package com.example.ractiva_api.exception;

public class GeminiApiException extends RuntimeException {

    public GeminiApiException() {
      super(String.format("""
              Erro ao gerar a carta. Por favor, tente novamente mais tarde.
       """));
    }
    public GeminiApiException(String mensagem) {
      super(mensagem);
    }

    public GeminiApiException(String mensagem, Throwable causa) {
        super(mensagem, causa);
    }



}
