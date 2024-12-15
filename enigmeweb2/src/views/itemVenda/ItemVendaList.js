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
      const response = await api.get('/itemVenda');
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
        await api.delete(`/itemVenda/${id}`);
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
      </CCardHeader>
      <CCardBody>
        <CTable hover>
          <CTableHead>
            <CTableRow>
            <CTableHeaderCell>Código</CTableHeaderCell>
              <CTableHeaderCell>Quantidade</CTableHeaderCell>
              <CTableHeaderCell>Valor Total</CTableHeaderCell>
              <CTableHeaderCell>Produto</CTableHeaderCell>
              <CTableHeaderCell>Venda</CTableHeaderCell>
              <CTableHeaderCell>Entrega</CTableHeaderCell>
              <CTableHeaderCell>Ações</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {itensVenda.map((itemVenda) => (
              <CTableRow key={itemVenda.id}>
                <CTableDataCell>{itemVenda.id}</CTableDataCell>
                <CTableDataCell>{itemVenda.quantidade}</CTableDataCell>
                <CTableDataCell>{itemVenda.valor_total}</CTableDataCell>
                <CTableDataCell>{itemVenda.produto?.nome}</CTableDataCell>
                <CTableDataCell>{itemVenda.venda?.id}</CTableDataCell>
                <CTableDataCell>{itemVenda.entrega?.id}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="warning"
                    onClick={() => navigate(`/itemVenda/add?id=${item.id}`)}
                    className="me-2"
                  >
                    Editar
                  </CButton>
                  <CButton color="danger" onClick={() => handleDelete(itemVenda.id)}>
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
