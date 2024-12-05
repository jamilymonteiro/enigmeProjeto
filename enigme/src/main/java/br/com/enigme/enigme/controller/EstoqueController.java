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

    @PostMapping("/estoque")
    public ResponseEntity<Estoque> salvar (@RequestBody Estoque estoque){
        return estoqueService.salvar(estoque);
    }

    @GetMapping("/estoque")
    public Iterable<Estoque> listarTodos (){
        return estoqueService.listarTodos();
    }

    @GetMapping("/estoque/{id}")
    public ResponseEntity<Estoque> buscarPorId(@PathVariable Long id){
        return estoqueService.buscarPorId(id);
    }

    @DeleteMapping("/estoque/{id}")
    public ResponseEntity deletar(@PathVariable Long id){
        return estoqueService.deletar(id);
    }

    @PutMapping("/estoque/{id}")
    public ResponseEntity<Estoque> atualizar(
            @PathVariable Long id,
            @RequestBody Estoque estoque){
        estoque.setId(id);
        return estoqueService.salvar(estoque);
    }
}
