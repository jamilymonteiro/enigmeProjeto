package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Avaliacao;
import br.com.enigme.enigme.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @PostMapping("/avaliacao")
    public ResponseEntity<Avaliacao> salvar (@RequestBody Avaliacao avaliacao){
        return avaliacaoService.salvar(avaliacao);
    }

    @GetMapping("/avaliacao")
    public Iterable<Avaliacao> listarTodos (){
        return avaliacaoService.listarTodos();
    }

    @GetMapping("/avaliacao/{id}")
    public ResponseEntity<Avaliacao> buscarPorId(@PathVariable Long id){
        return avaliacaoService.buscarPorId(id);
    }

    @DeleteMapping("/avaliacao/{id}")
    public ResponseEntity deletar(@PathVariable Long id){
        return avaliacaoService.deletar(id);
    }

    @PutMapping("/avaliacao/{id}")
    public ResponseEntity<Avaliacao> atualizar(
            @PathVariable Long id,
            @RequestBody Avaliacao avaliacao){
        avaliacao.setId(id);
        return avaliacaoService.salvar(avaliacao);
    }
}  