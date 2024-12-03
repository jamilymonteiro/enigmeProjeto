package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Categoria;
import br.com.enigme.enigme.repository.CategoriaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public Iterable<Categoria> listarTodos() {
        return categoriaRepository.findAll();
    }

    public ResponseEntity<Categoria> salvar(Categoria categoria) {
        if (categoria.getNome() == null || categoria.getNome().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(categoriaRepository.save(categoria), HttpStatus.CREATED);
    }

    public ResponseEntity<Categoria> buscarPorId(Long id) {
        return new ResponseEntity<>(categoriaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada com o ID " + id));
        categoriaRepository.delete(categoria);
    }
}