package br.com.enigme.enigme.service;

import br.com.enigme.enigme.entity.Pagamento;
import br.com.enigme.enigme.repository.PagamentoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PagamentoService {
    @Autowired
    private PagamentoRepository pagamentoRepository;

    /**
     * Lista todos os pagamentos.
     */
    public Iterable<Pagamento> listarTodos() {
        return pagamentoRepository.findAll();
    }

    /**
     * Salva um novo pagamento.
     */
    public ResponseEntity<Pagamento> salvar(Pagamento pagamento) {
        // Valida os campos obrigatórios
        if (pagamento.getItemVenda() == null ||
                pagamento.getMetodo_pagamento() == null ||
                pagamento.getStatus_pagamento() == null ||
                pagamento.getData_pagamento() == null ||
                pagamento.getValor_pago() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Salva o pagamento e retorna com status 201 (Created)
        Pagamento novoPagamento = pagamentoRepository.save(pagamento);
        return new ResponseEntity<>(novoPagamento, HttpStatus.CREATED);
    }

    /**
     * Busca um pagamento pelo ID.
     */
    public ResponseEntity<Pagamento> buscarPorId(Long id) {
        Pagamento pagamento = pagamentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pagamento não encontrado com o ID " + id));
        return new ResponseEntity<>(pagamento, HttpStatus.OK);
    }

    /**
     * Deleta um pagamento pelo ID.
     */
    @Transactional
    public ResponseEntity<Void> deletar(Long id) {
        Pagamento pagamento = pagamentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pagamento não encontrado com o ID " + id));
        pagamentoRepository.delete(pagamento);
        return ResponseEntity.noContent().build(); // Retorna status 204 (No Content)
    }

    /**
     * Busca pagamentos por ID do item de venda.
     */
    public List<Pagamento> buscarPorItemVenda(Long itemVendaId) {
        // Certifique-se de que o método findByItemVendaId exista no repositório
        return pagamentoRepository.findByItemVendaId(itemVendaId);
    }

    /**
     * Busca pagamentos por método de pagamento.
     */
    public List<Pagamento> buscarPorMetodoPagamento(String metodoPagamento) {
        // Certifique-se de que o método findByMetodoPagamento exista no repositório
        return pagamentoRepository.findByMetodoPagamento(metodoPagamento);
    }

    /**
     * Busca pagamentos por status de pagamento.
     */
    public List<Pagamento> buscarPorStatusPagamento(String statusPagamento) {
        // Certifique-se de que o método findByStatusPagamento exista no repositório
        return pagamentoRepository.findByStatusPagamento(statusPagamento);
    }
}