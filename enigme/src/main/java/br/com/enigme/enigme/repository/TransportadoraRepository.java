package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Transportadora;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransportadoraRepository extends CrudRepository<Transportadora, Long> {

    @Query("SELECT t FROM Transportadora t WHERE t.nome LIKE %:nome%")
    List<Transportadora> findTransportadorasByNome(@Param("nome") String nome);

    @Query("SELECT t FROM Transportadora t WHERE t.contato LIKE %:contato%")
    List<Transportadora> findTransportadorasByContato(@Param("contato") String contato);

    @Query("SELECT t FROM Transportadora t WHERE t.nome = :nome AND t.contato = :contato")
    List<Transportadora> findTransportadoraByNomeAndContato(@Param("nome") String nome, @Param("contato") String contato);
}