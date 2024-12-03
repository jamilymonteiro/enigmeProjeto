package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Transportadora;
import br.com.enigme.enigme.repository.TransportadoraRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportadoraService {
    @Autowired
    private TransportadoraRepository transportadoraRepository;

    public Iterable<Transportadora> listarTodos() {
        return transportadoraRepository.findAll();
    }

    public ResponseEntity<Transportadora> salvar(Transportadora transportadora) {
        if (transportadora.getNome() == null || transportadora.getContato() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(transportadoraRepository.save(transportadora), HttpStatus.CREATED);
    }

    public ResponseEntity<Transportadora> buscarPorId(Long id) {
        return new ResponseEntity<>(transportadoraRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transportadora não encontrada com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Transportadora transportadora = transportadoraRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transportadora não encontrada com o ID " + id));
        transportadoraRepository.delete(transportadora);
    }

    public List<Transportadora> buscarPorNome(String nome) {
        return transportadoraRepository.findByNomeContainingIgnoreCase(nome);
    }
}