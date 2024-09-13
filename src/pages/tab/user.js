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
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { TnosDataTable } from "../../components/TnosDataTable";
import ReadableDateTime from "../../components/ReadableDateTime";
import Preloader from "../../components/Preloader";
import moment from "moment";

export default () => {

    const [originalData, setOriginalData] = useState([]);
    const [selectedTABUser, setSelectedTABUser] = useState(0);
    const [selectedTABFilter, setSelectedTABFilter] = useState(0);
    const [getLoadingData, setLoadingData] = useState(false);

    const [memberData, setMemberData] = useState([]);
    const [messageEmptyData] = useState("Belum ada data");

    const [refapp, setRefapp] = useState("tabusersemua");

    const [getTABUser] = useState([
        {
            key: "tab_user_status_0",
            value: 0,
            defaultValue: "TAB User All",
            us: "TAB User All",
        },
        {
            key: "tab_user_status_1",
            value: 1,
            defaultValue: "TAB User Android",
            us: "TAB User Android",
        },
        {
            key: "tab_user_status_2",
            value: 2,
            defaultValue: "TAB User iOS",
            us: "TAB User iOS"
        },
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

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSearchByDate = (e) => {
        e.preventDefault();
        filterByDate();
    };

    const filterByDate = () => {
        const originalData = [...memberData];

        let filteredData = originalData.filter(item => {
            const itemDate = moment(parseInt(item.mmbr_date_insert)).format("YYYY-MM-DD");
            const start = moment(startDate).startOf('day');
            const end = moment(endDate).endOf('day');

            return moment(itemDate).isBetween(start, end, null, '[]');
        });

        setMemberData(filteredData);
    };

    const searchInputRef = useRef(null);

    const TableRow = ({ num, mmbr_date_insert, mmbr_code, mmbr_name, mmbr_phone, mmbr_email }) => (
        <tr>
            <td className="text-center">{num}</td>
            <td className="text-center">
                <Link to={`/member/profile/${mmbr_code}`}>
                    <Button variant="primary" size="sm" className="text-white">
                        <FontAwesomeIcon icon={faThList} />
                    </Button>
                </Link>
            </td>
            <td>{mmbr_name}</td>
            <td>
                <Link to={`/member/profile/${mmbr_code}`}>{mmbr_code}</Link>
            </td>
            <td className="text-center">{ReadableDateTime(mmbr_date_insert)}</td>
            <td>{mmbr_phone}</td>
            <td>{mmbr_email}</td>
        </tr>
    );

    useEffect(() => {
        if (selectedTABUser === 1) {
            setRefapp("tabuserandroid");
        } else if (selectedTABUser === 2) {
            setRefapp("tabuserios");
        } else {
            setRefapp("tabusersemua");
        }
    }, [selectedTABUser]);

    const handleSearch = () => {
        const searchTerm = searchInputRef.current.value.trim().toLowerCase();

        if (!searchTerm) {
            setMemberData([...originalData]);
            return;
        }

        const filteredData = originalData.filter(item => {
            return (
                (item.mmbr_name && item.mmbr_name.toLowerCase().includes(searchTerm)) ||
                (item.mmbr_code && item.mmbr_code.toLowerCase().includes(searchTerm)) ||
                (item.mmbr_phone && item.mmbr_phone.toLowerCase().includes(searchTerm))
            )
        });

        setMemberData(filteredData);
    };

    const fetchData = async () => {
        try {

            let allData = [];

            if (refapp === "tabusersemua") {
                const responseAndroid = await fetch(`${process.env.REACT_APP_PORTAL_API_URL}/member/list`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refapp: "tabuserandroid" })
                });

                setLoadingData(true)

                if (!responseAndroid.ok) {
                    throw new Error(`HTTP error! status: ${responseAndroid.status}`);
                }

                const dataAndroid = await responseAndroid.json();
                allData = allData.concat(dataAndroid.data || dataAndroid);

                const responseIOS = await fetch(`${process.env.REACT_APP_PORTAL_API_URL}/member/list`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refapp: "tabuserios" })
                });

                if (!responseIOS.ok) {
                    throw new Error(`HTTP error! status: ${responseIOS.status}`);
                }

                const dataIOS = await responseIOS.json();
                allData = allData.concat(dataIOS.data || dataIOS);

                let filteredData = allData;

                if (selectedTABFilter === 0) {
                    filteredData = filteredData.filter(item => item.mmbr_name != null && !item.mmbr_name.includes("User") && !item.mmbr_name.includes("test") && !item.mmbr_name.includes("Test"));
                } else if (selectedTABFilter === 1) {
                    filteredData = filteredData.filter(item => !item.mmbr_name || item.mmbr_name.includes("User") || item.mmbr_name.includes("test") || item.mmbr_name === "Test");
                }

                setOriginalData(filteredData);
                setMemberData(filteredData)

            } else {

                const refappValue = selectedTABUser === 1 ? "tabuserandroid" : "tabuserios";

                const response = await fetch(`${process.env.REACT_APP_PORTAL_API_URL}/member/list`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refapp: refappValue })
                });

                setLoadingData(true)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                allData = data.data || data;

                let filteredData = allData;

                if (selectedTABFilter === 0) {
                    filteredData = filteredData.filter(item => item.mmbr_name != null && !item.mmbr_name.includes("User") && !item.mmbr_name.includes("test") && !item.mmbr_name.includes("Test"));
                } else if (selectedTABFilter === 1) {
                    filteredData = filteredData.filter(item => !item.mmbr_name || item.mmbr_name.includes("User") || item.mmbr_name.includes("test") || item.mmbr_name === "Test");
                }

                setOriginalData(filteredData);
                setMemberData(filteredData)
            }

        } catch (error) {
            console.error("Fetching data failed:", error);
        }
    };

    useEffect(() => {

        fetchData();

    }, [refapp, selectedTABFilter]);

    return (
        <>
            <Preloader show={!getLoadingData ? true : false} />
            <Col xl={12} className="mt-2">
                <Card border="light">
                    <Card.Body>
                        <Form className="navbar-search mb-3">
                            <Row>
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
                                <Col md={2}>
                                    <Form.Group id="filter_test_tab">
                                        <Form.Label>TAB User</Form.Label>
                                        <Form.Select
                                            name="tab_user"
                                            value={selectedTABUser}
                                            onChange={(e) => setSelectedTABUser(parseInt(e.target.value))}
                                        >
                                            {getTABUser.map((item) => (
                                                <option key={item.key} value={item.value}>
                                                    {item.defaultValue}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
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
                            getExportData={memberData}
                            getMenu={`tab-user`}
                            getTanggalMulai={startDate}
                            getTanggalAkhir={endDate}
                            data={
                                <table className="table table-hover align-items-center">
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
                                        {memberData.length > 0 ? (
                                            memberData.map((m, index) => (
                                                <TableRow
                                                    key={`member-${m.mmbr_code}`}
                                                    num={index + 1}
                                                    mmbr_date_insert={m.mmbr_date_insert}
                                                    mmbr_code={m.mmbr_code}
                                                    mmbr_name={m.mmbr_name}
                                                    mmbr_phone={m.mmbr_phone}
                                                    mmbr_email={m.mmbr_email}
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
