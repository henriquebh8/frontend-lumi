import React, { useState, useEffect } from "react";
import { fetchInvoices, uploadInvoice } from "../services/invoiceService";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  Card,
  Button,
  Col,
  Row,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [clientId, setClientId] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
        setFilteredInvoices(data); // Exibir todas as faturas inicialmente
      } catch (error) {
        setError("Failed to load invoices.");
      }
    };
    loadInvoices();
  }, []);

  useEffect(() => {
    if (clientId === "") {
      setFilteredInvoices(invoices); // Mostrar todas as faturas se clientId estiver vazio
    } else {
      setFilteredInvoices(
        invoices.filter(invoice => invoice.clienteId === clientId)
      );
    }
  }, [clientId, invoices]);

  const energyData = {
    labels: filteredInvoices.map(invoice => invoice.mesReferencia),
    datasets: [
      {
        label: "Consumo de Energia Elétrica (kWh)",
        data: filteredInvoices.map(invoice => invoice.energiaKWh),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Energia Compensada (kWh)",
        data: filteredInvoices.map(invoice => invoice.compensadaKWh),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  const monetaryData = {
    labels: filteredInvoices.map(invoice => invoice.mesReferencia),
    datasets: [
      {
        label: "Valor Total sem GD (R$)",
        data: filteredInvoices.map(invoice => {
          const totalValor = invoice.energiaValor + invoice.contribIlum;
          return invoice.sceeValor > 0
            ? totalValor + invoice.sceeValor
            : totalValor;
        }),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "Economia GD (R$)",
        data: filteredInvoices.map(invoice => invoice.compensadaValor),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Por favor, selecione um arquivo.");
      return;
    }

    try {
      await uploadInvoice(file);
      setError("");
      alert("Arquivo enviado com sucesso!");
    } catch (err) {
      setError("Falha ao enviar o arquivo.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-success mb-4">Dashboard</h1>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Form>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                placeholder="Digite o No DO CLIENTE"
              />
              <Button
                variant="success"
                onClick={() => setClientId("")}
                style={{ marginLeft: "8px" }}
              >
                Limpar
              </Button>
            </InputGroup>
          </Form>
          {error && <p className="text-danger">{error}</p>}
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload de Fatura</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="success" onClick={handleUpload}>
              Enviar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Row>
        {clientId && (
          <Col xs="12">
            <Card className="shadow-sm mb-4">
              <Card.Header>
                <h2 className="text-success">ID do Cliente: {clientId}</h2>
              </Card.Header>
            </Card>
          </Col>
        )}
        <Col xs="12">
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h2 className="text-success">
                Consumo de Energia Elétrica (kWh)
              </h2>
            </Card.Header>
            <Card.Body>
              <Bar data={energyData} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs="12">
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h2 className="text-success">Valores Monetários (R$)</h2>
            </Card.Header>
            <Card.Body>
              <Bar data={monetaryData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
