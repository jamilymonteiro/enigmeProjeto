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
import java.util.Optional;

@Service
public class ItemVendaService {
    @Autowired
    private ItemVendaRepository itemVendaRepository;

    public List<ItemVenda> listarTodos() {
        return (List<ItemVenda>) itemVendaRepository.findAll();
    }

    public Optional<ItemVenda> buscarPorId(Long id) {
        return itemVendaRepository.findById(id);
    }

    public ItemVenda salvar(ItemVenda itemVenda) {
        return itemVendaRepository.save(itemVenda);
    }

    public ItemVenda atualizar(Long id, ItemVenda itemVendaAtualizado) {
        Optional<ItemVenda> itemVendaExistente = itemVendaRepository.findById(id);
        if (itemVendaExistente.isPresent()) {
            ItemVenda itemVenda = itemVendaExistente.get();
            itemVenda.setQuantidade(itemVendaAtualizado.getQuantidade());
            itemVenda.setProdutoEstoque(itemVendaAtualizado.getProdutoEstoque());
            itemVenda.setEntrega(itemVendaAtualizado.getEntrega());
            itemVenda.setVenda(itemVendaAtualizado.getVenda());
            return itemVendaRepository.save(itemVenda);
        } else {
            throw new RuntimeException("Item de Venda não encontrado com o ID: " + id);
        }
    }

    public ResponseEntity deletar(Long id) {
        itemVendaRepository.deleteById(id);
        return new ResponseEntity("{\"mensagem\":\"Removido com sucesso\"}", HttpStatus.OK);
    }
}