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

    public Iterable<ImagemProduto> listarTodos() {
        return imagemProdutoRepository.findAll();
    }

    public ResponseEntity<ImagemProduto> salvar(ImagemProduto imagemProduto) {
        if (imagemProduto.getEnderecoArquivo() == null || imagemProduto.getEnderecoArquivo().isEmpty() || imagemProduto.getProduto() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(imagemProdutoRepository.save(imagemProduto), HttpStatus.CREATED);
    }

    public ResponseEntity<ImagemProduto> buscarPorId(Long id) {
        return new ResponseEntity<>(imagemProdutoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Imagem do Produto não encontrada com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        ImagemProduto imagemProduto = imagemProdutoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Imagem do Produto não encontrada com o ID " + id));
        imagemProdutoRepository.delete(imagemProduto);
    }

    public List<ImagemProduto> buscarPorProduto(Long produtoId) {
        return imagemProdutoRepository.findByProdutoId(produtoId);
    }
}