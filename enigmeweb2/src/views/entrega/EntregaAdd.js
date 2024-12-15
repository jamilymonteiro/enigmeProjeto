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

const EntregaAdd = () => {
  const [transportadoras, setTransportadoras] = useState([]);
  const [transportadora, setTransportadora] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [codigoRastreio, setCodigoRastreio] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const entregaId = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTransportadora = await api.get('/transportadora');
        setTransportadoras(responseTransportadora.data);

        if (entregaId) {
          const responseEntrega = await api.get(`/entrega/${entregaId}`);
          const { transportadora, quantidade, codigoRastreio } = responseEntrega.data;
          setTransportadora(transportadora.id);
          setQuantidade(quantidade);
          setCodigoRastreio(codigoRastreio);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, [entregaId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const entregaData = {
      transportadora: { id: transportadora }, // Enviando objeto relacionado com o ID
      quantidade,
      codigoRastreio,
    };

    try {
      if (entregaId) {
        await api.put(`/entrega/${entregaId}`, entregaData);
      } else {
        await api.post('/entrega', entregaData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar a entrega:', error);
      alert('Erro ao salvar a entrega');
    }
  };

  const resetForm = () => {
    setTransportadora('');
    setQuantidade('');
    setCodigoRastreio('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{entregaId ? 'Editar Entrega' : 'Adicionar Entrega'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="transportadora">Transportadora</CFormLabel>
              <CFormSelect
                id="transportadora"
                value={transportadora}
                onChange={(e) => setTransportadora(e.target.value)}
                required
              >
                <option value="">Selecione uma Transportadora</option>
                {transportadoras.map((transp) => (
                  <option key={transp.id} value={transp.id}>
                    {transp.nome} {/* Adapte "nome" para o atributo correto */}
                  </option>
                ))}
              </CFormSelect>
            </div>
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
              <CFormLabel htmlFor="codigoRastreio">Código de Rastreamento</CFormLabel>
              <CFormInput
                type="text"
                id="codigoRastreio"
                value={codigoRastreio}
                onChange={(e) => setCodigoRastreio(e.target.value)}
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
        <CModalBody>Entrega salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EntregaAdd;
