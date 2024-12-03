package br.com.enigme.enigme.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private ItemVenda itemVenda;
    private String metodo_pagamento;
    private String status_pagamento;
    private String data_pagamento;
    private String valor_pago;
}
