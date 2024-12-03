package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Venda;
import br.com.enigme.enigme.entity.Cliente;
import br.com.enigme.enigme.entity.Endereco;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VendaRepository extends CrudRepository<Venda, Long> {

    @Query("SELECT v FROM Venda v WHERE v.cliente.id = :clienteId")
    List<Venda> findVendasByClienteId(@Param("clienteId") Long clienteId);

    @Query("SELECT v FROM Venda v WHERE v.endereco.id = :enderecoId")
    List<Venda> findVendasByEnderecoId(@Param("enderecoId") Long enderecoId);

    @Query("SELECT v FROM Venda v WHERE v.data = :data")
    List<Venda> findVendasByData(@Param("data") LocalDate data);

    @Query("SELECT v FROM Venda v WHERE v.cliente.id = :clienteId AND v.data = :data")
    List<Venda> findVendasByClienteIdAndData(@Param("clienteId") Long clienteId, @Param("data") LocalDate data);

    @Query("SELECT v FROM Venda v WHERE v.cliente.id = :clienteId AND v.endereco.id = :enderecoId")
    List<Venda> findVendasByClienteAndEndereco(@Param("clienteId") Long clienteId, @Param("enderecoId") Long enderecoId);
}
