import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import api from '../../services/axiosConfig';
import { useLocation } from 'react-router-dom';

const ProdutoEstoqueAdd = () => {
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const produtoEstoqueId = searchParams.get('id');

  useEffect(() => {
    if (produtoEstoqueId) {
      const fetchProdutoEstoque = async () => {
        try {
          const response = await api.get(`/produtoestoque/${produtoEstoqueId}`);
          const { produto, preco, estoque } = response.data;
          setProduto(produto);
          setPreco(preco);
          setEstoque(estoque);
        } catch (error) {
          console.error("Erro ao carregar produto estoque:", error);
        }
      };
      fetchProdutoEstoque();
    }
  }, [produtoEstoqueId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const produtoEstoqueData = {
      produto,
      preco,
      estoque,
    };

    try {
      if (produtoEstoqueId) {
        await api.put(`/produtoestoque/${produtoEstoqueId}`, produtoEstoqueData);
      } else {
        await api.post('/produtoestoque', produtoEstoqueData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o produto estoque:", error);
      alert('Erro ao salvar o produto estoque');
    }
  };

  const resetForm = () => {
    setProduto('');
    setPreco('');
    setEstoque('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{produtoEstoqueId ? 'Editar Produto Estoque' : 'Adicionar Produto Estoque'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="produtoEstoqueProduto">Produto</CFormLabel>
              <CFormInput
                type="text"
                id="produtoEstoqueProduto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="produtoEstoquePreco">Preço</CFormLabel>
              <CFormInput
                type="number"
                id="produtoEstoquePreco"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="produtoEstoqueEstoque">Estoque</CFormLabel>
              <CFormInput
                type="text"
                id="produtoEstoqueEstoque"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
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
        <CModalBody>Produto estoque salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ProdutoEstoqueAdd;
