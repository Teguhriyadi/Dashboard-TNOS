import { Button, Card, Col, Form, Row } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import { TnosDataTable } from "../../components/TnosDataTable"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import Preloader from "../../components/Preloader";

export default () => {

    const [selectedFilter, setSelectedFilter] = useState(1);
    const [selectedStatus] = useState(0);
    const [getBanner, setBanner] = useState([])
    const [getMessageEmptyData] = useState(
        "Belum ada transaksi pada hari ini"
    )

    const [getLoadingData, setLoadingData] = useState(false);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Anda yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_TAB_MODULE}/banner/${id}/delete`);
                fetchData();
                Swal.fire(
                    'Berhasil!',
                    'Data telah berhasil dihapus.',
                    'success'
                );
            } catch (error) {
                console.error('Error deleting data:', error);
                Swal.fire(
                    'Gagal!',
                    'Terjadi kesalahan saat menghapus data.',
                    'error'
                );
            }
        }
    };

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

    const TableRow = (props) => {
        const {
            id_banner,
            banner_name,
            uri,
            url_link,
            num
        } = props;

        return (
            <tr>
                <td className="text-center">{num}</td>
                <td className="text-center">{banner_name ? banner_name : "-"}</td>
                <td className="text-center">
                    <img src={uri} />
                </td>
                <td className="text-center">{url_link == null ? '-' : url_link}</td>
                <td className="text-center">
                    <Link to={`/tab/transaksi/` + id_banner + "/detail"}>
                        <Button variant="primary" size="sm" className="text-white">
                            <FontAwesomeIcon icon={faThList} />
                        </Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(id_banner)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
            </tr>
        )
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_TAB_MODULE}/banner/get`);
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

            setLoadingData(true)

            setBanner(filteredData);
        } catch (error) {
            console.error("Fetching data failed:", error);
        }
    };

    useEffect(() => {
    }, [selectedFilter, selectedStatus]);

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <Preloader show={!getLoadingData ? true : false} />
            <Col xl={12} className="mt-2">
                <Card border="light">
                    <Card.Body>
                        <Form method="POST">
                            <Row className="mb-3">
                                <Col md={2}>
                                    <Form.Group id="filter_test">
                                        <Form.Label>Filter Test</Form.Label>
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
                        <TnosDataTable
                            data={
                                <>
                                    <thead className="thead-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                                        <tr>
                                            <th className="border-0 text-center">No.</th>
                                            <th className="border-0 text-center">Nama Banner</th>
                                            <th className="border-0 text-center">URI</th>
                                            <th className="border-0 text-center">URL Link</th>
                                            <th className="border-0 text-center">Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getBanner?.length > 0 ? (
                                            getBanner?.map((td, index) => (
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