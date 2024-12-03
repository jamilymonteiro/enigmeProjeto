package br.com.enigme.enigme.repository;

import br.com.enigme.enigme.entity.Avaliacao;
import br.com.enigme.enigme.entity.Cliente;
import br.com.enigme.enigme.entity.Produto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends CrudRepository<Avaliacao, Long> {

    @Query("SELECT a FROM Avaliacao a WHERE a.cliente.id = :clienteId")
    List<Avaliacao> findAvaliacoesByClienteId(@Param("clienteId") Long clienteId);

    @Query("SELECT a FROM Avaliacao a WHERE a.produto.id = :produtoId")
    List<Avaliacao> findAvaliacoesByProdutoId(@Param("produtoId") Long produtoId);

    @Query("SELECT a FROM Avaliacao a WHERE a.nota >= :notaMinima")
    List<Avaliacao> findAvaliacoesWithMinNota(@Param("notaMinima") int notaMinima);

    @Query("SELECT new br.com.enigme.enigme.dto.AvaliacaoDTO(a.cliente.nome, a.nota, a.comentario) " +
            "FROM Avaliacao a JOIN a.cliente c WHERE a.produto.id = :produtoId")
    List<AvaliacaoDTO> getAvaliacoesComDetalhesProduto(@Param("produtoId") Long produtoId);
}
