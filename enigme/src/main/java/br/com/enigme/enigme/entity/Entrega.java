package br.com.enigme.enigme.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Entrega {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private ItemVenda itemVenda;
    private int quantidade;
    @ManyToOne
    private Transportadora transportadora;
    private String codigoRastreio;

}
