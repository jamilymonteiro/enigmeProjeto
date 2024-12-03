package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Entrega;
import br.com.enigme.enigme.entity.ItemVenda;
import br.com.enigme.enigme.entity.Transportadora;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntregaRepository extends CrudRepository<Entrega, Long> {

    @Query("SELECT e FROM Entrega e WHERE e.itemVenda.id = :itemVendaId")
    List<Entrega> findEntregasByItemVendaId(@Param("itemVendaId") Long itemVendaId);

    @Query("SELECT e FROM Entrega e WHERE e.transportadora.id = :transportadoraId")
    List<Entrega> findEntregasByTransportadoraId(@Param("transportadoraId") Long transportadoraId);

    @Query("SELECT e FROM Entrega e WHERE e.codigoRastreio = :codigoRastreio")
    List<Entrega> findEntregasByCodigoRastreio(@Param("codigoRastreio") String codigoRastreio);

    @Query("SELECT e FROM Entrega e WHERE e.itemVenda.id = :itemVendaId AND e.transportadora.id = :transportadoraId")
    List<Entrega> findEntregasByItemVendaIdAndTransportadoraId(@Param("itemVendaId") Long itemVendaId, @Param("transportadoraId") Long transportadoraId);
}