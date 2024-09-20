import { Badge, Button, Card, Col, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "@themesberg/react-bootstrap";
import Preloader from "../../components/Preloader";
import React, { useEffect, useRef, useState } from "react";
import { TnosDataTable } from "../../components/TnosDataTable"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSearch, faThList } from "@fortawesome/free-solid-svg-icons";
import ConvertTimestamps from "../../components/ConvertTimestamps";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import moment from "moment";

export default () => {

    const [originalData, setOriginalData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [getTabPaymentData, setTabPaymentData] = useState([])
    const [getLoadingData, setLoadingData] = useState(false);
    const [getMessageEmptyData, setMessageEmptyData] = useState(
        "Belum ada transaksi pada hari ini"
    )

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
            defaultValue: "Menunggu Pembayaran",
            us: "PENDING",
            desc: "Menunggu Pembayaran",
            color: "warning",
        },
        {
            key: "payment_status_2",
            value: 2,
            defaultValue: "Sudah Dibayar (Paid / Settled)",
            us: "PAID/SETTLED",
            desc: "Sudah Dibayar (Paid / Settled)",
            color: "success",
        },
    ]);

    const today = moment().format("YYYY-MM-DD");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [getTotalAmountToday, setTotalAmountToday] = useState();

    const handleSearchByDate = (e) => {
        e.preventDefault();
        filterByDate();
    };

    const filterByDate = () => {
        const originalData = [...getTabPaymentData];

        let filteredData = originalData.filter(item => {
            const itemDate = moment(parseInt(item.start_date)).format("YYYY-MM-DD");
            const start = moment(startDate).startOf('day');
            const end = moment(endDate).endOf('day');

            return moment(itemDate).isBetween(start, end, null, '[]');
        });

        setTabPaymentData(filteredData);
    };

    const TableRow = ({ member_code, external_id, start_date, status_transaksi, name, amount, timestamp, masterPaket, num }) => {
        return (
            <tr>
                <td className="text-center">{num}</td>
                <td className="text-center">
                    <Link to={`/tab/transaksi/${external_id}/detail`}>
                        <Button variant="primary" size="sm" className="text-white">
                            <FontAwesomeIcon icon={faThList} />
                        </Button>
                    </Link>
                </td>
                <td className="text-center">{member_code || "-"}</td>
                <td className="text-center">{external_id || "-"}</td>
                <td className="text-center">
                    <Badge bg={status_transaksi === "PENDING" ? 'warning' : (status_transaksi === "PAID" || status_transaksi === "SETTLED") ? 'success' : 'danger'} className="badge-lg">
                        {status_transaksi === "PENDING" ? 'Menunggu Pembayaran' : status_transaksi === "PAID" ? "Sudah Dibayar (Paid)" : status_transaksi === "SETTLED" ? "Sudah Dibayar (Settled)" : 'Expired'}
                        &nbsp;
                        <OverlayTrigger
                            trigger={["hover", "focus"]}
                            overlay={<Tooltip>{status_transaksi === "PENDING" ? 'Menunggu Pembayaran' : status_transaksi === "PAID" ? "Sudah Dibayar (Paid)" : status_transaksi === "SETTLED" ? 'Sudah Dibayar (Settled)' : 'Expired'}</Tooltip>}
                        >
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                style={{ cursor: "pointer" }}
                            />
                        </OverlayTrigger>
                    </Badge>
                </td>
                <td className="text-center text-uppercase">{masterPaket?.nama_paket}</td>
                <td className="text-center">
                    <ConvertTimestamps timestamp={start_date} />
                </td>
                <td className="text-center">
                    <ConvertTimestamps timestamp={timestamp} />
                </td>
                <td className="">{member_code}</td>
                <td className="">{name || '-'}</td>
                <td className="text-center">-</td>
                <td className="text-center">
                    <CurrencyFormatter amount={amount} />
                </td>
            </tr>
        );
    };

    const handleSearch = () => {
        const searchTerm = searchInputRef.current.value.trim().toLowerCase();

        if (!searchTerm) {
            setTabPaymentData([...originalData]);
            return;
        }

        const filteredData = originalData.filter(item => {
            return (
                (item.name && item.name.toLowerCase().includes(searchTerm)) ||
                (item.external_id && item.external_id.toLowerCase().includes(searchTerm)) ||
                (item.member_code && item.member_code.toLowerCase().includes(searchTerm))
            );
        });

        setTabPaymentData(filteredData);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_TAB_URL}/payment/all`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            let extractedData = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];

            let filteredData = extractedData;

            if (selectedFilter === 1) {
                filteredData = filteredData.filter(item => item.name != null && !item.name.includes("User") && !item.name.includes("test") && !item.name.includes("Test"));
            } else if (selectedFilter === 2) {
                filteredData = filteredData.filter(item => !item.name || item.name.includes("User") || item.name.includes("test"));
            }

            if (selectedStatus === 0) {
                filteredData = filteredData.filter(item => item.status_transaksi === "PENDING" || item.status_transaksi === "PAID" || item.status_transaksi === "SETTLED");
            } else if (selectedStatus === 1) {
                filteredData = filteredData.filter(item => item.status_transaksi === "PENDING");
            } else if (selectedStatus === 2) {
                filteredData = filteredData.filter(item => item.status_transaksi === "PAID" || item.status_transaksi === "SETTLED");
            }

            if (startDate && endDate) {
                filteredData = filteredData.filter(item => {
                    const itemDate = moment(parseInt(item.start_date)).format("YYYY-MM-DD");
                    const start = moment(startDate).startOf('day');
                    const end = moment(endDate).endOf('day');
                    return moment(itemDate).isBetween(start, end, null, '[]');
                });
            }

            filteredData.sort((a, b) => b.timestamp - a.timestamp);
            const totalAmountToday = filteredData.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

            const formattedTotalAmount = totalAmountToday.toLocaleString("id-ID", {
                minimumFractionDigits: 0
            });

            setTotalAmountToday(formattedTotalAmount);
            
            setOriginalData(filteredData);
            setLoadingData(true);
            setTabPaymentData(filteredData);
        } catch (error) {
            console.error("Fetching data failed:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedFilter, selectedStatus, startDate, endDate]);

    return (
        <>
            <Preloader show={!getLoadingData ? true : false} />
            <Col xl={12} className="mt-2">
                <Card border="light">
                    <Card.Body>
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form onSubmit={handleSearchByDate}>
                                    <Form.Group id="topbarSearch">
                                        <Form.Label>Tanggal Transaksi</Form.Label>
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
                                        <Form.Label>Cari Transaksi</Form.Label>
                                        <InputGroup className="input-group-merge search-bar">
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Cari Transaksi"
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

                            <Col md={2}>
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
                        <TnosDataTable
                            title={
                                `Total Transaksi : IDR ${getTotalAmountToday} `
                            }
                            getExportData={getTabPaymentData}
                            getMenu={`tab-transaction`}
                            getTanggalMulai={startDate}
                            getTanggalAkhir={endDate}
                            data={
                                <>
                                    <thead className="thead-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                                        <tr>
                                            <th className="border-0 text-center">No.</th>
                                            <th className="border-0 text-center">Detail</th>
                                            <th className="border-0 text-center">Member Code</th>
                                            <th className="border-0 text-center">ID Transaksi</th>
                                            <th className="border-0 text-center">Status Transaksi</th>
                                            <th className="border-0 text-center">Nama Paket</th>
                                            <th className="border-0 text-center">Waktu Pesanan Dibuat</th>
                                            <th className="border-0 text-center">Waktu Transaksi</th>
                                            <th className="border-0 text-center">Membership</th>
                                            <th className="border-0">Nama</th>
                                            <th className="border-0 text-center">Metode Pembayaran</th>
                                            <th className="border-0 text-center">Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getTabPaymentData?.length > 0 ? (
                                            getTabPaymentData?.map((td, index) => (
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
                        ></TnosDataTable>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}