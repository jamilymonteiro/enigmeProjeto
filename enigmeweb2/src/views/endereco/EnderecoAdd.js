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

const EnderecoAdd = () => {
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    cliente: { id: '' },
  });
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const enderecoId = searchParams.get('id');

  useEffect(() => {
    const fetchClientesEEndereco = async () => {
      try {
        // Carrega os clientes disponíveis
        const clientesResponse = await api.get('/cliente');
        setClientes(clientesResponse.data);

        // Se estamos editando, busca os dados do endereço
        if (enderecoId) {
          const enderecoResponse = await api.get(`/endereco/${enderecoId}`);
          setEndereco(enderecoResponse.data);
        }
      } catch (error) {
        console.error('Erro ao carregar clientes ou endereço:', error);
      }
    };

    fetchClientesEEndereco();
  }, [enderecoId]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (enderecoId) {
        await api.put(`/endereco/${enderecoId}`, endereco);
      } else {
        await api.post('/endereco', endereco);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar o endereço:', error);
      alert('Erro ao salvar o endereço');
    }
  };

  const resetForm = () => {
    setEndereco({
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      cep: '',
      cliente: { id: '' },
    });
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{enderecoId ? 'Editar Endereço' : 'Adicionar Endereço'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="rua">Rua</CFormLabel>
              <CFormInput
                id="rua"
                value={endereco.rua}
                onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="numero">Número</CFormLabel>
              <CFormInput
                id="numero"
                value={endereco.numero}
                onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="complemento">Complemento</CFormLabel>
              <CFormInput
                id="complemento"
                value={endereco.complemento}
                onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="bairro">Bairro</CFormLabel>
              <CFormInput
                id="bairro"
                value={endereco.bairro}
                onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cidade">Cidade</CFormLabel>
              <CFormInput
                id="cidade"
                value={endereco.cidade}
                onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="uf">UF</CFormLabel>
              <CFormInput
                id="uf"
                value={endereco.uf}
                onChange={(e) => setEndereco({ ...endereco, uf: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cep">CEP</CFormLabel>
              <CFormInput
                id="cep"
                value={endereco.cep}
                onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cliente">Cliente</CFormLabel>
              <CFormSelect
                id="cliente"
                value={endereco.cliente.id}
                onChange={(e) =>
                  setEndereco({ ...endereco, cliente: { id: parseInt(e.target.value, 10) } })
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
        <CModalBody>Endereço salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EnderecoAdd;
