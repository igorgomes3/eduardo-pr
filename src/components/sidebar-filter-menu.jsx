"use client";
import React from "react";

function SidebarFilterMenu({ onApplyFilters }) {
  const [estados, setEstados] = React.useState([]);
  const [categorias, setCategorias] = React.useState([]);
  const [situacoes, setSituacoes] = React.useState([]);
  const [showEstados, setShowEstados] = React.useState(false);
  const [showCategorias, setShowCategorias] = React.useState(false);
  const [showSituacoes, setShowSituacoes] = React.useState(false);
  const [selectedEstados, setSelectedEstados] = React.useState([]);
  const [selectedCategorias, setSelectedCategorias] = React.useState([]);
  const [selectedSituacoes, setSelectedSituacoes] = React.useState([]);

  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
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

        const estadosData = await estadosResponse.json();
        const categoriasData = await categoriasResponse.json();
        const situacoesData = await situacoesResponse.json();

        setEstados(estadosData);
        setCategorias(categoriasData);
        setSituacoes(situacoesData);
      } catch (error) {
        console.error("Erro ao buscar opções de filtro", error);
      }
    };

    fetchOptions();
  }, []);

  const handleFilterChange = (type, id) => {
    const setSelected = (prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      }
      return [...prevSelected, id];
    };

    if (type === "estado") setSelectedEstados(setSelected);
    if (type === "categoria") setSelectedCategorias(setSelected);
    if (type === "situacao") setSelectedSituacoes(setSelected);
  };

  const applyFilters = async () => {
    const filter = {};
    if (selectedEstados.length) filter.estado_id = selectedEstados;
    if (selectedCategorias.length) filter.categoria_id = selectedCategorias;
    if (selectedSituacoes.length) filter.situacao_id = selectedSituacoes;

    const patrimoniosResponse = await fetch("/api/supabase-data-fetcher", {
      method: "POST",
      body: JSON.stringify({
        tableName: "patrimonios",
        filter: Object.keys(filter).length ? filter : undefined,
      }),
    });

    const patrimoniosData = await patrimoniosResponse.json();
    onApplyFilters(patrimoniosData);
  };

  const clearFilters = () => {
    setSelectedEstados([]);
    setSelectedCategorias([]);
    setSelectedSituacoes([]);
    onApplyFilters([]); // Reset to show all records
  };

  return (
    <div className="w-[300px] p-4 border-r border-gray-300">
      <div>
        <h2 className="font-medium text-base mb-2">
          <button
            onClick={() => setShowEstados(!showEstados)}
            className="flex items-center"
          >
            Estado
            <i
              className={`ml-2 ${
                showEstados ? "fa fa-chevron-up" : "fa fa-chevron-down"
              }`}
            ></i>
          </button>
        </h2>
        {showEstados && (
          <ul className="space-y-1">
            {estados.map(({ id, nome }) => (
              <li key={id}>
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name={`estado-${nome}`}
                    className="mr-2"
                    checked={selectedEstados.includes(id)}
                    onChange={() => handleFilterChange("estado", id)}
                  />
                  {nome}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-6">
        <h2 className="font-medium text-base mb-2">
          <button
            onClick={() => setShowCategorias(!showCategorias)}
            className="flex items-center"
          >
            Categoria
            <i
              className={`ml-2 ${
                showCategorias ? "fa fa-chevron-up" : "fa fa-chevron-down"
              }`}
            ></i>
          </button>
        </h2>
        {showCategorias && (
          <ul className="space-y-1">
            {categorias.map(({ id, nome }) => (
              <li key={id}>
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name={`categoria-${nome}`}
                    className="mr-2"
                    checked={selectedCategorias.includes(id)}
                    onChange={() => handleFilterChange("categoria", id)}
                  />
                  {nome}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-6">
        <h2 className="font-medium text-base mb-2">
          <button
            onClick={() => setShowSituacoes(!showSituacoes)}
            className="flex items-center"
          >
            Situação do Patrimônio
            <i
              className={`ml-2 ${
                showSituacoes ? "fa fa-chevron-up" : "fa fa-chevron-down"
              }`}
            ></i>
          </button>
        </h2>
        {showSituacoes && (
          <ul className="space-y-1">
            {situacoes.map(({ id, descricao }) => (
              <li key={id}>
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name={`situacao-${descricao}`}
                    className="mr-2"
                    checked={selectedSituacoes.includes(id)}
                    onChange={() => handleFilterChange("situacao", id)}
                  />
                  {descricao}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={applyFilters}
          className="p-2 bg-blue-500 text-white rounded text-sm"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={clearFilters}
          className="p-2 bg-gray-500 text-white rounded text-sm"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}

function SidebarFilterMenuStory() {
  const handleApplyFilters = (filteredPatrimonios) => {
    console.log("Filtered Patrimonios:", filteredPatrimonios);
  };

  return (
    <div className="flex">
      <SidebarFilterMenu onApplyFilters={handleApplyFilters} />
    </div>
  );
}

export default SidebarFilterMenu;