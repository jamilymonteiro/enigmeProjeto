package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.ProdutoEstoque;
import br.com.enigme.enigme.entity.Produto;
import br.com.enigme.enigme.entity.Estoque;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoEstoqueRepository extends CrudRepository<ProdutoEstoque, Long> {

    @Query("SELECT p FROM ProdutoEstoque p WHERE p.produto.id = :produtoId")
    List<ProdutoEstoque> findProdutoEstoqueByProdutoId(@Param("produtoId") Long produtoId);

    @Query("SELECT p FROM ProdutoEstoque p WHERE p.estoque.id = :estoqueId")
    List<ProdutoEstoque> findProdutoEstoqueByEstoqueId(@Param("estoqueId") Long estoqueId);

    @Query("SELECT p FROM ProdutoEstoque p WHERE p.preco BETWEEN :minPreco AND :maxPreco")
    List<ProdutoEstoque> findProdutoEstoqueByPrecoRange(@Param("minPreco") float minPreco, @Param("maxPreco") float maxPreco);

    @Query("SELECT p FROM ProdutoEstoque p WHERE p.produto.nome LIKE %:produtoNome%")
    List<ProdutoEstoque> findProdutoEstoqueByProdutoNome(@Param("produtoNome") String produtoNome);
}