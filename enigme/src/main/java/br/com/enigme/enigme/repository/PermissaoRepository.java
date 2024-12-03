package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Permissao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissaoRepository extends CrudRepository<Permissao, Long> {

    @Query("SELECT p FROM Permissao p WHERE p.nome = :nome")
    List<Permissao> findPermissoesByNome(@Param("nome") String nome);

    @Query("SELECT p FROM Permissao p WHERE p.id = :id")
    Permissao findPermissaoById(@Param("id") Long id);

    @Query("SELECT p FROM Permissao p ORDER BY p.nome ASC")
    List<Permissao> findAllPermissoesOrderedByName();
}