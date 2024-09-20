import React, { useEffect, useState } from "react";
import { Card, Col, Button, Badge, Breadcrumb } from "@themesberg/react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { TnosDataTable } from "../../components/TnosDataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHome, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyModal from "../../components/MyModal";

const SecurityProvider = () => {
    const [getSecurityProvider, setSecurityProvider] = useState([]);
    const [getMessageEmptyData, setMessageEmptyData] = useState(
        "Belum ada data pada hari ini"
    );
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isTable, setTable] = useState(null);

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
                await axios.delete(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/provider/${id}`);
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

    const handleShow = (id = null, table = null) => {
        setSelectedId(id);
        setTable(table)
        setIsEditing(!!id);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedId(null);
        setTable(null);
        setIsEditing(false);
    };

    const TableRow = ({ num, name_sc, name_pt, slug, image, description, status, id }) => (
        <tr>
            <td className="text-center">{num}.</td>
            <td>{name_sc}</td>
            <td>{name_pt}</td>
            <td className="text-center">{slug}</td>
            <td>
        {description.length > 100 ? `${description.substring(0, 50)}...` : description}
    </td>
            <td className="text-center">
                {status === "1" ? (
                    <Badge bg="success" className="badge-lg">
                        Aktif
                    </Badge>
                ) : (
                    <Badge bg="danger" className="badge-lg">
                        Tidak Aktif
                    </Badge>
                )}</td>
            <td className="text-center">
                <img src={image} alt={name_sc} style={{ width: '50px', height: '50px' }} />
            </td>
            <td className="text-center">
                <Button variant="warning" size="sm" onClick={() => handleShow(`${id}`, 'provider')} className="text-white" style={{ marginRight: '5px' }} >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Link to={`/pwa-b2b/security-provider/` + id + "/layanan"} target="_blank" rel="noopener noreferrer" style={{ marginRight: '5px' }}>
                    <Button variant="primary" size="sm" className="text-white">
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </td>
        </tr>
    );

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/provider`);
            setSecurityProvider(response.data.data.provider);
        } catch (error) {
            console.error("There was an error fetching the data!", error);
            setMessageEmptyData("Error fetching data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                <div className="d-block mb-4 mb-xl-0">
                    <Breadcrumb
                        className="d-none d-md-inline-block"
                        listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
                    >
                        <Breadcrumb.Item href="/">
                            <FontAwesomeIcon icon={faHome} />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Security Provider</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <Col xl={12} className="mt-2">
                <Card border="light">
                    <Card.Body>
                        <TnosDataTable
                            getExportData={getSecurityProvider}
                            getMenu={`export-data-security-provider`}
                            data={
                                <>
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="border-0 text-center">No.</th>
                                            <th className="border-0">Nama Security Provider</th>
                                            <th className="border-0">Nama PT</th>
                                            <th className="border-0 text-center">Slug</th>
                                            <th className="border-0 text-center">Deskripsi</th>
                                            <th className="border-0 text-center">Status</th>
                                            <th className="border-0 text-center">Logo</th>
                                            <th className="border-0 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getSecurityProvider.length > 0 ? (
                                            getSecurityProvider.map((td, index) => (
                                                <TableRow
                                                    key={`order-success-${td.id}`}
                                                    num={index + 1}
                                                    {...td}
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
                    </Card.Body>
                </Card>
            </Col>

            <MyModal show={showModal} handleClose={handleClose} isTable={isTable} id={selectedId} isEditing={isEditing} />
        </>
    );


};

export default SecurityProvider;
