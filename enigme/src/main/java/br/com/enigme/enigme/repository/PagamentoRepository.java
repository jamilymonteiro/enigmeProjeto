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

    @Query("SELECT p FROM Pagamento p WHERE p.itemVenda.id = :itemVendaId")
    List<Pagamento> findPagamentosByItemVendaId(@Param("itemVendaId") Long itemVendaId);

    @Query("SELECT p FROM Pagamento p WHERE p.metodo_pagamento = :metodoPagamento")
    List<Pagamento> findPagamentosByMetodoPagamento(@Param("metodoPagamento") String metodoPagamento);

    @Query("SELECT p FROM Pagamento p WHERE p.status_pagamento = :statusPagamento")
    List<Pagamento> findPagamentosByStatusPagamento(@Param("statusPagamento") String statusPagamento);

    @Query("SELECT p FROM Pagamento p WHERE p.data_pagamento = :dataPagamento")
    List<Pagamento> findPagamentosByDataPagamento(@Param("dataPagamento") String dataPagamento);

    @Query("SELECT p FROM Pagamento p WHERE p.valor_pago = :valorPago")
    List<Pagamento> findPagamentosByValorPago(@Param("valorPago") String valorPago);
}