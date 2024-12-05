package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Avaliacao;
import br.com.enigme.enigme.repository.AvaliacaoRepository;
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

    public Iterable<Avaliacao> listarTodos (){
        return avaliacaoRepository.findAll();
    }

    public ResponseEntity<Avaliacao> salvar (Avaliacao avaliacaoProduto){
        return new ResponseEntity<Avaliacao>(avaliacaoRepository.save(avaliacaoProduto), HttpStatus.OK);
    }

    public ResponseEntity<Avaliacao> buscarPorId(Long id) {
        return new ResponseEntity<Avaliacao>(avaliacaoRepository.findById(id).orElseThrow(),HttpStatus.OK);
    }

    public ResponseEntity deletar(Long id) {
        avaliacaoRepository.deleteById(id);
        return new ResponseEntity("{\"mensagem\":\"Removido com sucesso\"}",HttpStatus.OK);
    }
}