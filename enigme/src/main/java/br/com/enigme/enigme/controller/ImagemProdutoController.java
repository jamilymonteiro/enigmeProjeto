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

    @PostMapping("/imagemProduto")
    public ResponseEntity<ImagemProduto> salvar (@RequestBody ImagemProduto imagemProduto){
        return imagemProdutoService.salvar(imagemProduto);
    }

    @GetMapping("/imagemProduto")
    public Iterable<ImagemProduto> listarTodos (){
        return imagemProdutoService.listarTodos();
    }

    @GetMapping("/imagemProduto/{id}")
    public ResponseEntity<ImagemProduto> buscarPorId(@PathVariable Long id){
        return imagemProdutoService.buscarPorId(id);
    }

    @DeleteMapping("/imagemProduto/{id}")
    public ResponseEntity deletar(@PathVariable Long id){
        return imagemProdutoService.deletar(id);
    }

    @PutMapping("/imagemProduto/{id}")
    public ResponseEntity<ImagemProduto> atualizar(
            @PathVariable Long id,
            @RequestBody ImagemProduto imagemProduto){
        imagemProduto.setId(id);
        return imagemProdutoService.salvar(imagemProduto);
    }
}