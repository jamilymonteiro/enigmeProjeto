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

const VendaAdd = () => {
  const [data, setData] = useState('');
  const [cliente, setCliente] = useState('');
  const [endereco, setEndereco] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendaId = searchParams.get('id');

  useEffect(() => {
    if (vendaId) {
      const fetchVenda = async () => {
        try {
          const response = await api.get(`/venda/${vendaId}`);
          const { data, cliente, endereco } = response.data;
          setData(data);
          setCliente(cliente);
          setEndereco(endereco);
        } catch (error) {
          console.error("Erro ao carregar venda:", error);
        }
      };
      fetchVenda();
    }
  }, [vendaId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const vendaData = {
      data,
      cliente,
      endereco,
    };

    try {
      if (vendaId) {
        await api.put(`/venda/${vendaId}`, vendaData);
      } else {
        await api.post('/venda', vendaData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar a venda:", error);
      alert('Erro ao salvar a venda');
    }
  };

  const resetForm = () => {
    setData('');
    setCliente('');
    setEndereco('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{vendaId ? 'Editar Venda' : 'Adicionar Venda'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="dataVenda">Data</CFormLabel>
              <CFormInput
                type="date"
                id="dataVenda"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="clienteVenda">Cliente</CFormLabel>
              <CFormInput
                type="text"
                id="clienteVenda"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="enderecoVenda">Endereço</CFormLabel>
              <CFormInput
                type="text"
                id="enderecoVenda"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
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
        <CModalBody>Venda salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default VendaAdd;
