package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.ItemVenda;
import br.com.enigme.enigme.repository.ItemVendaRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemVendaService {
    @Autowired
    private ItemVendaRepository itemVendaRepository;

    public Iterable<ItemVenda> listarTodos() {
        return itemVendaRepository.findAll();
    }

    public ResponseEntity<ItemVenda> salvar(ItemVenda itemVenda) {
        if (itemVenda.getQuantidade() <= 0 || itemVenda.getValor_total() <= 0 || itemVenda.getProdutoEstoque() == null || itemVenda.getProduto() == null || itemVenda.getVenda() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(itemVendaRepository.save(itemVenda), HttpStatus.CREATED);
    }

    public ResponseEntity<ItemVenda> buscarPorId(Long id) {
        return new ResponseEntity<>(itemVendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item de Venda não encontrado com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        ItemVenda itemVenda = itemVendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item de Venda não encontrado com o ID " + id));
        itemVendaRepository.delete(itemVenda);
    }

    public List<ItemVenda> buscarPorVenda(Long vendaId) {
        return itemVendaRepository.findByVendaId(vendaId);
    }

    public List<ItemVenda> buscarPorProduto(Long produtoId) {
        return itemVendaRepository.findByProdutoId(produtoId);
    }

    @Transactional
    public void atualizarQuantidade(Long id, int quantidade) {
        ItemVenda itemVenda = itemVendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item de Venda não encontrado com o ID " + id));
        itemVenda.setQuantidade(quantidade);
        itemVenda.setValor_total(itemVenda.getProdutoEstoque().getProduto().getPreco() * quantidade);  // Atualizando o valor total
        itemVendaRepository.save(itemVenda);
    }
}