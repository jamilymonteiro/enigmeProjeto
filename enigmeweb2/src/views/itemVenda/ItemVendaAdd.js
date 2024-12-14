import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/axiosConfig';

const ItemVendaAdd = () => {
  const [quantidade, setQuantidade] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [produtoEstoque, setProdutoEstoque] = useState('');
  const [produtosEstoque, setProdutosEstoque] = useState([]);
  const [produto, setProduto] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [entrega, setEntrega] = useState('');
  const [entregas, setEntregas] = useState([]);
  const [venda, setVenda] = useState('');
  const [vendas, setVendas] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemVendaId = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [produtosEstoqueResponse, produtosResponse, entregasResponse, vendasResponse] =
          await Promise.all([
            api.get('/produto-estoque'),
            api.get('/produto'),
            api.get('/entrega'),
            api.get('/venda'),
          ]);

        setProdutosEstoque(produtosEstoqueResponse.data);
        setProdutos(produtosResponse.data);
        setEntregas(entregasResponse.data);
        setVendas(vendasResponse.data);

        if (itemVendaId) {
          const itemVendaResponse = await api.get(`/item-venda/${itemVendaId}`);
          const itemVenda = itemVendaResponse.data;
          setQuantidade(itemVenda.quantidade);
          setValorTotal(itemVenda.valor_total);
          setProdutoEstoque(itemVenda.produtoEstoque.id);
          setProduto(itemVenda.produto.id);
          setEntrega(itemVenda.entrega?.id || '');
          setVenda(itemVenda.venda.id);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, [itemVendaId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const itemVendaData = {
      quantidade,
      valor_total: valorTotal,
      produtoEstoque,
      produto,
      entrega,
      venda,
    };

    try {
      if (itemVendaId) {
        await api.put(`/item-venda/${itemVendaId}`, itemVendaData);
      } else {
        await api.post('/item-venda', itemVendaData);
      }
      navigate('/item-venda');
    } catch (error) {
      console.error('Erro ao salvar item de venda:', error);
      alert('Erro ao salvar item de venda');
    }
  };

  return (
    <CCard>
      <CCardBody>
        <h4>{itemVendaId ? 'Editar Item de Venda' : 'Adicionar Item de Venda'}</h4>
        <CForm onSubmit={handleSave}>
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
              type="number"
              step="0.01"
              id="valorTotal"
              value={valorTotal}
              onChange={(e) => setValorTotal(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="produtoEstoque">Produto em Estoque</CFormLabel>
            <CFormSelect
              id="produtoEstoque"
              value={produtoEstoque}
              onChange={(e) => setProdutoEstoque(e.target.value)}
              required
            >
              <option value="">Selecione um Produto em Estoque</option>
              {produtosEstoque.map((pe) => (
                <option key={pe.id} value={pe.id}>
                  {pe.nome}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="produto">Produto</CFormLabel>
            <CFormSelect
              id="produto"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
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
            <CFormLabel htmlFor="entrega">Entrega</CFormLabel>
            <CFormSelect
              id="entrega"
              value={entrega}
              onChange={(e) => setEntrega(e.target.value)}
            >
              <option value="">Selecione uma Entrega</option>
              {entregas.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.codigoRastreio}
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
              {vendas.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.codigo}
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
  );
};

export default ItemVendaAdd;
