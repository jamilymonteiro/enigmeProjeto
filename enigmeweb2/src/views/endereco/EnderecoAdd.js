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
import { useParams, useNavigate } from 'react-router-dom';

const UsuarioAdd = () => {
  const [usuario, setUsuario] = useState({
    nome: '',
    cpf: '',
    login: '',
    senha: '',
    email: '',
    telefone: '',
    permissao: { ID: '' }, // Iniciar com um objeto vazio
  });
  const [permissoes, setPermissoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Obtém o id do usuário se estiver editando
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  // Função para carregar as permissões disponíveis
  const fetchPermissoes = async () => {
    try {
      const response = await api.get('/permissao');
      const data = Array.isArray(response.data) ? response.data : [];
      setPermissoes(data);
    } catch (error) {
      console.error('Erro ao buscar permissões:', error);
    }
  };

  // Função para buscar as informações do usuário se estiver em modo de edição
  const fetchUsuario = async () => {
    if (id) {
      try {
        const response = await api.get(`/usuario/${id}`);
        setUsuario(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissoes();
    fetchUsuario();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await api.put(`/usuario/${id}`, usuario);
      } else {
        await api.post('/usuario', usuario);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro ao salvar usuário');
    }
  };

  const resetForm = () => {
    setUsuario({
      nome: '',
      cpf: '',
      login: '',
      senha: '',
      email: '',
      telefone: '',
      permissao: { ID: '' },
    });
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{id ? 'Editar Usuário' : 'Adicionar Usuário'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nome">Nome</CFormLabel>
              <CFormInput
                id="nome"
                value={usuario.nome}
                onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="cpf">CPF</CFormLabel>
              <CFormInput
                id="cpf"
                value={usuario.cpf}
                onChange={(e) => setUsuario({ ...usuario, cpf: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="login">Login</CFormLabel>
              <CFormInput
                id="login"
                value={usuario.login}
                onChange={(e) => setUsuario({ ...usuario, login: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="senha">Senha</CFormLabel>
              <CFormInput
                type="password"
                id="senha"
                value={usuario.senha}
                onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="email">Email</CFormLabel>
              <CFormInput
                id="email"
                value={usuario.email}
                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="telefone">Telefone</CFormLabel>
              <CFormInput
                id="telefone"
                value={usuario.telefone}
                onChange={(e) => setUsuario({ ...usuario, telefone: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="permissao">Permissão</CFormLabel>
              <CFormSelect
                id="permissao"
                value={usuario.permissao.ID}
                onChange={(e) => setUsuario({ ...usuario, permissao: { ID: e.target.value } })}
                required
              >
                <option value="">Selecione uma permissão</option>
                {permissoes.map((permissao) => (
                  <option key={permissao.id} value={permissao.id}>
                    {permissao.nome}
                  </option>
                ))}
              </CFormSelect>
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
        <CModalBody>Usuário salvo com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default UsuarioAdd;
