package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.ImagemProduto;
import br.com.enigme.enigme.entity.Produto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagemProdutoRepository extends CrudRepository<ImagemProduto, Long> {

    @Query("SELECT i FROM ImagemProduto i WHERE i.produto.id = :produtoId")
    List<ImagemProduto> findImagensByProdutoId(@Param("produtoId") Long produtoId);

    @Query("SELECT i FROM ImagemProduto i WHERE i.enderecoArquivo LIKE %:enderecoArquivo%")
    List<ImagemProduto> findImagensByEnderecoArquivo(@Param("enderecoArquivo") String enderecoArquivo);
}