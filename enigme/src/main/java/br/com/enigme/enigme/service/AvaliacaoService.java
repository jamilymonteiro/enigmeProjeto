package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Avaliacao;
import br.com.enigme.enigme.repository.AvaliacaoRepository;
import br.com.enigme.enigme.dto.AvaliacaoDTO;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvaliacaoService {
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public Iterable<Avaliacao> listarTodos() {
        return avaliacaoRepository.findAll();
    }

    public List<AvaliacaoDTO> getAvaliacoesPorProduto(Long produtoId) {
        return avaliacaoRepository.findAvaliacoesByProdutoId(produtoId);
    }

    public ResponseEntity<Avaliacao> salvar(Avaliacao avaliacao) {
        if (avaliacao.getCliente() == null || avaliacao.getProduto() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(avaliacaoRepository.save(avaliacao), HttpStatus.CREATED);
    }

    public ResponseEntity<Avaliacao> buscarPorId(Long id) {
        return new ResponseEntity<>(avaliacaoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Avaliação não encontrada com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Avaliacao avaliacao = avaliacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Avaliação não encontrada com o ID " + id));
        avaliacaoRepository.delete(avaliacao);
    }
}