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

const ProdutoEstoqueList = () => {
  const [produtoEstoques, setProdutoEstoques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoEstoqueSelecionado, setProdutoEstoqueSelecionado] = useState(null);

  const navigate = useNavigate();

  // Função para buscar todos os produtos no estoque
  const fetchProdutoEstoques = async () => {
    try {
      const response = await api.get('/produtoEstoque');
      const data = Array.isArray(response.data) ? response.data : [];
      setProdutoEstoques(data);
    } catch (error) {
      console.error('Erro ao buscar Produtos no Estoque:', error);
      setProdutoEstoques([]);
    } finally {
      setLoading(false);
    }
  };

  // Carregar lista de produtos no estoque quando o componente é montado
  useEffect(() => {
    fetchProdutoEstoques();
  }, []);

  // Função para editar o produto no estoque
  const handleEdit = (id) => {
    navigate(`/produtoEstoque/add?id=${id}`);
  };

  // Função para confirmar a exclusão
  const handleConfirmDelete = (produtoEstoque) => {
    setProdutoEstoqueSelecionado(produtoEstoque);
    setModalVisible(true);
  };

  // Função para excluir o produto no estoque
  const handleDelete = async () => {
    if (produtoEstoqueSelecionado) {
      try {
        await api.delete(`/produtoEstoque/${produtoEstoqueSelecionado.id}`);
        setModalVisible(false);
        setProdutoEstoqueSelecionado(null);
        fetchProdutoEstoques(); // Recarregar a lista após exclusão
      } catch (error) {
        console.error('Erro ao remover produto no estoque:', error);
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
            <strong>Produtos no Estoque</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Produto</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Estoque</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {produtoEstoques.map((produtoEstoque) => (
                  <CTableRow key={produtoEstoque.id}>
                    <CTableDataCell>{produtoEstoque.produto?.nome}</CTableDataCell>
                    <CTableDataCell>{produtoEstoque.preco}</CTableDataCell>
                    <CTableDataCell>{produtoEstoque.estoque?.id}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(produtoEstoque.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(produtoEstoque)}
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
          Tem certeza de que deseja remover o produto no estoque "<strong>{produtoEstoqueSelecionado?.produto?.nome}</strong>"?
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

export default ProdutoEstoqueList;
