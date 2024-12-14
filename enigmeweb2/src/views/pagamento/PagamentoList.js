import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import api from '../../services/axiosConfig';

const PagamentoList = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchPagamentos = async () => {
    try {
      const response = await api.get('/pagamento');
      const data = Array.isArray(response.data) ? response.data : [];
      setPagamentos(data);
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
      setPagamentos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagamentos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/pagamento/add?id=${id}`);
  };

  const handleConfirmDelete = (pagamento) => {
    setPagamentoSelecionado(pagamento);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (pagamentoSelecionado) {
      try {
        await api.delete(`/pagamento/${pagamentoSelecionado.id}`);
        setModalVisible(false);
        setPagamentoSelecionado(null);
        fetchPagamentos();
      } catch (error) {
        console.error('Erro ao remover pagamento:', error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Pagamentos</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Item Venda</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Método de Pagamento</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status de Pagamento</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data de Pagamento</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Valor Pago</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {pagamentos.map((pagamento) => (
                  <CTableRow key={pagamento.id}>
                    <CTableHeaderCell scope="row">{pagamento.id}</CTableHeaderCell>
                    <CTableDataCell>{pagamento.itemVenda?.id}</CTableDataCell>
                    <CTableDataCell>{pagamento.metodo_pagamento}</CTableDataCell>
                    <CTableDataCell>{pagamento.status_pagamento}</CTableDataCell>
                    <CTableDataCell>{pagamento.data_pagamento}</CTableDataCell>
                    <CTableDataCell>{pagamento.valor_pago}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(pagamento.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(pagamento)}
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilTrash} /> Remover
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Exclusão</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza de que deseja remover o pagamento de ID "<strong>{pagamentoSelecionado?.id}</strong>"?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDelete}>
            Confirmar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default PagamentoList;
