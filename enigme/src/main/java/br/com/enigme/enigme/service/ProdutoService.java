package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Produto;
import br.com.enigme.enigme.repository.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    public Iterable<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public ResponseEntity<Produto> salvar(Produto produto) {
        if (produto.getNome() == null || produto.getDescricao() == null || produto.getPreco() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(produtoRepository.save(produto), HttpStatus.CREATED);
    }

    public ResponseEntity<Produto> buscarPorId(Long id) {
        return new ResponseEntity<>(produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com o ID " + id));
        produtoRepository.delete(produto);
    }

    public List<Produto> buscarPorCategoria(Long categoriaId) {
        return produtoRepository.findByCategoriaId(categoriaId);
    }

    public List<Produto> buscarPorPreco(Double preco) {
        return produtoRepository.findByPreco(preco);
    }

    public List<Produto> buscarPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }
}