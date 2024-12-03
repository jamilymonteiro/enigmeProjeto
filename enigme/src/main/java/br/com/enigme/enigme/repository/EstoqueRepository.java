package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Estoque;
import br.com.enigme.enigme.entity.Produto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstoqueRepository extends CrudRepository<Estoque, Long> {

    @Query("SELECT e FROM Estoque e WHERE e.produto.id = :produtoId")
    List<Estoque> findEstoquesByProdutoId(@Param("produtoId") Long produtoId);

    @Query("SELECT e FROM Estoque e WHERE e.quantidade >= :quantidadeMinima")
    List<Estoque> findEstoquesWithMinQuantidade(@Param("quantidadeMinima") int quantidadeMinima);

    @Query("SELECT e FROM Estoque e WHERE e.produto.id = :produtoId AND e.quantidade > 0")
    List<Estoque> findAvailableEstoquesByProdutoId(@Param("produtoId") Long produtoId);
}
