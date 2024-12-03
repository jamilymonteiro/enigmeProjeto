package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.ItemVenda;
import br.com.enigme.enigme.entity.ProdutoEstoque;
import br.com.enigme.enigme.entity.Venda;
import br.com.enigme.enigme.entity.Produto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemVendaRepository extends CrudRepository<ItemVenda, Long> {

    @Query("SELECT i FROM ItemVenda i WHERE i.venda.id = :vendaId")
    List<ItemVenda> findItemsByVendaId(@Param("vendaId") Long vendaId);

    @Query("SELECT i FROM ItemVenda i WHERE i.produto.id = :produtoId")
    List<ItemVenda> findItemsByProdutoId(@Param("produtoId") Long produtoId);

    @Query("SELECT i FROM ItemVenda i WHERE i.produtoEstoque.id = :produtoEstoqueId")
    List<ItemVenda> findItemsByProdutoEstoqueId(@Param("produtoEstoqueId") Long produtoEstoqueId);

    @Query("SELECT i FROM ItemVenda i WHERE i.entrega.id = :entregaId")
    List<ItemVenda> findItemsByEntregaId(@Param("entregaId") Long entregaId);

    @Query("SELECT i FROM ItemVenda i WHERE i.venda.id = :vendaId AND i.produto.id = :produtoId")
    List<ItemVenda> findItemsByVendaIdAndProdutoId(@Param("vendaId") Long vendaId, @Param("produtoId") Long produtoId);
}