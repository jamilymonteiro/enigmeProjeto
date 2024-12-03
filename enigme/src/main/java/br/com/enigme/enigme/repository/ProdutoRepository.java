package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Produto;
import br.com.enigme.enigme.entity.Categoria;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends CrudRepository<Produto, Long> {

    @Query("SELECT p FROM Produto p WHERE p.nome = :nome")
    List<Produto> findProdutosByNome(@Param("nome") String nome);

    @Query("SELECT p FROM Produto p WHERE p.categoria.id = :categoriaId")
    List<Produto> findProdutosByCategoriaId(@Param("categoriaId") Long categoriaId);

    @Query("SELECT p FROM Produto p WHERE p.preco >= :minPreco AND p.preco <= :maxPreco")
    List<Produto> findProdutosByPrecoRange(@Param("minPreco") Double minPreco, @Param("maxPreco") Double maxPreco);

    @Query("SELECT p FROM Produto p WHERE p.estoque > :quantidadeEstoque")
    List<Produto> findProdutosComEstoqueMaiorQue(@Param("quantidadeEstoque") int quantidadeEstoque);

    @Query("SELECT p FROM Produto p WHERE p.descricao LIKE %:descricao%")
    List<Produto> findProdutosByDescricao(@Param("descricao") String descricao);
}