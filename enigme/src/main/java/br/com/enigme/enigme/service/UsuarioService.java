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

    public Iterable<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public ResponseEntity<Usuario> salvar(Usuario usuario) {
        if (usuario.getNome() == null || usuario.getCpf() == null || usuario.getLogin() == null ||
                usuario.getSenha() == null || usuario.getEmail() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(usuarioRepository.save(usuario), HttpStatus.CREATED);
    }

    public ResponseEntity<Usuario> buscarPorId(Long id) {
        return new ResponseEntity<>(usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o ID " + id));
        usuarioRepository.delete(usuario);
    }

    public List<Usuario> buscarPorNome(String nome) {
        return usuarioRepository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Usuario> buscarPorPermissao(Long permissaoId) {
        return usuarioRepository.findByPermissaoId(permissaoId);
    }

    public ResponseEntity<Usuario> autenticar(String login, String senha) {
        Usuario usuario = usuarioRepository.findByLoginAndSenha(login, senha)
                .orElseThrow(() -> new EntityNotFoundException("Usuário ou senha inválidos"));
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }
}