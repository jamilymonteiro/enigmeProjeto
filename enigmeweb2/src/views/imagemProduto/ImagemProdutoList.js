import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/axiosConfig';

const ImagemProdutoList = () => {
  const [imagens, setImagens] = useState([]);
  const navigate = useNavigate();

  const fetchImagens = async () => {
    try {
      const response = await api.get('/imagem-produto');
      setImagens(response.data);
    } catch (error) {
      console.error('Erro ao carregar imagens dos produtos:', error);
    }
  };

  useEffect(() => {
    fetchImagens();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir esta imagem do produto?')) {
      try {
        await api.delete(`/imagem-produto/${id}`);
        fetchImagens();
      } catch (error) {
        console.error('Erro ao excluir imagem do produto:', error);
        alert('Erro ao excluir imagem do produto');
      }
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h4>Lista de Imagens dos Produtos</h4>
      </CCardHeader>
      <CCardBody>
        <CTable hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Produto</CTableHeaderCell>
              <CTableHeaderCell>Endereço do Arquivo</CTableHeaderCell>
              <CTableHeaderCell>Ações</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {imagens.map((imagem) => (
              <CTableRow key={imagem.id}>
                <CTableDataCell>{imagem.produto.nome}</CTableDataCell>
                <CTableDataCell>{imagem.enderecoArquivo}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="warning"
                    onClick={() => navigate(`/imagem-produto/add?id=${imagem.id}`)}
                    className="me-2"
                  >
                    Editar
                  </CButton>
                  <CButton color="danger" onClick={() => handleDelete(imagem.id)}>
                    Excluir
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default ImagemProdutoList;
