package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Estoque;
import br.com.enigme.enigme.repository.EstoqueRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstoqueService {
    @Autowired
    private EstoqueRepository estoqueRepository;

    public Iterable<Estoque> listarTodos() {
        return estoqueRepository.findAll();
    }

    public ResponseEntity<Estoque> salvar(Estoque estoque) {
        if (estoque.getProduto() == null || estoque.getQuantidade() < 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(estoqueRepository.save(estoque), HttpStatus.CREATED);
    }

    public ResponseEntity<Estoque> buscarPorId(Long id) {
        return new ResponseEntity<>(estoqueRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estoque não encontrado com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Estoque estoque = estoqueRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estoque não encontrado com o ID " + id));
        estoqueRepository.delete(estoque);
    }

    public List<Estoque> buscarPorProduto(Long produtoId) {
        return estoqueRepository.findByProdutoId(produtoId);
    }

    @Transactional
    public void atualizarQuantidade(Long id, int quantidade) {
        Estoque estoque = estoqueRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Estoque não encontrado com o ID " + id));
        estoque.setQuantidade(quantidade);
        estoqueRepository.save(estoque);
    }
}