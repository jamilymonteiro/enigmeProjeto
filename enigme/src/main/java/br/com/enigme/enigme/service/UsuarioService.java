package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Usuario;
import br.com.enigme.enigme.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public ResponseEntity<Usuario> salvar (Usuario usuario){
        return new ResponseEntity<Usuario>(usuarioRepository.save(usuario), HttpStatus.OK);
    }

    public Iterable<Usuario> listarTodos (){
        return usuarioRepository.findAll();
    }
    public ResponseEntity<Usuario> buscarPorId(Long id) {
        return new ResponseEntity<Usuario>(usuarioRepository.findById(id).orElseThrow(),HttpStatus.OK);
    }

    public ResponseEntity deletar(Long id) {
        usuarioRepository.deleteById(id);
        return new ResponseEntity("{\"mensagem\":\"Removido com sucesso\"}",HttpStatus.OK);
    }
}