import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faThList } from "@fortawesome/free-solid-svg-icons";
import {
    Col,
    Card,
    Button,
    Form,
    InputGroup,
    Row,
    Badge,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { TnosDataTable } from "../../components/TnosDataTable";
import _ from "lodash"

export default () => {

    const [originalData, setOriginalData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [selectedTABFilter, setSelectedTABFilter] = useState(0);

    const [getInsidenData, setInsidenData] = useState([]);
    const [messageEmptyData] = useState("Belum ada data");

    const [refapp, setRefapp] = useState("tabusersemua");

    const searchInputRef = useRef(null);

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

    const TableRow = ({ num, panicid, name, phone_number, responder_name, phone_number_responder, status }) => (
        <tr>
            <td className="text-center">{num}</td>
            <td className="text-center">
                <Link to={`/tab/insiden/detail/${panicid}`}>
                    <Button variant="primary" size="sm" className="text-white">
                        <FontAwesomeIcon icon={faThList} />
                    </Button>
                </Link>
            </td>
            <td>{name ? name : "-"}</td>
            <td className="text-center">{phone_number ? phone_number : "-"}</td>
            <td className="text-center">
                {status === "D" ? (
                    <Badge bg="success" className="badge-lg">
                        Done
                    </Badge>
                ) : status === "P" ? (
                    <Badge bg="warning" className="badge-lg">
                        Sedang Diproses
                    </Badge>
                ) : (
                    <Badge bg="danger" className="badge-lg">
                        Menunggu
                    </Badge>
                )}
            </td>
            <td>{responder_name ? responder_name : "-"}</td>
            <td className="text-center">{phone_number_responder ? phone_number_responder : '-'}</td>
        </tr>
    );

    const handleSearch = () => {
        const searchTerm = searchInputRef.current.value.trim().toLowerCase();
    
        if (!searchTerm) {
            setInsidenData([...originalData]);
            return;
        }
    
        const filteredData = originalData.filter(item => {
            return item.name && item.name.toLowerCase().includes(searchTerm);
        });
    
        setInsidenData(filteredData);
    };

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_TAB_URL}/panic_report/all`, {
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
                filteredData = filteredData.filter(item => item.name != null && !item.name.includes("User") && !item.name.includes("test") && !item.name.includes("Test") && !item.name.includes("you@gmail.com") && !item.name.includes("fun@gmail.com"));
            } else if (selectedTABFilter === 1) {
                filteredData = filteredData.filter(item => !item.name || item.name.includes("User") || item.name.includes("test") || item.name === "Test" || item.name === "you@gmail.com" || item.name === "fun@gmail.com");
            }

            if (selectedStatus === 0) {
                filteredData = filteredData.filter(item => item.status === "P" || item.status === "D" || item.status === "W");
            } else if (selectedStatus === 1) {
                filteredData = filteredData.filter(item => item.status === "D");
            } else if (selectedStatus === 2) {
                filteredData = filteredData.filter(item => item.status === "P");
            } else if (selectedStatus === 3) {
                filteredData = filteredData.filter(item => item.status === "W");
            }
            
            setOriginalData(filteredData)
            setInsidenData(filteredData)
        };

        fetchData();

    }, [refapp, selectedTABFilter, selectedStatus]);

    return (
        
        <Col xl={12} className="mt-2">
            <Card border="light">
                <Card.Body>
                    <Form className="navbar-search mb-3">
                        <Row>
                            <Col md={5}>
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
                        getExportData={getInsidenData}
                        getMenu={`tab-insiden`}
                        data={
                            <table className="table table-hover align-items-center">
                                <thead className="thead-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                                    <tr>
                                        <th className="border-0 text-center">No.</th>
                                        <th className="border-0 text-center">Detail</th>
                                        <th className="border-0">Nama</th>
                                        <th className="border-0 text-center">No. Handphone</th>
                                        <th className="border-0 text-center">Status</th>
                                        <th className="border-0">Responder</th>
                                        <th className="border-0 text-center">Nomor HP Responder</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getInsidenData.length > 0 ? (
                                        getInsidenData.map((m, index) => (
                                            <TableRow
                                                key={`member-${m.id_panic}`}
                                                num={index + 1}
                                                panicid={m.panicid}
                                                name={m.name}
                                                phone_number={m.phone_number}
                                                status={m.status}
                                                responder_name={m.responder_name}
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
    );
};
