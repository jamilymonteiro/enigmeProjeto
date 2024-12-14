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

const ProdutoList = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const navigate = useNavigate();

  // Função para buscar todos os produtos
  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produto');
      const data = Array.isArray(response.data) ? response.data : [];
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar Produtos:', error);
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  // Carregar lista de produtos quando o componente é montado
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para editar o produto
  const handleEdit = (id) => {
    navigate(`/produto/add?id=${id}`);
  };

  // Função para confirmar a exclusão
  const handleConfirmDelete = (produto) => {
    setProdutoSelecionado(produto);
    setModalVisible(true);
  };

  // Função para excluir o produto
  const handleDelete = async () => {
    if (produtoSelecionado) {
      try {
        await api.delete(`/produto/${produtoSelecionado.id}`);
        setModalVisible(false);
        setProdutoSelecionado(null);
        fetchProdutos(); // Recarregar a lista após exclusão
      } catch (error) {
        console.error('Erro ao remover produto:', error);
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
            <strong>Produtos</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descrição</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Estoque</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Categoria</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {produtos.map((produto) => (
                  <CTableRow key={produto.id}>
                    <CTableDataCell>{produto.nome}</CTableDataCell>
                    <CTableDataCell>{produto.descricao}</CTableDataCell>
                    <CTableDataCell>{produto.preco}</CTableDataCell>
                    <CTableDataCell>{produto.estoque}</CTableDataCell>
                    <CTableDataCell>{produto.categoria?.nome}</CTableDataCell> {/* Assuming categoria has a nome field */}
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleEdit(produto.id)}
                        className="me-2"
                        style={{ color: 'white' }}
                      >
                        <CIcon icon={cilPencil} /> Editar
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleConfirmDelete(produto)}
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
          Tem certeza de que deseja remover o produto "<strong>{produtoSelecionado?.nome}</strong>"?
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

export default ProdutoList;
