package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Permissao;
import br.com.enigme.enigme.repository.PermissaoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissaoService {
    @Autowired
    private PermissaoRepository permissaoRepository;

    public Iterable<Permissao> listarTodos (){
        return permissaoRepository.findAll();
    }

    public ResponseEntity<Permissao> salvar (Permissao permissao){
        return new ResponseEntity<Permissao>(permissaoRepository.save(permissao), HttpStatus.OK);
    }

    public ResponseEntity<Permissao> buscarPorId(Long id) {
        return new ResponseEntity<Permissao>(permissaoRepository.findById(id).orElseThrow(),HttpStatus.OK);
    }

    public ResponseEntity deletar(Long id) {
        permissaoRepository.deleteById(id);
        return new ResponseEntity("{\"mensagem\":\"Removido com sucesso\"}",HttpStatus.OK);
    }
}