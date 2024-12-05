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

    public Iterable<Estoque> listarTodos (){
        return estoqueRepository.findAll();
    }

    public ResponseEntity<Estoque> salvar (Estoque estoque){
        return new ResponseEntity<Estoque>(estoqueRepository.save(estoque), HttpStatus.OK);
    }

    public ResponseEntity<Estoque> buscarPorId(Long id) {
        return new ResponseEntity<Estoque>(estoqueRepository.findById(id).orElseThrow(),HttpStatus.OK);
    }

    public ResponseEntity deletar(Long id) {
        estoqueRepository.deleteById(id);
        return new ResponseEntity("{\"mensagem\":\"Removido com sucesso\"}",HttpStatus.OK);
    }

}