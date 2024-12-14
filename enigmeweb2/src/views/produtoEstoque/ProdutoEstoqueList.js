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
  const [produtosEstoque, setProdutosEstoque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoEstoqueSelecionado, setProdutoEstoqueSelecionado] = useState(null);

  const navigate = useNavigate();

  const fetchProdutosEstoque = async () => {
    try {
      const response = await api.get('/produtoestoque');
      const data = Array.isArray(response.data) ? response.data : [];
      setProdutosEstoque(data);
    } catch (error) {
      console.error('Erro ao buscar produtos no estoque:', error);
      setProdutosEstoque([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutosEstoque();
  }, []);

  const handleEdit = (id) => {
    navigate(`/produtoestoque/add?id=${id}`);
  };

  const handleConfirmDelete = (produtoEstoque) => {
    setProdutoEstoqueSelecionado(produtoEstoque);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (produtoEstoqueSelecionado) {
      try {
        await api.delete(`/produtoestoque/${produtoEstoqueSelecionado.id}`);
        setModalVisible(false);
        setProdutoEstoqueSelecionado(null);
        fetchProdutosEstoque();
      } catch (error) {
        console.error('Erro ao remover produto do estoque:', error);
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
            <strong>Produtos no Estoque</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Produto</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Estoque</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {produtosEstoque.map((produtoEstoque) => (
                  <CTableRow key={produtoEstoque.id}>
                    <CTableHeaderCell scope="row">{produtoEstoque.id}</CTableHeaderCell>
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

      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Exclusão</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Tem certeza de que deseja remover o produto no estoque com ID "<strong>{produtoEstoqueSelecionado?.id}</strong>"?
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