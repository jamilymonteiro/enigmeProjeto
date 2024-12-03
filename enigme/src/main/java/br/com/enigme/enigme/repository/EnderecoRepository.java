package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Endereco;
import br.com.enigme.enigme.entity.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnderecoRepository extends CrudRepository<Endereco, Long> {

    @Query("SELECT e FROM Endereco e WHERE e.cliente.id = :clienteId")
    List<Endereco> findEnderecosByClienteId(@Param("clienteId") Long clienteId);

    @Query("SELECT e FROM Endereco e WHERE e.cep = :cep")
    List<Endereco> findEnderecosByCep(@Param("cep") String cep);

    @Query("SELECT e FROM Endereco e WHERE e.cidade = :cidade AND e.uf = :uf")
    List<Endereco> findEnderecosByCidadeAndUf(@Param("cidade") String cidade, @Param("uf") String uf);

    @Query("SELECT e FROM Endereco e WHERE e.cliente.id = :clienteId AND e.cidade = :cidade")
    List<Endereco> findEnderecosByClienteIdAndCidade(@Param("clienteId") Long clienteId, @Param("cidade") String cidade);
}