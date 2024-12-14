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
  CForm,
  CFormLabel,
  CFormSelect,
} from '@coreui/react';
import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import api from '../../services/axiosConfig';

const AvaliacaoList = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(null);

  const navigate = useNavigate();

  const fetchAvaliacoes = async () => {
    try {
      const response = await api.get('/avaliacao');
      const data = Array.isArray(response.data) ? response.data : [];
      setAvaliacoes(data);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      setAvaliacoes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await api.get('/cliente');
      const data = Array.isArray(response.data) ? response.data : [];
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setClientes([]);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produto');
      const data = Array.isArray(response.data) ? response.data : [];
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setProdutos([]);
    }
  };

  useEffect(() => {
    fetchAvaliacoes();
    fetchClientes();
    fetchProdutos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/avaliacao/add?id=${id}`);
  };

  const handleConfirmDelete = (avaliacao) => {
    setAvaliacaoSelecionada(avaliacao);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (avaliacaoSelecionada) {
      try {
        await api.delete(`/avaliacao/${avaliacaoSelecionada.id}`);
        setModalVisible(false);
        setAvaliacaoSelecionada(null);
        // Recarregar todas as avaliações para garantir que a tabela esteja atualizada
        fetchAvaliacoes();
      } catch (error) {
        console.error('Erro ao remover avaliação:', error);
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
            <strong>Avaliações</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Produto</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nota</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Comentário</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {avaliacoes.map((avaliacao) => (
                  <CTableRow key={avaliacao.id}>
                    <CTableHeaderCell scope="row">{avaliacao.id}</CTableHeaderCell>
                    <CTableDataCell>
                      <CTableDataCell>{avaliacao.cliente?.nome}</CTableDataCell>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CTableDataCell>{avaliacao.produto?.nome}</CTableDataCell>
                    </CTableDataCell>
                    <CTableDataCell>{avaliacao.nota}</CTableDataCell>
                    <CTableDataCell>{avaliacao.comentario}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(avaliacao.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(avaliacao)}
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
          Tem certeza de que deseja remover a avaliação "<strong>{avaliacaoSelecionada?.comentario}</strong>"?
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

export default AvaliacaoList;
