package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.ItemVenda;
import br.com.enigme.enigme.service.ItemVendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class ItemVendaController {

    @Autowired
    private ItemVendaService itemVendaService;

    @PostMapping("/itemVenda")
    public ItemVenda salvar(@RequestBody ItemVenda itemVenda){
        return itemVendaService.salvar(itemVenda);
    }

    @GetMapping("/itemVenda")
    public Iterable<ItemVenda> listarTodos (){
        return itemVendaService.listarTodos();
    }

    @GetMapping("/itemVenda/{id}")
    public Optional<ItemVenda> buscarPorId(@PathVariable Long id){
        return itemVendaService.buscarPorId(id);
    }

    @DeleteMapping("/itemVenda/{id}")
    public ResponseEntity deletar(@PathVariable Long id){
        return itemVendaService.deletar(id);
    }

    @PutMapping("/itemVenda/{id}")
    public ItemVenda atualizar(@PathVariable Long id, @RequestBody ItemVenda itemVenda){
        itemVenda.setId(id);
        return itemVendaService.salvar(itemVenda);
    }
}