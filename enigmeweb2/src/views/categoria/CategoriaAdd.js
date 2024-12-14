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

const CategoriaAdd = () => {
  const [nome, setNome] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoriaId = searchParams.get('id');

  useEffect(() => {
    if (categoriaId) {
      const fetchCategoria = async () => {
        try {
          const response = await api.get(`/categoria/${categoriaId}`);
          const { nome } = response.data;
          setNome(nome);
        } catch (error) {
          console.error("Erro ao carregar categoria:", error);
        }
      };
      fetchCategoria();
    }
  }, [categoriaId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const categoriaData = {
      nome,
    };

    try {
      if (categoriaId) {
        await api.put(`/categoria/${categoriaId}`, categoriaData);
      } else {
        await api.post('/categoria', categoriaData);
      }
      setModalVisible(true);
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar a categoria:", error);
      alert('Erro ao salvar a categoria');
    }
  };

  const resetForm = () => {
    setNome('');
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <h4>{categoriaId ? 'Editar Categoria' : 'Adicionar Categoria'}</h4>
          <CForm onSubmit={handleSave}>
            <div className="mb-3">
              <CFormLabel htmlFor="nomeCategoria">Nome da Categoria</CFormLabel>
              <CFormInput
                type="text"
                id="nomeCategoria"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
        <CModalBody>Categoria salva com sucesso!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setModalVisible(false)}>
            Fechar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CategoriaAdd;
