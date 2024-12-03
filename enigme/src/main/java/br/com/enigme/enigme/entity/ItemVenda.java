package br.com.enigme.enigme.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class ItemVenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantidade;
    private Double valor_total;
    @ManyToOne
    private ProdutoEstoque produtoEstoque;
    @ManyToOne
    private Entrega entrega;
    @ManyToOne
    private Venda venda;
    @ManyToOne
    private Produto produto;
}
