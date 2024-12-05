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
import java.util.Optional;

@Service
public class ProdutoEstoqueService {
    @Autowired
    private ProdutoEstoqueRepository produtoEstoqueRepository;

    public List<ProdutoEstoque> listarTodos() {
        return (List<ProdutoEstoque>) produtoEstoqueRepository.findAll();
    }

    public Optional<ProdutoEstoque> buscarPorId(Long id) {
        return produtoEstoqueRepository.findById(id);
    }

    public ProdutoEstoque salvar(ProdutoEstoque produtoEstoque) {
        return produtoEstoqueRepository.save(produtoEstoque);
    }

    public ProdutoEstoque atualizar(Long id, ProdutoEstoque produtoEstoqueAtualizado) {
        Optional<ProdutoEstoque> produtoEstoqueExistente = produtoEstoqueRepository.findById(id);
        if (produtoEstoqueExistente.isPresent()) {
            ProdutoEstoque produtoEstoque = produtoEstoqueExistente.get();
            produtoEstoque.setProduto(produtoEstoqueAtualizado.getProduto());
            produtoEstoque.setPreco(produtoEstoqueAtualizado.getPreco());
            produtoEstoque.setEstoque(produtoEstoqueAtualizado.getEstoque());
            return produtoEstoqueRepository.save(produtoEstoque);
        } else {
            throw new RuntimeException("Produto em Estoque não encontrado com o ID: " + id);
        }
    }

    public ResponseEntity deletar(Long id) {
        produtoEstoqueRepository.deleteById(id);
        return new ResponseEntity("{\"mensagem\":\"Removido com sucesso\"}", HttpStatus.OK);
    }
}