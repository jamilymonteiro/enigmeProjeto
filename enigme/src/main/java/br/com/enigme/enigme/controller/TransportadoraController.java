package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Transportadora;
import br.com.enigme.enigme.service.TransportadoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class TransportadoraController {

    @Autowired
    private TransportadoraService transportadoraService;

    @PostMapping("/transportadora")
    public ResponseEntity<Transportadora> salvar(@RequestBody Transportadora transportadora){
        return transportadoraService.salvar(transportadora);
    }

    @GetMapping("/transportadora")
    public Iterable<Transportadora> listarTodos (){ return transportadoraService.listarTodos(); }

    @GetMapping("/transportadora/{id}")
    public ResponseEntity<Transportadora> buscarPorId(@PathVariable Long id){
        return transportadoraService.buscarPorId(id);
    }

    @DeleteMapping("/transportadora/{id}")
    public ResponseEntity deletar(@PathVariable Long id){
        return transportadoraService.deletar(id);
    }

    @PutMapping("/transportadora/{id}")
    public ResponseEntity<Transportadora> atualizar(
            @PathVariable Long id,
            @RequestBody Transportadora transportadora){
        transportadora.setId(id);
        return transportadoraService.salvar(transportadora);
    }

}