import React, { useState, useEffect } from "react";
import {
  fetchInvoices,
  downloadInvoice,
  deleteInvoice,
} from "../services/invoiceService";
import { FaSearch, FaDownload, FaTrashAlt } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

const InvoiceLibrary = () => {
  const [invoices, setInvoices] = useState([]);
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        setLoading(true);
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        setError("Failed to load invoices.");
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();
  }, []);

  const handleDownload = async id => {
    try {
      await downloadInvoice(id);
    } catch (error) {
      setError("Failed to download invoice.");
    }
  };

  const handleDelete = async id => {
    try {
      await deleteInvoice(id);
      setInvoices(invoices.filter(invoice => invoice.id !== id));
    } catch (error) {
      setError("Failed to delete invoice.");
    }
  };

  const filteredInvoices = clientId
    ? invoices.filter(invoice => invoice.clienteId.includes(clientId))
    : invoices;

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold mb-4 text-green-500">
        Biblioteca de Faturas
      </h1>
      <div className="mb-4 flex justify-center items-center">
        <div className="input-group gap-2">
          <input
            type="text"
            className="form-control"
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            placeholder="FILTRAR POR No DO CLIENTE"
          />
          <div className="input-group-append ml-2">
            <button
              className="btn btn-success text-white"
              onClick={() => setClientId(clientId)}
            >
              <FaSearch /> Pesquisar
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && filteredInvoices.length === 0 && (
        <p className="text-center">Nenhuma fatura encontrada.</p>
      )}
      <div>
        {filteredInvoices.length > 0 && (
          <table className="table table-striped table-hover">
            <thead className="bg-green-500 text-white">
              <tr>
                <th>No DO CLIENTE</th>
                <th>Data da Fatura</th>
                <th className="d-flex justify-content-end pr-4-important">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>{invoice.clienteId}</td>
                  <td>{invoice.mesReferencia}</td>
                  <td className="d-flex justify-content-end gap-1">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => handleDownload(invoice.id)}
                    >
                      <FaDownload /> Download
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(invoice.id)}
                    >
                      <FaTrashAlt /> Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InvoiceLibrary;
