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
import { useLocation } from 'react-router-dom';

const ItemVendaAdd = () => {
  const [itensVendas, setItensVendas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [produtoEstoques, setProdutoEstoques] = useState([]);
  const [itemVenda, setItemVenda] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [entrega, setEntrega] = useState('');
  const [venda, setVenda] = useState('');
  const [produtoEstoque, setProdutoEstoque] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemVendaId = searchParams.get('id');

  useEffect(() => {
    const fetchItensVendasProdutosEntregasVendasProdutoEstoques = async () => {
      try {
        const [itensVendasResponse, produtosResponse, entregasResponse, vendasResponse, produtoEstoquesResponse] = await Promise.all([
          api.get('/itemVenda'),
          api.get('/produto'),
          api.get('/entrega'),
          api.get('/venda'),
          api.get('/produtoEstoque'),
        ]);

        if (itensVendasResponse.data) {
          setItensVendas(itensVendasResponse.data);
        } else {
          console.error("Erro ao carregar itens de venda.");
        }

        if (produtosResponse.data) {
          setProdutos(produtosResponse.data);
        } else {
          console.error("Erro ao carregar produtos.");
        }

        if (entregasResponse.data) {
          setEntregas(entregasResponse.data);
        } else {
          console.error("Erro ao carregar entregas.");
        }

        if (vendasResponse.data) {
          setVendas(vendasResponse.data);
        } else {
          console.error("Erro ao carregar vendas.");
        }

        if (produtoEstoquesResponse.data) {
          setProdutoEstoques(produtoEstoquesResponse.data);
        } else {
          console.error("Erro ao carregar produtos em estoque.");
        }
      } catch (error) {
        console.error('Erro ao carregar itens de venda, produtos, entregas, vendas e produtos em estoque:', error);
      }
    };

    fetchItensVendasProdutosEntregasVendasProdutoEstoques();

    if (itemVendaId) {
      const fetchItemVenda = async () => {
        try {
          const response = await api.get(`/item-venda/${itemVendaId}`);
          const { produto, quantidade, valor_total, entrega, venda, produtoEstoque } = response.data;
          setProduto(produto.id);
          setQuantidade(quantidade);
          setValorTotal(valor_total);
          setEntrega(entrega.id);
          setVenda(venda.id);
          setProdutoEstoque(produtoEstoque.id);
        } catch (error) {
          console.error("Erro ao carregar item de venda:", error);
        }
      };
      fetchItemVenda();
    }
  }, [itemVendaId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const itemVendaData = {
      produto: { id: produto },
      quantidade,
      valor_total: valorTotal,
      entrega: { id: entrega },
      venda: { id: venda },
      produtoEstoque: { id: produtoEstoque },
    };

    try {
      if (itemVendaId) {
        await api.put(`/itemVenda/${itemVendaId}`, itemVendaData);
      } else {
        await api.post('/itemVenda', itemVendaData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar item de venda:", error);
      alert('Erro ao salvar item de venda');
    }
  };

  const resetForm = () => {
    setProduto('');
    setQuantidade('');
    setValorTotal('');
    setEntrega('');
    setVenda('');
    setProdutoEstoque('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{itemVendaId ? 'Editar Item de Venda' : 'Adicionar Item de Venda'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="produto">Produto</CFormLabel>
              <CFormSelect
                id="produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
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
              <CFormLabel htmlFor="quantidade">Quantidade</CFormLabel>
              <CFormInput
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="valorTotal">Valor Total</CFormLabel>
              <CFormInput
                type="text"
                id="valorTotal"
                value={valorTotal}
                onChange={(e) => setValorTotal(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="entrega">Entrega</CFormLabel>
              <CFormSelect
                id="entrega"
                value={entrega}
                onChange={(e) => setEntrega(e.target.value)}
                required
              >
                <option value="">Selecione uma Entrega</option>
                {entregas.map((entrega) => (
                  <option key={entrega.id} value={entrega.id}>
                    {entrega.codigoRastreio}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="venda">Venda</CFormLabel>
              <CFormSelect
                id="venda"
                value={venda}
                onChange={(e) => setVenda(e.target.value)}
                required
              >
                <option value="">Selecione uma Venda</option>
                {vendas.map((venda) => (
                  <option key={venda.id} value={venda.id}>
                    {venda.id}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="produtoEstoque">Produto Estoque</CFormLabel>
              <CFormSelect
                id="produtoEstoque"
                value={produtoEstoque}
                onChange={(e) => setProdutoEstoque(e.target.value)}
                required
              >
                <option value="">Selecione o estoque</option>
                {produtoEstoques.map((estoque) => (
                  <option key={estoque.id} value={estoque.id}>
                    {estoque.id}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <CButton type="submit" color="primary">Salvar</CButton>
          </CForm>
        </CCardBody>
      </CCard>

      {/* Modal de Confirmação */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Sucesso</CModalTitle>
        </CModalHeader>
        <CModalBody>Item de venda salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ItemVendaAdd;
