package com.example.ractiva_api.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cartas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Carta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String prompt;

    @Column(columnDefinition = "TEXT")
    private String resposta;

    private Long criadoEm;
}