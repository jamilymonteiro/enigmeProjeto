package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Transportadora;
import br.com.enigme.enigme.service.TransportadoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/transportadora")
public class TransportadoraController {

    @Autowired
    private TransportadoraService transportadoraService;

    @PostMapping
    public ResponseEntity<Transportadora> salvar(@RequestBody Transportadora transportadora) {
        Transportadora transportadoraSalva = transportadoraService.salvar(transportadora);
        return ResponseEntity.ok(transportadoraSalva);
    }

    @GetMapping
    public ResponseEntity<Iterable<Transportadora>> listarTodos() {
        Iterable<Transportadora> transportadoras = transportadoraService.listarTodos();
        return ResponseEntity.ok(transportadoras);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transportadora> buscarPorId(@PathVariable Long id) {
        Transportadora transportadora = transportadoraService.buscarPorId(id);
        if (transportadora != null) {
            return ResponseEntity.ok(transportadora);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = transportadoraService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transportadora> atualizar(@PathVariable Long id, @RequestBody Transportadora transportadora) {
        transportadora.setId(id);
        Transportadora transportadoraAtualizada = transportadoraService.salvar(transportadora);
        return ResponseEntity.ok(transportadoraAtualizada);
    }
}