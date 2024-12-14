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

const AvaliacaoAdd = () => {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [cliente, setCliente] = useState('');
  const [produto, setProduto] = useState('');
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const avaliacaoId = searchParams.get('id');

  useEffect(() => {
    const fetchClientesProdutos = async () => {
      try {
        const [clientesResponse, produtosResponse] = await Promise.all([
          api.get('/cliente'),
          api.get('/produto'),
        ]);

        if (clientesResponse.data) {
          setClientes(clientesResponse.data);
        } else {
          console.error("Erro ao carregar clientes.");
        }

        if (produtosResponse.data) {
          setProdutos(produtosResponse.data);
        } else {
          console.error("Erro ao carregar produtos.");
        }
      } catch (error) {
        console.error('Erro ao carregar clientes e produtos:', error);
      }
    };

    fetchClientesProdutos();

    if (avaliacaoId) {
      const fetchAvaliacao = async () => {
        try {
          const response = await api.get(`/avaliacao/${avaliacaoId}`);
          const { cliente, produto, nota, comentario } = response.data;
          setCliente(cliente.id);
          setProduto(produto.id);
          setNota(nota);
          setComentario(comentario);
        } catch (error) {
          console.error("Erro ao carregar avaliação:", error);
        }
      };
      fetchAvaliacao();
    }
  }, [avaliacaoId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const avaliacaoData = {
      cliente: { id: cliente },
      produto: { id: produto },
      nota,
      comentario,
    };

    try {
      if (avaliacaoId) {
        await api.put(`/avaliacao/${avaliacaoId}`, avaliacaoData);
      } else {
        await api.post('/avaliacao', avaliacaoData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
      alert('Erro ao salvar avaliação');
    }
  };

  const resetForm = () => {
    setCliente('');
    setProduto('');
    setNota('');
    setComentario('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{avaliacaoId ? 'Editar Avaliação' : 'Adicionar Avaliação'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="cliente">Cliente</CFormLabel>
              <CFormSelect
                id="cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
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
              <CFormLabel htmlFor="produto">Produto</CFormLabel>
              <CFormSelect
                id="produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                required
              >
                <option value="">Selecione um Produto</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="nota">Nota</CFormLabel>
              <CFormSelect
                id="nota"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                required
              >
                <option value="">Selecione uma Nota</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="comentario">Comentário</CFormLabel>
              <CFormInput
                type="text"
                id="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
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
        <CModalBody>Avaliação salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AvaliacaoAdd;
