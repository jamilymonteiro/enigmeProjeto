package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Entrega;
import br.com.enigme.enigme.repository.EntregaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntregaService {
    @Autowired
    private EntregaRepository entregaRepository;

    public Iterable<Entrega> listarTodos() {
        return entregaRepository.findAll();
    }

    public ResponseEntity<Entrega> salvar(Entrega entrega) {
        if (entrega.getItemVenda() == null || entrega.getTransportadora() == null || entrega.getCodigoRastreio() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(entregaRepository.save(entrega), HttpStatus.CREATED);
    }

    public ResponseEntity<Entrega> buscarPorId(Long id) {
        return new ResponseEntity<>(entregaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entrega não encontrada com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Entrega entrega = entregaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entrega não encontrada com o ID " + id));
        entregaRepository.delete(entrega);
    }

    public List<Entrega> buscarPorItemVenda(Long itemVendaId) {
        return entregaRepository.findByItemVendaId(itemVendaId);
    }
}