package br.com.enigme.enigme.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ProdutoEstoque {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Produto produto;
    private float preco;
    @ManyToOne
    private Estoque estoque;
}
