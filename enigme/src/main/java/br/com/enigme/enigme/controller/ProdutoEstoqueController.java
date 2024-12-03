package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.ProdutoEstoque;
import br.com.enigme.enigme.service.ProdutoEstoqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/produtoEstoque")
public class ProdutoEstoqueController {

    @Autowired
    private ProdutoEstoqueService produtoEstoqueService;

    @PostMapping
    public ResponseEntity<ProdutoEstoque> salvar(@RequestBody ProdutoEstoque produtoEstoque) {
        ProdutoEstoque produtoEstoqueSalvo = produtoEstoqueService.salvar(produtoEstoque);
        return ResponseEntity.ok(produtoEstoqueSalvo);
    }

    @GetMapping
    public ResponseEntity<Iterable<ProdutoEstoque>> listarTodos() {
        Iterable<ProdutoEstoque> produtosEstoque = produtoEstoqueService.listarTodos();
        return ResponseEntity.ok(produtosEstoque);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoEstoque> buscarPorId(@PathVariable Long id) {
        ProdutoEstoque produtoEstoque = produtoEstoqueService.buscarPorId(id);
        if (produtoEstoque != null) {
            return ResponseEntity.ok(produtoEstoque);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = produtoEstoqueService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoEstoque> atualizar(@PathVariable Long id, @RequestBody ProdutoEstoque produtoEstoque) {
        produtoEstoque.setId(id);
        ProdutoEstoque produtoEstoqueAtualizado = produtoEstoqueService.salvar(produtoEstoque);
        return ResponseEntity.ok(produtoEstoqueAtualizado);
    }
}