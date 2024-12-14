package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Endereco;
import br.com.enigme.enigme.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @PostMapping("/endereco")
    public ResponseEntity<Endereco> salvar (@RequestBody Endereco endereco){
        return enderecoService.salvar(endereco);
    }

    @GetMapping("/endereco")
    public Iterable<Endereco> listarTodos (){
        return enderecoService.listarTodos();
    }

    @GetMapping("/endereco/{id}")
    public ResponseEntity<Endereco> buscarPorId(@PathVariable Long id){
        return enderecoService.buscarPorId(id);
    }

    @DeleteMapping("/endereco/{id}")
    public ResponseEntity deletar(@PathVariable Long id){
        return enderecoService.deletar(id);
    }

    @PutMapping("/endereco/{id}")
    public ResponseEntity<Endereco> atualizar(
            @PathVariable Long id,
            @RequestBody Endereco endereco){
        endereco.setId(id);
        return enderecoService.salvar(endereco);
    }
}