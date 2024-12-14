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

const TransportadoraAdd = () => {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transportadoraId = searchParams.get('id');

  useEffect(() => {
    if (transportadoraId) {
      const fetchTransportadora = async () => {
        try {
          const response = await api.get(`/transportadora/${transportadoraId}`);
          const { nome } = response.data;
          const { contato } = response.data;
          setNome(nome);
          setContato(contato);
        } catch (error) {
          console.error("Erro ao carregar transportadora:", error);
        }
      };
      fetchTransportadora();
    }
  }, [transportadoraId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const transportadoraData = {
      nome,
      contato,
    };

    try {
      if (transportadoraId) {
        await api.put(`/transportadora/${transportadoraId}`, transportadoraData);
      } else {
        await api.post('/transportadora', transportadoraData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar transportadora:", error);
      alert('Erro ao salvar transportadora');
    }
  };

  const resetForm = () => {
    setNome('');
    setContato('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{transportadoraId ? 'Editar Transportadora' : 'Adicionar Transportadora'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeTransportadora">Nome da Transportadora</CFormLabel>
              <CFormInput
                type="text"
                id="nomeTransportadora"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="contatoTransportadora">Contato da Transportadora</CFormLabel>
              <CFormInput
                type="text"
                id="contatoTransportadora"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                required
              />
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
        <CModalBody>Transportadora salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default TransportadoraAdd;
