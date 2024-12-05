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

    public Iterable<Cliente> listarTodos (){
        return clienteRepository.findAll();
    }

    public ResponseEntity<Cliente> salvar (Cliente cliente){
        return new ResponseEntity<Cliente>(clienteRepository.save(cliente), HttpStatus.OK);
    }

    public ResponseEntity<Cliente> buscarPorId(Long id) {
        return new ResponseEntity<Cliente>(clienteRepository.findById(id).orElseThrow(),HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Void> deletar(Long id) {
        clienteRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}