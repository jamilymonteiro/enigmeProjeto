package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Venda;
import br.com.enigme.enigme.repository.VendaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;

    public Iterable<Venda> listarTodos() {
        return vendaRepository.findAll();
    }

    public ResponseEntity<Venda> salvar(Venda venda) {
        if (venda.getCliente() == null || venda.getEndereco() == null || venda.getData() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(vendaRepository.save(venda), HttpStatus.CREATED);
    }

    public ResponseEntity<Venda> buscarPorId(Long id) {
        return new ResponseEntity<>(vendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Venda não encontrada com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Venda venda = vendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Venda não encontrada com o ID " + id));
        vendaRepository.delete(venda);
    }

    public List<Venda> buscarPorCliente(Long clienteId) {
        return vendaRepository.findByClienteId(clienteId);
    }

    public List<Venda> buscarPorData(LocalDate data) {
        return vendaRepository.findByData(data);
    }
}