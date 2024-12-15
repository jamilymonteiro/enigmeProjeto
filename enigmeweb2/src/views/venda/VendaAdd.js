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

const VendaAdd = () => {
  const [venda, setVenda] = useState({
    data: '',
    cliente: { id: '' },
    endereco: { id: '' }, // Alterado para armazenar o endereço associado
  });
  const [clientes, setClientes] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vendaId = searchParams.get('id');

  useEffect(() => {
    const fetchClientesEEnderecos = async () => {
      try {
        // Carrega os clientes disponíveis
        const clientesResponse = await api.get('/cliente');
        setClientes(clientesResponse.data);

        // Carrega os endereços disponíveis
        const enderecosResponse = await api.get('/endereco');
        setEnderecos(enderecosResponse.data);

        // Se estamos editando, busca os dados da venda
        if (vendaId) {
          const vendaResponse = await api.get(`/venda/${vendaId}`);
          setVenda(vendaResponse.data);
        }
      } catch (error) {
        console.error('Erro ao carregar clientes ou endereços:', error);
      }
    };

    fetchClientesEEnderecos();
  }, [vendaId]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (vendaId) {
        await api.put(`/venda/${vendaId}`, venda);
      } else {
        await api.post('/venda', venda);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar a venda:', error);
      alert('Erro ao salvar a venda');
    }
  };

  const resetForm = () => {
    setVenda({
      data: '',
      cliente: { id: '' },
      endereco: { id: '' },
    });
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
                value={venda.data}
                onChange={(e) => setVenda({ ...venda, data: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="clienteVenda">Cliente</CFormLabel>
              <CFormSelect
                id="clienteVenda"
                value={venda.cliente.id}
                onChange={(e) =>
                  setVenda({ ...venda, cliente: { id: parseInt(e.target.value, 10) } })
                }
                required
              >
                <option value="">Selecione um Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="enderecoVenda">Endereço</CFormLabel>
              <CFormSelect
                id="enderecoVenda"
                value={venda.endereco.id}
                onChange={(e) =>
                  setVenda({ ...venda, endereco: { id: parseInt(e.target.value, 10) } })
                }
                required
              >
                <option value="">Selecione um Endereço</option>
                {enderecos.map((endereco) => (
                  <option key={endereco.id} value={endereco.id}>
                    {endereco.rua}, {endereco.numero} - {endereco.bairro}
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
