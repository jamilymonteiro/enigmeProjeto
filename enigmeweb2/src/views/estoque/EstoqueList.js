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

const EstoqueList = () => {
  const [estoques, setEstoques] = useState([]);
  const navigate = useNavigate();

  const fetchEstoques = async () => {
    try {
      const response = await api.get('/estoque');
      setEstoques(response.data);
    } catch (error) {
      console.error('Erro ao carregar estoques:', error);
    }
  };

  useEffect(() => {
    fetchEstoques();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este estoque?')) {
      try {
        await api.delete(`/estoque/${id}`);
        fetchEstoques();
      } catch (error) {
        console.error('Erro ao excluir estoque:', error);
        alert('Erro ao excluir estoque');
      }
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h4>Lista de Estoques</h4>
      </CCardHeader>
      <CCardBody>
        <CTable hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Produto</CTableHeaderCell>
              <CTableHeaderCell>Quantidade</CTableHeaderCell>
              <CTableHeaderCell>Ações</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {estoques.map((estoque) => (
              <CTableRow key={estoque.id}>
                <CTableDataCell>{estoque.produto.nome}</CTableDataCell>
                <CTableDataCell>{estoque.quantidade}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="warning"
                    onClick={() => navigate(`/estoque/add?id=${estoque.id}`)}
                    className="me-2"
                  >
                    Editar
                  </CButton>
                  <CButton color="danger" onClick={() => handleDelete(estoque.id)}>
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

export default EstoqueList;
