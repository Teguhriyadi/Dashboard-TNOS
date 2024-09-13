import { Button, Card, Col } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import { TnosDataTable } from "../../components/TnosDataTable"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList } from "@fortawesome/free-solid-svg-icons";

export default () => {

    const [selectedFilter, setSelectedFilter] = useState(1);
    const [getPaketData, setPaketData] = useState([])
    const [getMessageEmptyData, setMessageEmptyData] = useState(
        "Belum ada transaksi pada hari ini"
    )

    const TableRow = (props) => {
        const {
            nama_paket,
            amount,
            limit_user,
            limit_contact,
            durationDate,
            id_master_paket_organization
        } = props;

        return (
            <tr>
                <td className="text-center">{nama_paket}</td>
                <td className="text-center">{limit_user}</td>
                <td className="text-center">{limit_contact}</td>
                <td className="text-center">{durationDate} Hari</td>
                <td className="text-center">{"Rp. " + amount.toLocaleString()}</td>
                <td className="text-center">
                    <Link to={`/tab-b2b/user/${id_master_paket_organization}`}>
                        <Button variant="primary" size="sm" className="text-white">
                            <FontAwesomeIcon icon={faThList} />
                        </Button>
                    </Link>
                </td>
            </tr>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_TAB_ORGANISASI}/paket/21212/current_paket`);
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

                console.log("data");
                console.log(extractedData);
                
                setPaketData(extractedData);
            } catch (error) {
                console.error("Fetching data failed:", error);
            }
        };

        fetchData();
    }, [selectedFilter]);

    return (
        <>
            <Col xl={12} className="mt-2">
                <Card border="light">
                    <Card.Body>
                        <TnosDataTable
                            getExportData={getPaketData}
                            getMenu={`tab-b2b-master-paket`}
                            data={
                                <>
                                    <thead className="thead-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                                        <tr>
                                            <th className="border-0 text-center">Nama Paket</th>
                                            <th className="border-0 text-center">Limit User</th>
                                            <th className="border-0 text-center">Limit Kontak</th>
                                            <th className="border-0 text-center">Durasi Waktu</th>
                                            <th className="border-0 text-center">Harga</th>
                                            <th className="border-0 text-center">Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getPaketData?.length > 0 ? (
                                            getPaketData?.map((td, index) => (
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