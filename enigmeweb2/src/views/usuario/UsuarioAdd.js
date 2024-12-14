import React, { useState, useEffect } from 'react'
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
  CFormSelect,
} from '@coreui/react'
import api from '../../services/axiosConfig'
import { useLocation } from 'react-router-dom'

const UsuarioAdd = () => {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [permissoes, setPermissoes] = useState([])
  const [permissao, setPermissao] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const usuarioId = searchParams.get('id')

  // Buscar permissões para o select
  useEffect(() => {
    const fetchPermissoes = async () => {
      try {
        const response = await api.get('/permissao')
        setPermissoes(response.data)
      } catch (error) {
        console.error("Erro ao buscar permissões:", error)
      }
    }
    fetchPermissoes()
  }, [])

  // Carregar dados do usuário caso esteja editando
  useEffect(() => {
    if (usuarioId) {
      const fetchUsuario = async () => {
        try {
          const response = await api.get(`/usuario/${usuarioId}`)
          const { nome, cpf, login, senha, email, telefone, permissao } = response.data
          setNome(nome)
          setCpf(cpf)
          setLogin(login)
          setSenha(senha)
          setEmail(email)
          setTelefone(telefone)
          setPermissao(permissao ? permissao.id : '')
        } catch (error) {
          console.error("Erro ao carregar usuário:", error)
        }
      }
      fetchUsuario()
    }
  }, [usuarioId])

  // Função de salvar usuário
  const handleSave = async (e) => {
    e.preventDefault()

    const usuarioData = {
      nome: nome,
      cpf: cpf,
      login: login,
      senha: senha,
      email: email,
      telefone: telefone,
      permissao: { id: permissao }
    };

    try {
      if (usuarioId) {
        // Editar usuário existente
        await api.put(`/usuario/${usuarioId}`, usuarioData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Adicionar novo usuário
        await api.post('/usuario', usuarioData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      setModalVisible(true)
      setNome('')
      setCpf('')
      setLogin('')
      setSenha('')
      setEmail('')
      setTelefone('')
      setPermissao('')
    } catch (error) {
      console.error("Erro ao salvar o usuário:", error)
      alert('Erro ao salvar o usuário')
    }
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{usuarioId ? 'Editar Usuário' : 'Adicionar Usuário'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeUsuario">Nome</CFormLabel>
              <CFormInput
                type="text"
                id="nomeUsuario"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="cpfUsuario">CPF</CFormLabel>
              <CFormInput
                type="text"
                id="cpfUsuario"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="loginUsuario">Login</CFormLabel>
              <CFormInput
                type="text"
                id="loginUsuario"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="senhaUsuario">Senha</CFormLabel>
              <CFormInput
                type="password"
                id="senhaUsuario"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="emailUsuario">E-mail</CFormLabel>
              <CFormInput
                type="email"
                id="emailUsuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="telefoneUsuario">Telefone</CFormLabel>
              <CFormInput
                type="text"
                id="telefoneUsuario"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="permissao">Permissão</CFormLabel>
              <CFormSelect
                id="permissao"
                value={permissao}
                onChange={(e) => setPermissao(e.target.value)}
                required
              >
                <option value="">Selecione uma Permissão</option>
                {permissoes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
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
          <CModalTitle>{usuarioId ? 'Usuário Editado' : 'Usuário Adicionado'}</CModalTitle>
        </CModalHeader>
        <CModalBody>{usuarioId ? 'Usuário editado com sucesso!' : 'Usuário adicionado com sucesso!'}</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default UsuarioAdd
