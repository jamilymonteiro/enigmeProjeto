package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.ImagemProduto;
import br.com.enigme.enigme.repository.ImagemProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImagemProdutoService {
    @Autowired
    private ImagemProdutoRepository imagemProdutoRepository;

    public Iterable<ImagemProduto> listarTodos (){

        return imagemProdutoRepository.findAll();
    }

    public ResponseEntity<ImagemProduto> salvar (ImagemProduto imagemProduto){
        return new ResponseEntity<ImagemProduto>(imagemProdutoRepository.save(imagemProduto), HttpStatus.OK);
    }

    public ResponseEntity<ImagemProduto> buscarPorId(Long id) {
        return new ResponseEntity<ImagemProduto>(imagemProdutoRepository.findById(id).orElseThrow(),HttpStatus.OK);
    }

    public ResponseEntity deletar(Long id) {
        imagemProdutoRepository.deleteById(id);
        return new ResponseEntity("{\"mensagem\":\"Removido com sucesso\"}",HttpStatus.OK);
    }
}