package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Pagamento;
import br.com.enigme.enigme.entity.ItemVenda;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagamentoRepository extends CrudRepository<Pagamento, Long> {

    /**
     * Busca pagamentos pelo ID do item de venda.
     */
    @Query("SELECT p FROM Pagamento p WHERE p.itemVenda.id = :itemVendaId")
    List<Pagamento> findByItemVendaId(@Param("itemVendaId") Long itemVendaId);

    /**
     * Busca pagamentos pelo método de pagamento.
     */
    @Query("SELECT p FROM Pagamento p WHERE p.metodo_pagamento = :metodoPagamento")
    List<Pagamento> findByMetodoPagamento(@Param("metodoPagamento") String metodoPagamento);

    /**
     * Busca pagamentos pelo status do pagamento.
     */
    @Query("SELECT p FROM Pagamento p WHERE p.status_pagamento = :statusPagamento")
    List<Pagamento> findByStatusPagamento(@Param("statusPagamento") String statusPagamento);

    /**
     * Busca pagamentos pela data do pagamento.
     */
    @Query("SELECT p FROM Pagamento p WHERE p.data_pagamento = :dataPagamento")
    List<Pagamento> findByDataPagamento(@Param("dataPagamento") String dataPagamento);

    /**
     * Busca pagamentos pelo valor pago.
     */
    @Query("SELECT p FROM Pagamento p WHERE p.valor_pago = :valorPago")
    List<Pagamento> findByValorPago(@Param("valorPago") String valorPago);
}