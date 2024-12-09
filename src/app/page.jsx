"use client";
import React from "react";
import BitWinHeader from "../components/bit-win-header";
import ButtonStyles from "../components/button-styles";
import SidebarFilterMenu from "../components/sidebar-filter-menu";
import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [patrimonios, setPatrimonios] = React.useState([]);
  const [estados, setEstados] = React.useState([]);
  const [categorias, setCategorias] = React.useState([]);
  const [situacoes, setSituacoes] = React.useState([]);
  const [selectedPatrimonio, setSelectedPatrimonio] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isCreateMode, setIsCreateMode] = React.useState(false);
  const [newPatrimonio, setNewPatrimonio] = React.useState({
    descricao: "",
    categoria_id: "",
    estado_id: "",
    situacao_id: "",
    imagem_url: "",
    observacoes: "",
  });
  const [file, setFile] = React.useState(null);
  const [upload, { loading }] = useUpload();
  const { data: user } = useUser();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const patrimoniosResponse = await fetch("/api/supabase-data-fetcher", {
          method: "POST",
          body: JSON.stringify({ tableName: "patrimonios" }),
        });
        const estadosResponse = await fetch("/api/supabase-data-fetcher", {
          method: "POST",
          body: JSON.stringify({ tableName: "estados" }),
        });
        const categoriasResponse = await fetch("/api/supabase-data-fetcher", {
          method: "POST",
          body: JSON.stringify({ tableName: "categorias" }),
        });
        const situacoesResponse = await fetch("/api/supabase-data-fetcher", {
          method: "POST",
          body: JSON.stringify({ tableName: "situacoes_patrimonio" }),
        });

        const patrimoniosData = await patrimoniosResponse.json();
        const estadosData = await estadosResponse.json();
        const categoriasData = await categoriasResponse.json();
        const situacoesData = await situacoesResponse.json();

        setPatrimonios(patrimoniosData || []);
        setEstados(estadosData || []);
        setCategorias(categoriasData || []);
        setSituacoes(situacoesData || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const getNameById = (id, list) => {
    if (!list) return "Não disponível";
    const item = list.find((el) => el.id === id);
    return item ? item.nome || item.descricao : "Não disponível";
  };

  const handleApplyFilters = (filteredPatrimonios) => {
    setPatrimonios(filteredPatrimonios);
  };

  const handleRowClick = (patrimonio, editable = false) => {
    setSelectedPatrimonio(patrimonio);
    setIsEditMode(editable);
  };

  const handleModalClose = () => {
    setSelectedPatrimonio(null);
    setIsEditMode(false);
    setIsCreateMode(false);
  };

  const handleUpdate = async () => {
    try {
      await fetch("/api/supabase-table-updater", {
        method: "POST",
        body: JSON.stringify({
          tableName: "patrimonios",
          id: selectedPatrimonio.id,
          columnValues: selectedPatrimonio,
        }),
      });
      handleModalClose();
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };

  const handleCreate = async () => {
    const { url, error } = await upload({ file });
    if (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      return;
    }
    try {
      await fetch("/api/new-function", {
        method: "POST",
        body: JSON.stringify({
          tableName: "patrimonios",
          data: {
            ...newPatrimonio,
            imagem_url: url,
            usuario_email: user.email,
          },
        }),
      });
      handleModalClose();
    } catch (error) {
      console.error("Erro ao criar novo patrimônio:", error);
    }
  };

  return (
    <div>
      <BitWinHeader />
      <div className="flex">
        <SidebarFilterMenu onApplyFilters={handleApplyFilters} />
        <div className="flex-1 bg-[#FCFCFC] p-4 rounded ml-4">
          <div className="flex justify-between mb-4">
            <ButtonStyles text="Novo" onClick={() => setIsCreateMode(true)} />
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#F2F2F2]">
                <th className="px-2 py-1 text-[#101012] text-left font-medium text-xs">
                  FOTO
                </th>
                <th className="px-2 py-1 text-[#101012] text-left font-medium text-xs">
                  NOME
                </th>
                <th className="px-2 py-1 text-[#101012] text-left font-medium text-xs">
                  ESTADO
                </th>
                <th className="px-2 py-1 text-[#101012] text-left font-medium text-xs">
                  SITUAÇÃO
                </th>
                <th className="px-2 py-1 text-[#101012] text-left font-medium text-xs">
                  CATEGORIA
                </th>
                <th className="px-2 py-1 text-[#101012] text-left font-medium text-xs">
                  VALOR
                </th>
                <th className="px-2 py-1 text-[#101012] text-left font-medium text-xs">
                  AÇÕES
                </th>
              </tr>
            </thead>
            <tbody>
              {patrimonios.map((patrimonio) => (
                <tr
                  key={patrimonio.id}
                  className="border-t border-[#D1D1D3] cursor-pointer"
                  onClick={() => handleRowClick(patrimonio)}
                >
                  <td className="px-2 py-1">
                    <img
                      src={patrimonio.imagem_url}
                      alt={`Foto de ${patrimonio.descricao}`}
                      className="w-[80px] h-[80px] object-cover rounded"
                    />
                  </td>
                  <td className="px-2 py-1 text-[#101012] text-xs">
                    {patrimonio.descricao}
                  </td>
                  <td className="px-2 py-1 text-[#101012] text-xs">
                    {getNameById(patrimonio.estado_id, estados)}
                  </td>
                  <td className="px-2 py-1 text-[#101012] text-xs">
                    {getNameById(patrimonio.situacao_id, situacoes)}
                  </td>
                  <td className="px-2 py-1 text-[#101012] text-xs">
                    {getNameById(patrimonio.categoria_id, categorias)}
                  </td>
                  <td className="px-2 py-1 text-[#101012] text-xs">
                    {patrimonio.valor_mercado}
                  </td>
                  <td className="px-2 py-1 text-[#101012] text-xs">
                    <ButtonStyles
                      text="Editar"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(patrimonio, true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(selectedPatrimonio || isCreateMode) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[500px]">
            <h2 className="text-xl font-medium mb-4">
              {isEditMode
                ? "Editar Patrimônio"
                : isCreateMode
                ? "Novo Patrimônio"
                : "Detalhes do Patrimônio"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-[#101012]">Nome</label>
                {isEditMode || isCreateMode ? (
                  <input
                    type="text"
                    value={
                      isCreateMode
                        ? newPatrimonio.descricao
                        : selectedPatrimonio.descricao
                    }
                    onChange={(e) =>
                      isCreateMode
                        ? setNewPatrimonio({
                            ...newPatrimonio,
                            descricao: e.target.value,
                          })
                        : setSelectedPatrimonio({
                            ...selectedPatrimonio,
                            descricao: e.target.value,
                          })
                    }
                    className="w-full border border-[#D1D1D3] p-2 rounded"
                  />
                ) : (
                  <p className="text-sm text-[#101012]">
                    {selectedPatrimonio.descricao}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#101012]">
                  Categoria
                </label>
                {isCreateMode && (
                  <select
                    value={newPatrimonio.categoria_id}
                    onChange={(e) =>
                      setNewPatrimonio({
                        ...newPatrimonio,
                        categoria_id: e.target.value,
                      })
                    }
                    className="w-full border border-[#D1D1D3] p-2 rounded"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#101012]">Imagem</label>
                {isCreateMode && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile(e.target.files[0]);
                      }
                    }}
                    className="w-full border border-[#D1D1D3] p-2 rounded"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm text-[#101012]">Estado</label>
                {isCreateMode && (
                  <select
                    value={newPatrimonio.estado_id}
                    onChange={(e) =>
                      setNewPatrimonio({
                        ...newPatrimonio,
                        estado_id: e.target.value,
                      })
                    }
                    className="w-full border border-[#D1D1D3] p-2 rounded"
                  >
                    <option value="">Selecione um estado</option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nome} ({estado.sigla})
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#101012]">Situação</label>
                {isCreateMode && (
                  <select
                    value={newPatrimonio.situacao_id}
                    onChange={(e) =>
                      setNewPatrimonio({
                        ...newPatrimonio,
                        situacao_id: e.target.value,
                      })
                    }
                    className="w-full border border-[#D1D1D3] p-2 rounded"
                  >
                    <option value="">Selecione uma situação</option>
                    {situacoes.map((situacao) => (
                      <option key={situacao.id} value={situacao.id}>
                        {situacao.descricao}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#101012]">
                  Descrição
                </label>
                {isEditMode || isCreateMode ? (
                  <textarea
                    value={
                      isCreateMode
                        ? newPatrimonio.observacoes
                        : selectedPatrimonio.observacoes
                    }
                    onChange={(e) =>
                      isCreateMode
                        ? setNewPatrimonio({
                            ...newPatrimonio,
                            observacoes: e.target.value,
                          })
                        : setSelectedPatrimonio({
                            ...selectedPatrimonio,
                            observacoes: e.target.value,
                          })
                    }
                    className="w-full border border-[#D1D1D3] p-2 rounded"
                  />
                ) : (
                  <p className="text-sm text-[#101012]">
                    {selectedPatrimonio.observacoes}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <ButtonStyles text="Fechar" onClick={handleModalClose} />
              {isEditMode && (
                <ButtonStyles text="Salvar" onClick={handleUpdate} />
              )}
              {isCreateMode && (
                <ButtonStyles
                  text={loading ? "Salvando..." : "Criar"}
                  onClick={handleCreate}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;