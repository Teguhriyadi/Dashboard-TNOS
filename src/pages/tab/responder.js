import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faThList } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Row
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { TnosDataTable } from "../../components/TnosDataTable";
import Preloader from "../../components/Preloader";

export default () => {

  const [originalData, setOriginalData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedTABFilter, setSelectedTABFilter] = useState(0);
  const [getLoadingData, setLoadingData] = useState(false);

  const [getResponderData, setResponderData] = useState([]);
  const [messageEmptyData] = useState("Belum ada data");

  const [refapp] = useState("tabusersemua");

  const [getPaymentStatusArr] = useState([
    {
      key: "payment_status_0",
      value: 0,
      defaultValue: "Semua Status",
      us: "All Status",
      desc: "Menampilkan Semua Status Pembayaran",
      color: "",
    },
    {
      key: "payment_status_1",
      value: 1,
      defaultValue: "Selesai",
      us: "Selesai",
      desc: "Selesai",
      color: "success",
    },
    {
      key: "payment_status_2",
      value: 2,
      defaultValue: "Sedang Diproses",
      us: "Sedang Diproses",
      desc: "Sedang Diproses",
      color: "success",
    },
    {
      key: "payment_status_3",
      value: 3,
      defaultValue: "Menunggu",
      us: "Menunggu",
      desc: "Sedang Menunggu",
      color: "success",
    }
  ]);

  const [getTABFilter] = useState([
    {
      key: "tab_filter_status_0",
      value: 0,
      defaultValue: "Real",
    },
    {
      key: "tab_filter_status_1",
      value: 1,
      defaultValue: "Testing"
    },
  ]);

  const searchInputRef = useRef(null);

  const TableRow = ({ num, id_panic, name, phone_number, responder_name, status }) => (
    <tr>
      <td className="text-center">{num}</td>
      <td>{name ? name : "-"}</td>
      <td className="text-center">{phone_number ? phone_number : "-"}</td>
      <td>{responder_name ? responder_name : "-"}</td>
      <td className="text-centr">-</td>
      <td className="text-center">
        <Link to={`/member/profile/${id_panic}`}>
          <Button variant="primary" size="sm" className="text-white">
            <FontAwesomeIcon icon={faThList} />
          </Button>
        </Link>
      </td>
    </tr>
  );

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_TAB_URL}/responder/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    let extractedData = [];
    if (Array.isArray(data.data)) {
      extractedData = data.data;
    } else if (Array.isArray(data)) {
      extractedData = data;
    }

    let filteredData = extractedData;

    if (selectedTABFilter === 0) {
      filteredData = filteredData.filter(item => item.name != null && !item.name.includes("User") && !item.name.includes("test") && !item.name.includes("Test") && !item.name.includes("223283828238238283") && !item.name.includes("tes") && !item.name.includes("Vvfffhjjjj") && !item.name.includes("Hdjdhdjdjjd"));
    } else if (selectedTABFilter === 1) {
      filteredData = filteredData.filter(item => item.name == null || item.name.includes("User") || item.name.includes("test") || item.name.includes("Test") || item.name.includes("223283828238238283") || item.name.includes("tes") || item.name.includes("Vvfffhjjjj") || item.name.includes("Hdjdhdjdjjd"));
    }

    setOriginalData(filteredData);
    setLoadingData(true)
    setResponderData(filteredData)
  };

  useEffect(() => {
    fetchData();
  }, [refapp, selectedTABFilter, selectedStatus]);

  const handleSearch = () => {
    const searchTerm = searchInputRef.current.value.trim().toLowerCase();

    if (!searchTerm) {
      setResponderData([...originalData]);
      return;
    }

    const filteredData = originalData.filter(item => {
      return (
        (item.name && item.name.toLowerCase().includes(searchTerm)) ||
        (item.phone_number && item.phone_number.toLowerCase().includes(searchTerm))
      );
    });

    setResponderData(filteredData);
  };

  return (
    <>
      <Preloader show={!getLoadingData ? true : false} />
      <Col xl={12} className="mt-2">
        <Card border="light">
          <Card.Body>
            <Form className="navbar-search mb-3">
              <Row>
                <Col md={5}>
                  <Form>
                    <Form.Group id="topbarSearch">
                      <Form.Label>Cari Pengguna</Form.Label>
                      <InputGroup className="input-group-merge search-bar">
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faSearch} />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Cari Pengguna"
                          id="all_search"
                          ref={searchInputRef}
                        />
                        <Button variant="primary" onClick={handleSearch}>
                          Search
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={3}>
                  <Form.Group id="transaction_status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="transaction_status"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(parseInt(e.target.value))}
                    >
                      {getPaymentStatusArr?.map((item) => (
                        <option key={item.key} value={item.value}>
                          {item.defaultValue}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group id="filter_test_testing">
                    <Form.Label>Filter</Form.Label>
                    <Form.Select
                      name="transaction_status"
                      value={selectedTABFilter}
                      onChange={(e) => setSelectedTABFilter(parseInt(e.target.value))}
                    >
                      {getTABFilter.map((item) => (
                        <option key={item.key} value={item.value}>
                          {item.defaultValue}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <TnosDataTable
              getExportData={getResponderData}
              getMenu={`tab-responder`}
              data={
                <table className="table table-hover align-items-center">
                  <thead className="thead-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <tr>
                      <th className="border-0 text-center">No.</th>
                      <th className="border-0">Nama</th>
                      <th className="border-0 text-center">No. Handphone</th>
                      <th className="border-0 text-center">Email</th>
                      <th className="border-0 text-center">Kontak Pengguna</th>
                      <th className="border-0 text-center">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getResponderData.length > 0 ? (
                      getResponderData.map((m, index) => (
                        <TableRow
                          key={`member-${m.id_panic}`}
                          num={index + 1}
                          name={m.name}
                          phone_number={m.phone_number}
                        />
                      ))
                    ) : (
                      <tr className="text-center">
                        <td colSpan={7}>{messageEmptyData}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              }
            />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
