package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.ProdutoEstoque;
import br.com.enigme.enigme.repository.ProdutoEstoqueRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoEstoqueService {
    @Autowired
    private ProdutoEstoqueRepository produtoEstoqueRepository;

    public Iterable<ProdutoEstoque> listarTodos() {
        return produtoEstoqueRepository.findAll();
    }

    public ResponseEntity<ProdutoEstoque> salvar(ProdutoEstoque produtoEstoque) {
        if (produtoEstoque.getProduto() == null || produtoEstoque.getEstoque() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(produtoEstoqueRepository.save(produtoEstoque), HttpStatus.CREATED);
    }

    public ResponseEntity<ProdutoEstoque> buscarPorId(Long id) {
        return new ResponseEntity<>(produtoEstoqueRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ProdutoEstoque não encontrado com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        ProdutoEstoque produtoEstoque = produtoEstoqueRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ProdutoEstoque não encontrado com o ID " + id));
        produtoEstoqueRepository.delete(produtoEstoque);
    }

    public List<ProdutoEstoque> buscarPorProduto(Long produtoId) {
        return produtoEstoqueRepository.findByProdutoId(produtoId);
    }

    public List<ProdutoEstoque> buscarPorEstoque(Long estoqueId) {
        return produtoEstoqueRepository.findByEstoqueId(estoqueId);
    }

    public List<ProdutoEstoque> buscarPorPreco(float preco) {
        return produtoEstoqueRepository.findByPreco(preco);
    }
}