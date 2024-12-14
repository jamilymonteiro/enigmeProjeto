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

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const navigate = useNavigate();

  // Função para buscar todos os clientes
  const fetchClientes = async () => {
    try {
      const response = await api.get('/cliente');
      const data = Array.isArray(response.data) ? response.data : [];
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setClientes([]);
    } finally {
      setLoading(false);
    }
  };

  // Carregar lista de clientes quando o componente é montado
  useEffect(() => {
    fetchClientes();
  }, []);

  // Função para editar o cliente
  const handleEdit = (id) => {
    navigate(`/cliente/add?id=${id}`);
  };

  // Função para confirmar a exclusão
  const handleConfirmDelete = (cliente) => {
    setClienteSelecionado(cliente);
    setModalVisible(true);
  };

  // Função para excluir o cliente
  const handleDelete = async () => {
    if (clienteSelecionado) {
      try {
        await api.delete(`/cliente/${clienteSelecionado.id}`);
        setModalVisible(false);
        setClienteSelecionado(null);
        fetchClientes(); // Recarregar a lista após exclusão
      } catch (error) {
        console.error('Erro ao remover cliente:', error);
      }
    }
  };

  // Exibir mensagem de "Carregando..." enquanto os dados não são carregados
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Clientes</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CPF</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Telefone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {clientes.map((cliente) => (
                  <CTableRow key={cliente.id}>
                    <CTableHeaderCell scope="row">{cliente.id}</CTableHeaderCell>
                    <CTableDataCell>{cliente.nome}</CTableDataCell>
                    <CTableDataCell>{cliente.cpf}</CTableDataCell>
                    <CTableDataCell>{cliente.email}</CTableDataCell>
                    <CTableDataCell>{cliente.telefone}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(cliente.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(cliente)}
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

      {/* Modal de Confirmação de Exclusão */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Exclusão</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza de que deseja remover o cliente "<strong>{clienteSelecionado?.nome}</strong>"?
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

export default ClienteList;