package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.ItemVenda;
import br.com.enigme.enigme.service.ItemVendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/item-venda")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemVendaController {

    @Autowired
    private ItemVendaService itemVendaService;

    @PostMapping
    public ResponseEntity<ItemVenda> salvar(@RequestBody ItemVenda itemVenda) {
        return itemVendaService.salvar(itemVenda);
    }

    @GetMapping
    public Iterable<ItemVenda> listarTodos() {
        return itemVendaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemVenda> buscarPorId(@PathVariable Long id) {
        return itemVendaService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return itemVendaService.deletar(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemVenda> atualizar(@PathVariable Long id, @RequestBody ItemVenda itemVenda) {
        itemVenda.setId(id);
        return itemVendaService.salvar(itemVenda);
    }
}