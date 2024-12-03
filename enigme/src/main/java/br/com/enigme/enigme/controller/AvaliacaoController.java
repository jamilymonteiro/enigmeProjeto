package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Avaliacao;
import br.com.enigme.enigme.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/avaliacao")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @PostMapping
    public ResponseEntity<Avaliacao> salvar(@RequestBody Avaliacao avaliacao) {
        return avaliacaoService.salvar(avaliacao);
    }

    @GetMapping
    public Iterable<Avaliacao> listarTodos() {
        return avaliacaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Avaliacao> buscarPorId(@PathVariable Long id) {
        return avaliacaoService.buscarPorId(id);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return avaliacaoService.deletar(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Avaliacao> atualizar(
            @PathVariable Long id,
            @RequestBody Avaliacao avaliacao) {
        avaliacao.setId(id);
        return avaliacaoService.salvar(avaliacao);
    }
}  