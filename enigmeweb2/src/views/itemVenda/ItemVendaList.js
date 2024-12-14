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

const ItemVendaList = () => {
  const [itensVenda, setItensVenda] = useState([]);
  const navigate = useNavigate();

  const fetchItensVenda = async () => {
    try {
      const response = await api.get('/item-venda');
      setItensVenda(response.data);
    } catch (error) {
      console.error('Erro ao carregar itens de venda:', error);
    }
  };

  useEffect(() => {
    fetchItensVenda();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este item de venda?')) {
      try {
        await api.delete(`/item-venda/${id}`);
        fetchItensVenda();
      } catch (error) {
        console.error('Erro ao excluir item de venda:', error);
        alert('Erro ao excluir item de venda');
      }
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h4>Itens de Venda</h4>
        <CButton color="primary" onClick={() => navigate('/item-venda/add')}>
          Adicionar Item de Venda
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CTable hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Quantidade</CTableHeaderCell>
              <CTableHeaderCell>Valor Total</CTableHeaderCell>
              <CTableHeaderCell>Produto</CTableHeaderCell>
              <CTableHeaderCell>Ações</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {itensVenda.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.quantidade}</CTableDataCell>
                <CTableDataCell>{item.valor_total}</CTableDataCell>
                <CTableDataCell>{item.produto?.nome}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="warning"
                    onClick={() => navigate(`/item-venda/add?id=${item.id}`)}
                    className="me-2"
                  >
                    Editar
                  </CButton>
                  <CButton color="danger" onClick={() => handleDelete(item.id)}>
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

export default ItemVendaList;
