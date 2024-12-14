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

const ClienteAdd = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clienteId = searchParams.get('id');

  useEffect(() => {
    if (clienteId) {
      const fetchCliente = async () => {
        try {
          const response = await api.get(`/cliente/${clienteId}`);
          const { nome, cpf, rg, login, senha, email, telefone } = response.data;
          setNome(nome);
          setCpf(cpf);
          setLogin(login);
          setSenha(senha);
          setEmail(email);
          setTelefone(telefone);
        } catch (error) {
          console.error("Erro ao carregar cliente:", error);
        }
      };
      fetchCliente();
    }
  }, [clienteId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const clienteData = {
      nome,
      cpf,
      login,
      senha,
      email,
      telefone,
    };

    try {
      if (clienteId) {
        await api.put(`/cliente/${clienteId}`, clienteData);
      } else {
        await api.post('/cliente', clienteData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar o cliente:", error);
      alert('Erro ao salvar o cliente');
    }
  };

  const resetForm = () => {
    setNome('');
    setCpf('');
    setLogin('');
    setSenha('');
    setEmail('');
    setTelefone('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{clienteId ? 'Editar Cliente' : 'Adicionar Cliente'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeCliente">Nome do Cliente</CFormLabel>
              <CFormInput
                type="text"
                id="nomeCliente"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cpfCliente">Cpf</CFormLabel>
              <CFormInput
                type="text"
                id="cpfCliente"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="loginCliente">Login</CFormLabel>
              <CFormInput
                type="text"
                id="loginCliente"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="senhaCliente">Senha</CFormLabel>
              <CFormInput
                type="password"
                id="senhaCliente"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="emailCliente">Email</CFormLabel>
              <CFormInput
                type="email"
                id="emailCliente"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="telefoneCliente">Telefone</CFormLabel>
              <CFormInput
                type="tel"
                id="telefoneCliente"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
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
        <CModalBody>Cliente salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ClienteAdd;
