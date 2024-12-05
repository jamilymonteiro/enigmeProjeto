package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Produto;
import br.com.enigme.enigme.repository.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    public Iterable<Produto> listarTodos (){
        return produtoRepository.findAll();
    }

    public ResponseEntity<Produto> salvar (Produto produto){
        return new ResponseEntity<Produto>(produtoRepository.save(produto), HttpStatus.OK);
    }

    public ResponseEntity<Produto> buscarPorId(Long id) {
        return new ResponseEntity<Produto>(produtoRepository.findById(id).orElseThrow(),HttpStatus.OK);
    }

    public ResponseEntity deletar(Long id) {
        produtoRepository.deleteById(id);
        return new ResponseEntity("{\"mensagem\":\"Removido com sucesso\"}",HttpStatus.OK);
    }
}