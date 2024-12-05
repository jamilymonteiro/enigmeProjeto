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

    @PostMapping("/entrega")
    public ResponseEntity<Entrega> salvar (@RequestBody Entrega entrega){
        return entregaService.salvar(entrega);
    }

    @GetMapping("/entrega")
    public Iterable<Entrega> listarTodos (){
        return entregaService.listarTodos();
    }

    @GetMapping("/entrega/{id}")
    public ResponseEntity<Entrega> buscarPorId(@PathVariable Long id){
        return entregaService.buscarPorId(id);
    }

    @DeleteMapping("/entrega/{id}")
    public ResponseEntity deletar(@PathVariable Long id){
        return entregaService.deletar(id);
    }

    @PutMapping("/entrega/{id}")
    public ResponseEntity<Entrega> atualizar(
            @PathVariable Long id,
            @RequestBody Entrega entrega){
        entrega.setId(id);
        return entregaService.salvar(entrega);
    }
}