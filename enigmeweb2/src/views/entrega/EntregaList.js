import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axiosConfig';

const EntregaList = () => {
  const [entregas, setEntregas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [entregaToDelete, setEntregaToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEntregas();
  }, []);

  const fetchEntregas = async () => {
    try {
      const response = await api.get('/entrega');
      setEntregas(response.data);
    } catch (error) {
      console.error('Erro ao carregar entregas:', error);
      alert('Erro ao carregar entregas.');
    }
  };

  const handleDelete = async () => {
    if (!entregaToDelete) return;

    try {
      await api.delete(`/entrega/${entregaToDelete}`);
      setModalVisible(false);
      setEntregaToDelete(null);
      fetchEntregas(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao excluir entrega:', error);
      alert('Erro ao excluir entrega.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/entrega/add?id=${id}`);
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>Lista de Entregas</h4>
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Item de Venda</CTableHeaderCell>
                <CTableHeaderCell>Quantidade</CTableHeaderCell>
                <CTableHeaderCell>Transportadora</CTableHeaderCell>
                <CTableHeaderCell>Código de Rastreio</CTableHeaderCell>
                <CTableHeaderCell>Ações</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {entregas.map((entrega) => (
                <CTableRow key={entrega.id}>
                  <CTableDataCell>{entrega.id}</CTableDataCell>
                  <CTableDataCell>{entrega.itemVenda?.descricao}</CTableDataCell>
                  <CTableDataCell>{entrega.quantidade}</CTableDataCell>
                  <CTableDataCell>{entrega.transportadora?.nome}</CTableDataCell>
                  <CTableDataCell>{entrega.codigoRastreio}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(entrega.id)}
                    >
                      Editar
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => {
                        setEntregaToDelete(entrega.id);
                        setModalVisible(true);
                      }}
                    >
                      Excluir
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal de Confirmação para Exclusão */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmação</CModalTitle>
        </CModalHeader>
        <CModalBody>Tem certeza de que deseja excluir esta entrega?</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={handleDelete}>
            Excluir
          </CButton>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EntregaList;
