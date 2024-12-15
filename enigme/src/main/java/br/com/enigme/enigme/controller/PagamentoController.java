package br.com.enigme.enigme.controller;

import br.com.enigme.enigme.entity.Pagamento;
import br.com.enigme.enigme.service.PagamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    @PostMapping("/pagamento")
    public ResponseEntity<Pagamento> salvar(@RequestBody Pagamento pagamento) {
        return pagamentoService.salvar(pagamento);
    }

    @GetMapping("/pagamento")
    public Iterable<Pagamento> listarTodos() {
        return pagamentoService.listarTodos();
    }

    @GetMapping("/pagamento/{id}")
    public ResponseEntity<Pagamento> buscarPorId(@PathVariable Long id) {
        return pagamentoService.buscarPorId(id);
    }

    @DeleteMapping("/pagamento/{id}")
    public ResponseEntity deletar(@PathVariable Long id) {
        return pagamentoService.deletar(id);
    }

    @PutMapping("/pagamento/{id}")
    public ResponseEntity<Pagamento> atualizar(@PathVariable Long id, @RequestBody Pagamento pagamento) {
        pagamento.setId(id);
        return pagamentoService.salvar(pagamento);
    }
}