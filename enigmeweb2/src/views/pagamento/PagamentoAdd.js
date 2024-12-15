import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const PagamentoAdd = () => {
  const [itensVenda, setItensVenda] = useState([]);
  const [itemVenda, setItemVenda] = useState('');
  const [metodo_pagamento, setMetodoPagamento] = useState('');
  const [status_pagamento, setStatusPagamento] = useState('');
  const [data_pagamento, setDataPagamento] = useState('');
  const [valor_pago, setValorPago] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pagamentoId = searchParams.get('id');

  useEffect(() => {
    const fetchItensVenda = async () => {
      try {
        const response = await api.get('/itemVenda');

        if (response.data) {
          setItensVenda(response.data);
        } else {
          console.error("Erro ao carregar itens de venda.");
        }
      } catch (error) {
        console.error('Erro ao carregar itens de venda:', error);
      }
    };

    fetchItensVenda();

    if (pagamentoId) {
      const fetchPagamento = async () => {
        try {
          const response = await api.get(`/pagamento/${pagamentoId}`);
          const { itemVenda, metodo_pagamento, status_pagamento, data_pagamento, valor_pago } = response.data;
          setItemVenda(itemVenda.id);
          setMetodoPagamento(metodo_pagamento);
          setStatusPagamento(status_pagamento);
          setDataPagamento(data_pagamento);
          setValorPago(valor_pago);
        } catch (error) {
          console.error("Erro ao carregar pagamento:", error);
        }
      };
      fetchPagamento();
    }
  }, [pagamentoId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const pagamentoData = {
      itemVenda: { id: itemVenda },
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
      console.error("Erro ao salvar pagamento:", error);
      alert('Erro ao salvar pagamento');
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
              <CFormLabel htmlFor="itemVenda">Item de Venda</CFormLabel>
              <CFormSelect
                id="itemVenda"
                value={itemVenda}
                onChange={(e) => setItemVenda(e.target.value)}
                required
              >
                <option value="">Selecione um Item de Venda</option>
                {itensVenda.map((itemVenda) => (
                  <option key={itemVenda.id} value={itemVenda.id}>
                    {itemVenda.id}
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
                <option value="">Selecione um Método</option>
                <option value="cartao">Cartão</option>
                <option value="boleto">Boleto</option>
                <option value="pix">Pix</option>
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
                <option value="">Selecione um Status</option>
                <option value="pendente">Pendente</option>
                <option value="realizado">Realizado</option>
                <option value="cancelado">Cancelado</option>
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
                type="text"
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

      {/* Modal de Confirmação */}
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
