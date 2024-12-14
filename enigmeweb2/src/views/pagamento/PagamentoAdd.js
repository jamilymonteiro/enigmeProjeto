import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormSelect,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const PagamentoAdd = () => {
  const [itemVenda, setItemVenda] = useState('');
  const [itensVenda, setItensVenda] = useState([]);
  const [metodo_pagamento, setMetodoPagamento] = useState('');
  const [status_pagamento, setStatusPagamento] = useState('');
  const [data_pagamento, setDataPagamento] = useState('');
  const [valor_pago, setValorPago] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pagamentoId = searchParams.get('id');

  // Opções fixas para método de pagamento
  const metodosPagamento = ['Cartão de Crédito', 'Pix', 'Cartão de Débito', 'Boleto'];

  // Carregar os itens de venda disponíveis
  useEffect(() => {
    const fetchItensVenda = async () => {
      try {
        const response = await api.get('/itemVenda'); // Endpoint para buscar itens de venda
        setItensVenda(response.data); // Assuma que `response.data` é uma lista de itens de venda
      } catch (error) {
        console.error('Erro ao carregar itens de venda:', error);
      }
    };
    fetchItensVenda();
  }, []);

  // Carregar dados de pagamento, se estiver editando
  useEffect(() => {
    if (pagamentoId) {
      const fetchPagamento = async () => {
        try {
          const response = await api.get(`/pagamento/${pagamentoId}`);
          const { itemVenda, metodo_pagamento, status_pagamento, data_pagamento, valor_pago } = response.data;
          setItemVenda(itemVenda);
          setMetodoPagamento(metodo_pagamento);
          setStatusPagamento(status_pagamento);
          setDataPagamento(data_pagamento);
          setValorPago(valor_pago);
        } catch (error) {
          console.error('Erro ao carregar pagamento:', error);
        }
      };
      fetchPagamento();
    }
  }, [pagamentoId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const pagamentoData = {
      itemVenda,
      metodo_pagamento,
      status_pagamento,
      data_pagamento,
      valor_pago,
    };

    try {
      if (pagamentoId) {
        await api.put(`/pagamento/${pagamentoId}`, pagamentoData);
      } else {
        await api.post('/pagamento', pagamentoData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar o pagamento:', error);
      alert('Erro ao salvar o pagamento');
    }
  };

  const resetForm = () => {
    setItemVenda('');
    setMetodoPagamento('');
    setStatusPagamento('');
    setDataPagamento('');
    setValorPago('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{pagamentoId ? 'Editar Pagamento' : 'Adicionar Pagamento'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="itemVendaPagamento">Item de Venda</CFormLabel>
              <CFormSelect
                id="itemVendaPagamento"
                value={itemVenda}
                onChange={(e) => setItemVenda(e.target.value)}
                required
              >
                <option value="" disabled>Selecione um item de venda</option>
                {itensVenda.map((itemVenda) => (
                  <option key={itemVenda.id} value={itemVenda.id}>
                    {itemVenda.descricao || `ItemVenda #${itemVenda.id}`} {/* Personalize com a propriedade correta */}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="metodoPagamento">Método de Pagamento</CFormLabel>
              <CFormSelect
                id="metodoPagamento"
                value={metodo_pagamento}
                onChange={(e) => setMetodoPagamento(e.target.value)}
                required
              >
                <option value="" disabled>Selecione a forma de pagamento</option>
                {metodosPagamento.map((metodo, index) => (
                  <option key={index} value={metodo}>
                    {metodo}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="statusPagamento">Status de Pagamento</CFormLabel>
              <CFormSelect
                id="statusPagamento"
                value={status_pagamento}
                onChange={(e) => setStatusPagamento(e.target.value)}
                required
              >
                <option value="" disabled>Selecione o status</option>
                <option value="Pendente">Pendente</option>
                <option value="Pago">Pago</option>
                <option value="Cancelado">Cancelado</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="dataPagamento">Data de Pagamento</CFormLabel>
              <CFormInput
                type="date"
                id="dataPagamento"
                value={data_pagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="valorPago">Valor Pago</CFormLabel>
              <CFormInput
                type="number"
                id="valorPago"
                value={valor_pago}
                onChange={(e) => setValorPago(e.target.value)}
                required
              />
            </div>
            <CButton type="submit" color="primary">Salvar</CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>Pagamento salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default PagamentoAdd;
