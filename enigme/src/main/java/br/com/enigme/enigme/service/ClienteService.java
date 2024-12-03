package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Cliente;
import br.com.enigme.enigme.repository.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public Iterable<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public ResponseEntity<Cliente> salvar(Cliente cliente) {
        if (cliente.getNome() == null || cliente.getNome().isEmpty() || cliente.getEmail() == null || cliente.getEmail().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(clienteRepository.save(cliente), HttpStatus.CREATED);
    }

    public ResponseEntity<Cliente> buscarPorId(Long id) {
        return new ResponseEntity<>(clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com o ID " + id));
        clienteRepository.delete(cliente);
    }

    public ResponseEntity<Cliente> buscarPorLogin(String login) {
        Optional<Cliente> cliente = clienteRepository.findByLogin(login);
        return cliente.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}