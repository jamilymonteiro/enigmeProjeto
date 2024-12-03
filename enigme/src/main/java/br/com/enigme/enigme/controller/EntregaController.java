package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Entrega;
import br.com.enigme.enigme.service.EntregaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/entrega")
public class EntregaController {

    @Autowired
    private EntregaService entregaService;

    @PostMapping
    public ResponseEntity<Entrega> salvar(@RequestBody Entrega entrega) {
        Entrega entregaSalva = entregaService.salvar(entrega);
        return ResponseEntity.ok(entregaSalva);
    }

    @GetMapping
    public ResponseEntity<Iterable<Entrega>> listarTodos() {
        Iterable<Entrega> entregas = entregaService.listarTodos();
        return ResponseEntity.ok(entregas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entrega> buscarPorId(@PathVariable Long id) {
        Entrega entrega = entregaService.buscarPorId(id);
        if (entrega != null) {
            return ResponseEntity.ok(entrega);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = entregaService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entrega> atualizar(@PathVariable Long id, @RequestBody Entrega entrega) {
        entrega.setId(id);
        Entrega entregaAtualizada = entregaService.salvar(entrega);
        return ResponseEntity.ok(entregaAtualizada);
    }
}