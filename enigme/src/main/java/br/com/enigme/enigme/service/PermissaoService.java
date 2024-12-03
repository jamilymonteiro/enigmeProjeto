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

    public Iterable<Permissao> listarTodos() {
        return permissaoRepository.findAll();
    }

    public ResponseEntity<Permissao> salvar(Permissao permissao) {
        if (permissao.getNome() == null || permissao.getNome().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(permissaoRepository.save(permissao), HttpStatus.CREATED);
    }

    public ResponseEntity<Permissao> buscarPorId(Long id) {
        return new ResponseEntity<>(permissaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Permissão não encontrada com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Permissao permissao = permissaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Permissão não encontrada com o ID " + id));
        permissaoRepository.delete(permissao);
    }

    public List<Permissao> buscarPorNome(String nome) {
        return permissaoRepository.findByNome(nome);
    }
}