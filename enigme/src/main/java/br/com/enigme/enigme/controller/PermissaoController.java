package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Permissao;
import br.com.enigme.enigme.service.PermissaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PermissaoController {

    @Autowired
    private PermissaoService permissaoService;

    @PostMapping("/permissao")
    public ResponseEntity<Permissao> salvar(@RequestBody Permissao permissao) {
        return permissaoService.salvar(permissao);
    }

    @GetMapping("/permissao")
    public Iterable<Permissao> listarTodos() {
        return permissaoService.listarTodos();
    }

    @GetMapping("/permissao/{id}")
    public ResponseEntity<Permissao> buscarPorId(@PathVariable Long id) {
        return permissaoService.buscarPorId(id);
    }

    @DeleteMapping("/permissao/{id}")
    public ResponseEntity deletar(@PathVariable Long id) {
        return permissaoService.deletar(id);
    }

    @PutMapping("/permissao/{id}")
    public ResponseEntity<Permissao> atualizar(@PathVariable Long id, @RequestBody Permissao permissao) {
        permissao.setId(id);
        return permissaoService.salvar(permissao);
    }
}