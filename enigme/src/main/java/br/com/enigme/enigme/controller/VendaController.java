package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Venda;
import br.com.enigme.enigme.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/venda")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @PostMapping("/venda")
    public ResponseEntity<Venda> salvar(@RequestBody Venda venda){
        return  vendaService.salvar(venda);
    }

    @PostMapping("/venda/add")
    public ResponseEntity<Venda> addVenda(@RequestBody Venda venda) { return vendaService.vendaAdd(venda); }

    @GetMapping("/venda")
    public Iterable<Venda> listarTodos(){
        return vendaService.listarTodos();
    }

    @GetMapping("/venda/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable Long id){
        return vendaService.buscarPorId(id);
    }

    @DeleteMapping("/venda/{id}")
    public ResponseEntity deletar(@PathVariable Long id){
        return vendaService.deletar(id);
    }

    @PutMapping("/venda/{id}")
    public ResponseEntity<Venda> atualizar(
            @PathVariable Long id,
            @RequestBody Venda venda){
        venda.setId(id);
        return vendaService.salvar(venda);
    }
}