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

const VendaList = () => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);

  const navigate = useNavigate();

  // Função para buscar todas as vendas
  const fetchVendas = async () => {
    try {
      const response = await api.get('/venda');
      const data = Array.isArray(response.data) ? response.data : [];
      setVendas(data);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      setVendas([]);
    } finally {
      setLoading(false);
    }
  };

  // Carregar lista de vendas quando o componente é montado
  useEffect(() => {
    fetchVendas();
  }, []);

  // Função para editar a venda
  const handleEdit = (id) => {
    navigate(`/venda/add?id=${id}`);
  };

  // Função para confirmar a exclusão
  const handleConfirmDelete = (venda) => {
    setVendaSelecionada(venda);
    setModalVisible(true);
  };

  // Função para excluir a venda
  const handleDelete = async () => {
    if (vendaSelecionada) {
      try {
        await api.delete(`/venda/${vendaSelecionada.id}`);
        setModalVisible(false);
        setVendaSelecionada(null);
        fetchVendas(); // Recarregar a lista após exclusão
      } catch (error) {
        console.error('Erro ao remover venda:', error);
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
            <strong>Vendas</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Data</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Endereço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vendas.map((venda) => (
                  <CTableRow key={venda.id}>
                    <CTableHeaderCell scope="row">{venda.id}</CTableHeaderCell>
                    <CTableDataCell>{venda.data}</CTableDataCell>
                    <CTableDataCell>{venda.cliente.nome}</CTableDataCell>
                    <CTableDataCell>{venda.endereco.rua}</CTableDataCell> {/* Adapte conforme necessário */}
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(venda.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(venda)}
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
          Tem certeza de que deseja remover a venda com ID "<strong>{vendaSelecionada?.id}</strong>"?
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

export default VendaList;
