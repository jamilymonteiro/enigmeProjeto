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

const ProdutoEstoqueAdd = () => {
  const [produtoEstoque, setProdutoEstoque] = useState({
    produto: { id: '' },
    preco: '',
    estoque: { id: '' },
  });
  const [produtos, setProdutos] = useState([]);
  const [estoques, setEstoques] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosResponse = await api.get('/produto');
        setProdutos(produtosResponse.data);

        const estoquesResponse = await api.get('/estoque');
        setEstoques(estoquesResponse.data);
      } catch (error) {
        console.error('Erro ao carregar produtos ou estoques:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await api.post('/produtoEstoque', produtoEstoque);
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar o Produto no Estoque:', error);
      alert('Erro ao salvar o Produto no Estoque');
    }
  };

  const resetForm = () => {
    setProdutoEstoque({
      produto: { id: '' },
      preco: '',
      estoque: { id: '' },
    });
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>Adicionar Produto no Estoque</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="produto">Produto</CFormLabel>
              <CFormSelect
                id="produto"
                value={produtoEstoque.produto.id}
                onChange={(e) =>
                  setProdutoEstoque({
                    ...produtoEstoque,
                    produto: { id: parseInt(e.target.value, 10) },
                  })
                }
                required
              >
                <option value="">Selecione um Produto</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome}
                  </option>
                ))}
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="preco">Preço</CFormLabel>
              <CFormInput
                type="number"
                id="preco"
                value={produtoEstoque.preco}
                onChange={(e) =>
                  setProdutoEstoque({
                    ...produtoEstoque,
                    preco: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="estoque">Estoque</CFormLabel>
              <CFormSelect
                id="estoque"
                value={produtoEstoque.estoque.id}
                onChange={(e) =>
                  setProdutoEstoque({
                    ...produtoEstoque,
                    estoque: { id: parseInt(e.target.value, 10) },
                  })
                }
                required
              >
                <option value="">Selecione um Estoque</option>
                {estoques.map((estoque) => (
                  <option key={estoque.id} value={estoque.id}>
                    {estoque.id}
                  </option>
                ))}
              </CFormSelect>
            </div>

            <CButton type="submit" color="primary">
              Salvar
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Modal de Confirmação */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>Produto no Estoque salvo com sucesso!</CModalBody>
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
