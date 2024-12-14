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

const ImagemProdutoAdd = () => {
  const [enderecoArquivo, setEnderecoArquivo] = useState('');
  const [produto, setProduto] = useState('');
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const imagemProdutoId = searchParams.get('id');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produto');
        setProdutos(response.data);

        if (imagemProdutoId) {
          const imagemResponse = await api.get(`/imagem-produto/${imagemProdutoId}`);
          const imagemProduto = imagemResponse.data;
          setEnderecoArquivo(imagemProduto.enderecoArquivo);
          setProduto(imagemProduto.produto.id);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos ou imagem do produto:', error);
      }
    };

    fetchProdutos();
  }, [imagemProdutoId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const imagemProdutoData = { enderecoArquivo, produto };

    try {
      if (imagemProdutoId) {
        await api.put(`/imagem-produto/${imagemProdutoId}`, imagemProdutoData);
      } else {
        await api.post('/imagem-produto', imagemProdutoData);
      }
      navigate('/imagem-produto');
    } catch (error) {
      console.error('Erro ao salvar imagem do produto:', error);
      alert('Erro ao salvar imagem do produto');
    }
  };

  return (
    <CCard>
      <CCardBody>
        <h4>{imagemProdutoId ? 'Editar Imagem do Produto' : 'Adicionar Imagem do Produto'}</h4>
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
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="enderecoArquivo">Endereço do Arquivo</CFormLabel>
            <CFormInput
              type="text"
              id="enderecoArquivo"
              value={enderecoArquivo}
              onChange={(e) => setEnderecoArquivo(e.target.value)}
              required
            />
          </div>
          <CButton type="submit" color="primary">
            Salvar
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default ImagemProdutoAdd;
