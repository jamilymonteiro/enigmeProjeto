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

    public Iterable<Pagamento> listarTodos() {
        return pagamentoRepository.findAll();
    }

    public ResponseEntity<Pagamento> salvar(Pagamento pagamento) {
        if (pagamento.getItemVenda() == null || pagamento.getMetodo_pagamento() == null || pagamento.getStatus_pagamento() == null || pagamento.getData_pagamento() == null || pagamento.getValor_pago() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(pagamentoRepository.save(pagamento), HttpStatus.CREATED);
    }

    public ResponseEntity<Pagamento> buscarPorId(Long id) {
        return new ResponseEntity<>(pagamentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pagamento não encontrado com o ID " + id)), HttpStatus.OK);
    }

    @Transactional
    public void deletar(Long id) {
        Pagamento pagamento = pagamentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pagamento não encontrado com o ID " + id));
        pagamentoRepository.delete(pagamento);
    }

    public List<Pagamento> buscarPorItemVenda(Long itemVendaId) {
        return pagamentoRepository.findByItemVendaId(itemVendaId);
    }

    public List<Pagamento> buscarPorMetodoPagamento(String metodoPagamento) {
        return pagamentoRepository.findByMetodoPagamento(metodoPagamento);
    }

    public List<Pagamento> buscarPorStatusPagamento(String statusPagamento) {
        return pagamentoRepository.findByStatusPagamento(statusPagamento);
    }
}