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
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/axiosConfig';

const EstoqueAdd = () => {
  const [quantidade, setQuantidade] = useState('');
  const [produto, setProduto] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const estoqueId = searchParams.get('id');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produto');
        setProdutos(response.data);

        if (estoqueId) {
          const estoqueResponse = await api.get(`/estoque/${estoqueId}`);
          const estoque = estoqueResponse.data;
          setQuantidade(estoque.quantidade);
          setProduto(estoque.produto); // Mudar para objeto completo do produto
        }
      } catch (error) {
        console.error('Erro ao carregar produtos ou estoque:', error);
      }
    };

    fetchProdutos();
  }, [estoqueId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const estoqueData = { quantidade, produto };

    try {
      if (estoqueId) {
        await api.put(`/estoque/${estoqueId}`, estoqueData);
      } else {
        await api.post('/estoque', estoqueData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar estoque:', error);
      alert('Erro ao salvar estoque');
    }
  };

  const resetForm = () => {
    setQuantidade('');
    setProduto({});
  };

  return (
    <CCard>
      <CCardBody>
        <h4>{estoqueId ? 'Editar Estoque' : 'Adicionar Estoque'}</h4>
        <CForm onSubmit={handleSave}>
          <div className="mb-3">
            <CFormLabel htmlFor="produto">Produto</CFormLabel>
            <CFormSelect
              id="produto"
              value={produto.id || ''}
              onChange={(e) => {
                const selectedProduto = produtos.find(p => p.id === parseInt(e.target.value));
                setProduto(selectedProduto || {});
              }}
              required
            >
              <option value="">Selecione um Produto</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="quantidade">Quantidade</CFormLabel>
            <CFormInput
              type="number"
              id="quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </div>
          <CButton type="submit" color="primary">
            Salvar
          </CButton>
        </CForm>
      </CCardBody>

      {/* Modal de Confirmação */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>Estoque salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
};

export default EstoqueAdd;
