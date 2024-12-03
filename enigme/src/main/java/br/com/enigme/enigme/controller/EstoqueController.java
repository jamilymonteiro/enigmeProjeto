package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Estoque;
import br.com.enigme.enigme.service.EstoqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/estoque")
public class EstoqueController {

    @Autowired
    private EstoqueService estoqueService;

    @PostMapping
    public ResponseEntity<Estoque> salvar(@RequestBody Estoque estoque) {
        Estoque estoqueSalvo = estoqueService.salvar(estoque);
        return ResponseEntity.ok(estoqueSalvo);
    }

    @GetMapping
    public ResponseEntity<Iterable<Estoque>> listarTodos() {
        Iterable<Estoque> estoques = estoqueService.listarTodos();
        return ResponseEntity.ok(estoques);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estoque> buscarPorId(@PathVariable Long id) {
        Estoque estoque = estoqueService.buscarPorId(id);
        if (estoque != null) {
            return ResponseEntity.ok(estoque);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = estoqueService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estoque> atualizar(@PathVariable Long id, @RequestBody Estoque estoque) {
        estoque.setId(id);
        Estoque estoqueAtualizado = estoqueService.salvar(estoque);
        return ResponseEntity.ok(estoqueAtualizado);
    }
}
