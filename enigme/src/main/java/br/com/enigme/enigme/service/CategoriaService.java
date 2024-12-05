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


    public Iterable<Categoria> listarTodos (){
        return categoriaRepository.findAll();
    }

    public ResponseEntity<Categoria> salvar (Categoria cliente){
        return new ResponseEntity<Categoria>(categoriaRepository.save(cliente), HttpStatus.OK);
    }

    public ResponseEntity<Categoria> buscarPorId(Long id) {
        return new ResponseEntity<Categoria>(categoriaRepository.findById(id).orElseThrow(),HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Void> deletar(Long id) {
        categoriaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}