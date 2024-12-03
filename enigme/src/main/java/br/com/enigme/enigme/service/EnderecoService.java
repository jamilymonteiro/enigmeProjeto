package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Endereco;
import br.com.enigme.enigme.repository.EnderecoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnderecoService {
    @Autowired
    private EnderecoRepository enderecoRepository;

    public Iterable<Endereco> listarTodos() {
        return enderecoRepository.findAll();
    }

    public ResponseEntity<Endereco> salvar(Endereco endereco) {
        if (endereco.getRua() == null || endereco.getRua().isEmpty() || endereco.getCliente() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(enderecoRepository.save(endereco), HttpStatus.CREATED);
    }

    public ResponseEntity<Endereco> buscarPorId(Long id) {
        return new ResponseEntity<>(enderecoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Endereço não encontrado com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Endereco endereco = enderecoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Endereço não encontrado com o ID " + id));
        enderecoRepository.delete(endereco);
    }

    public List<Endereco> buscarPorCliente(Long clienteId) {
        return enderecoRepository.findByClienteId(clienteId);
    }
}