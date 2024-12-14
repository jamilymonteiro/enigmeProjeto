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

const ProdutoAdd = () => {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('') // Campo para preço como Double
  const [estoque, setEstoque] = useState('')
  const [categorias, setCategorias] = useState([])
  const [categoria, setCategoria] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const produtoId = searchParams.get('id')

  // Buscar categorias para o select
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/categoria')
        setCategorias(response.data)
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
      }
    }
    fetchCategorias()
  }, [])

  // Carregar dados do produto caso esteja editando
  useEffect(() => {
    if (produtoId) {
      const fetchProduto = async () => {
        try {
          const response = await api.get(`/produto/${produtoId}`)
          const { nome, descricao, preco, estoque, categoria } = response.data
          setNome(nome)
          setDescricao(descricao)
          setPreco(preco) // Carregar o preço como Double
          setEstoque(estoque)
          setCategoria(categoria ? categoria.id : '')
        } catch (error) {
          console.error("Erro ao carregar produto:", error)
        }
      }
      fetchProduto()
    }
  }, [produtoId])

  // Função de salvar produto
  const handleSave = async (e) => {
    e.preventDefault()

    const produtoData = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      estoque: estoque,
      categoria: { id: categoria }
    };

    try {
      if (produtoId) {
        // Editar produto existente
        await api.put(`/produto/${produtoId}`, produtoData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Adicionar novo produto
        await api.post('/produto', produtoData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      setModalVisible(true)
      setNome('')
      setDescricao('')
      setPreco('')
      setCategoria('')
      setEstoque('')
    } catch (error) {
      console.error("Erro ao salvar o produto:", error)
      alert('Erro ao salvar o produto')
    }
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{produtoId ? 'Editar Produto' : 'Adicionar Produto'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeProduto">Nome do Produto</CFormLabel>
              <CFormInput
                type="text"
                id="nomeProduto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="descricaoProduto">Descrição do Produto</CFormLabel>
              <CFormInput
                type="text"
                id="descricaoProduto"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="precoProduto">Preço</CFormLabel>
              <CFormInput
                type="text" // Tipo texto para permitir vírgula como separador decimal
                id="precoProduto"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="estoqueProduto">Estoque</CFormLabel>
              <CFormInput
                type="number"
                id="estoqueProduto"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="categoria">Categoria</CFormLabel>
              <CFormSelect
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Selecione uma Categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
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
          <CModalTitle>{produtoId ? 'Produto Editado' : 'Produto Adicionado'}</CModalTitle>
        </CModalHeader>
        <CModalBody>{produtoId ? 'Produto editado com sucesso!' : 'Produto adicionado com sucesso!'}</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ProdutoAdd
