package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.ImagemProduto;
import br.com.enigme.enigme.service.ImagemProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/imagemProduto")
@CrossOrigin(origins = "http://localhost:3000")
public class ImagemProdutoController {

    @Autowired
    private ImagemProdutoService imagemProdutoService;

    @PostMapping
    public ResponseEntity<ImagemProduto> salvar(@RequestBody ImagemProduto imagemProduto) {
        ImagemProduto imagemProdutoSalva = imagemProdutoService.salvar(imagemProduto);
        return ResponseEntity.ok(imagemProdutoSalva);
    }

    @GetMapping
    public ResponseEntity<Iterable<ImagemProduto>> listarTodos() {
        Iterable<ImagemProduto> imagens = imagemProdutoService.listarTodos();
        return ResponseEntity.ok(imagens);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImagemProduto> buscarPorId(@PathVariable Long id) {
        ImagemProduto imagemProduto = imagemProdutoService.buscarPorId(id);
        if (imagemProduto != null) {
            return ResponseEntity.ok(imagemProduto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean deletado = imagemProdutoService.deletar(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImagemProduto> atualizar(@PathVariable Long id, @RequestBody ImagemProduto imagemProduto) {
        imagemProduto.setId(id);
        ImagemProduto imagemProdutoAtualizada = imagemProdutoService.salvar(imagemProduto);
        return ResponseEntity.ok(imagemProdutoAtualizada);
    }
}