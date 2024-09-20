import { faSearch, faThList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, InputGroup, Row, Spinner } from "@themesberg/react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { TnosDataTable } from "../../components/TnosDataTable";
import { Link } from "react-router-dom";
import ReadableDateTime from "../../components/ReadableDateTime";
import moment from "moment";

export default () => {

    const [originalData, setOriginalData] = useState([]);
    const [getMemberData, setMemberData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [getMessageEmptyData] = useState("Belum ada data");

    const searchInputRef = useRef(null);

    const [getFilterTest] = useState([
        {
            key: "key_status_0",
            value: 1,
            defaultValue: "Real",
        },
        {
            key: "key_status_1",
            value: 2,
            defaultValue: "Testing"
        }
    ]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSearchByDate = (e) => {
        e.preventDefault();
        filterByDate();
    };

    const filterByDate = () => {
        const originalData = [...getMemberData];

        let filteredData = originalData.filter(item => {
            const itemDate = moment(item.mmbr_date_insert).format("YYYY-MM-DD");
            const start = moment(startDate).startOf('day');
            const end = moment(endDate).endOf('day');

            return moment(itemDate).isBetween(start, end, null, '[]');
        });

        setMemberData(filteredData);
    };

    const handleSearch = () => {
        const searchTerm = searchInputRef.current.value.trim().toLowerCase();

        if (!searchTerm) {
            setMemberData([...originalData]);
            return;
        }

        const filteredData = originalData.filter(item => {
            return (
                (item.mmbr_name && item.mmbr_name.toLowerCase().includes(searchTerm)) ||
                (item.mmbr_code && item.mmbr_code.toLowerCase().includes(searchTerm))
            );
        });

        setMemberData(filteredData);
    };

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_PORTAL_API_URL}/member/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refapp: "" })
        })
            .then((res) => res.json())
            .then((data) => {

                let extractedData = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];

                let filteredData = extractedData;

                if (selectedFilter === 1) {
                    filteredData = filteredData.filter(item => item.mmbr_name != null && !item.mmbr_name.includes("User") && !item.mmbr_name.includes("test") && !item.mmbr_name.includes("Test") && !item.mmbr_name.includes("Testing") && !item.mmbr_name.includes("G~TE:?~ET"));
                } else if (selectedFilter === 2) {
                    filteredData = filteredData.filter(item => !item.mmbr_name || item.mmbr_name.includes("User") || item.mmbr_name.includes("test") || item.mmbr_name.includes("Testing") || item.mmbr_name.includes("G~TE:?~ET"));
                }

                filteredData = filteredData.filter(item => item.mmbr_suspend === "no")

                if (startDate && endDate) {
                    filteredData = filteredData.filter(item => {
                        const itemDate = moment(item.mmbr_date_insert).format("YYYY-MM-DD");
                        const start = moment(startDate).startOf('day');
                        const end = moment(endDate).endOf('day');
                        return moment(itemDate).isBetween(start, end, null, '[]');
                    });
                }
    
                filteredData.sort((a, b) => b.mmbr_date_insert - a.mmbr_date_insert);

                setOriginalData(filteredData);
                setMemberData(filteredData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }

    useEffect(() => {
        
        fetchData()

    }, [selectedFilter, startDate, endDate]);

    const TableRow = ({ num, mmbr_code, mmbr_name, mmbr_date_insert, mmbr_phone, mmbr_email }) => {
        return (
            <tr>
                <td className="text-center">{num}.</td>
                <td className="text-center">
                    <Link to={`/member/profile/${mmbr_code}`}>
                        <Button variant="primary" size="sm" className="text-white">
                            <FontAwesomeIcon icon={faThList} />
                        </Button>
                    </Link>
                </td>
                <td>{mmbr_name}</td>
                <td className="text-center">{mmbr_code}</td>
                <td className="text-center">{ReadableDateTime(mmbr_date_insert)}</td>
                <td className="text-center">{mmbr_phone}</td>
                <td>{mmbr_email}</td>
            </tr>
        )
    }

    return (
        <>
            <Col xl={12} className="mt-2">
                <Card border="light">
                    <Card.Body>
                        <Form className="navbar-search mb-3">
                            <Row>
                                <Col md={4}>
                                    <Form onSubmit={handleSearchByDate}>
                                        <Form.Group id="topbarSearch">
                                            <Form.Label>Tanggal Mendaftar</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    type="date"
                                                    name="start_date_time"
                                                    step="1"
                                                    required
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                />
                                                <InputGroup.Text>&#x2192;</InputGroup.Text>
                                                <Form.Control
                                                    type="date"
                                                    name="end_date_time"
                                                    step="1"
                                                    required
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form>
                                </Col>
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
                                                <Button variant="primary" onClick={handleSearch} >
                                                    Search
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col>
                                    <Form.Group id="filter_test">
                                        <Form.Label>Filter</Form.Label>
                                        <Form.Select
                                            name="transaction_status"
                                            value={selectedFilter}
                                            onChange={(e) => setSelectedFilter(parseInt(e.target.value))}
                                            required
                                        >
                                            {getFilterTest?.map((item) => (
                                                <option key={item.key} value={item.value}>
                                                    {item.defaultValue}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        {loading ? (
                            <div className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <TnosDataTable
                                getExportData={getMemberData}
                                getMenu={`member-active`}
                                getTanggalMulai={startDate}
                                getTanggalAkhir={endDate}
                                data={
                                    <>
                                        <thead className="thead-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                                            <tr>
                                                <th className="border-0 text-center">No.</th>
                                                <th className="border-0 text-center">Detail</th>
                                                <th className="border-0">Nama</th>
                                                <th className="border-0 text-center">Kode Member</th>
                                                <th className="border-0 text-center">Tanggal Mendaftar</th>
                                                <th className="border-0 text-center">No. Hp</th>
                                                <th className="border-0">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getMemberData?.length > 0 ? (
                                                getMemberData?.map((td, index) => (
                                                    <TableRow
                                                        key={`order-success-${td.id}`}
                                                        {...td}
                                                        num={index + 1}
                                                    />
                                                ))
                                            ) : (
                                                <tr className="text-center">
                                                    <td colSpan={8}>{getMessageEmptyData}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </>
                                }
                            />
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};