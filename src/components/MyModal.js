import { faSave, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Modal, Row } from "@themesberg/react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const MyModal = ({ show, handleClose, id, isEditing, isTable }) => {
    const location = useLocation();
    const [formData, setFormData] = useState({});
    const [hargaIncludeTnos, setHargaIncludeTnos] = useState(0);
    const [tnosFee, setTnosFee] = useState(0);
    const [platformFee, setPlatformFee] = useState(0);
    const [pricePPN, setPricePPN] = useState(0);
    const [pricePWA, setPricePWA] = useState(0);
    const [hargaIncludeTNOSRange, setHargaIncludeTNOSRange] = useState(0);
    const [includeTnosFee, setIncludeTnosFee] = useState(0);
    const [selectedSetting, setSelectedSetting] = useState(0);
    const [getReference, setReference] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [getSettingHargaDasar] = useState([
        {
            key: "status_0",
            value: 0,
            defaultValue: "Pilih",
        },
        {
            key: "status_1",
            value: 1,
            defaultValue: "Include TNOS Fee",
        },
        {
            key: "status_2",
            value: 2,
            defaultValue: "Harga Dasar Vendor",
        },
    ]);

    const [getSatuanUnit, setSatuanUnit] = useState([])

    const handleChangeReference = (e) => {

        const { name, value } = e.target
        const selectedOption = getReference.find(item => item.id === value)

        if (selectedOption && !selectedOptions.some(option => option.id === selectedOption.id)) {
            setSelectedOptions([...selectedOptions, selectedOption]);
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: ""
        }))
    }

    const handleDeleteArr = (id) => {
        setSelectedOptions(selectedOptions.filter(option => option.id !== id))
    }

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value,
        }));

        const includePpn = parseFloat(name === "include_ppn" ? value : formData.include_ppn || 0);
        const platformFee = parseFloat(name === "platform_fee" ? value : formData.platform_fee || 0);

        if (selectedSetting === 1) {
            const includeTnosFeeRange = parseFloat(name === "include_tnos_range" ? value : formData.include_tnos_range || 0)
            const percentanceTNOSFee = parseFloat(name === "percentance" ? value : formData.percentance || 0)
            const calculateTnosFeeRange = (includeTnosFeeRange * percentanceTNOSFee / 100);
            setHargaIncludeTNOSRange(calculateTnosFeeRange);
            setIncludeTnosFee(includeTnosFeeRange)

            if (includePpn === 0) {
                const calculatePPN = 0;
                setPricePPN(0)
            } else {
                const calculatePPN = (includeTnosFeeRange * includePpn / 100)
                setPricePPN(calculatePPN)
            }

            setTnosFee(includeTnosFeeRange - calculateTnosFeeRange)

            const calculatedPlatform = (includeTnosFeeRange * platformFee / 100);
            setPlatformFee(calculatedPlatform)

            const calculatePWA = pricePPN + calculatedPlatform
            setPricePWA(calculatePWA)

        } else if (selectedSetting === 2) {
            const hargaDasar = parseFloat(name === "harga_dasar" ? value : formData.harga_dasar || 0);
            const includeTnosFee = parseFloat(name === "include_tnos_fee" ? value : formData.include_tnos_fee || 0);

            const calculatedHarga = hargaDasar + (hargaDasar * includeTnosFee / 100);
            setHargaIncludeTnos(calculatedHarga);

            if (includePpn === 0) {
                const calculatedTnosFee = (calculatedHarga - hargaDasar);
                const calculcatePPN = 0
                setTnosFee(calculatedTnosFee);
                setPricePPN(calculcatePPN);
                const calculatedPlatform = (calculatedHarga * platformFee / 100);
                setPlatformFee(calculatedPlatform)

                const calculatePricePWa = calculatedHarga + calculatedPlatform
                setPricePWA(calculatePricePWa)
            } else {
                const calculatedTnosFee = (calculatedHarga - hargaDasar);
                const calculcatePPN = (calculatedHarga * includePpn / 100);
                setTnosFee(calculatedTnosFee);
                setPricePPN(calculcatePPN);

                const calculatedPlatform = (calculatedHarga * platformFee / 100);
                setPlatformFee(calculatedPlatform)

                const calculatePricePWa = calculcatePPN + calculatedPlatform
                setPricePWA(calculatePricePWa)
            }
        }
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (location.pathname.includes("/pwa-b2b/section")) {
            if (location.pathname.endsWith("product-sub-section")) {

                const section_id = location.pathname.split("/")[3];

                const updatedFormData = {
                    ...formData,
                    section_id: section_id,
                    harga: pricePWA,
                    harga_dasar: hargaIncludeTNOSRange,
                    include_tnos_fee: includeTnosFee,
                    include_ppn: pricePPN,
                    tnos_fee: tnosFee,
                    platform_fee: platformFee,
                    status: 1,
                }

                const submitData = new FormData();

                for (const key in updatedFormData) {
                    submitData.append(key, updatedFormData[key]);
                }

                const dataObj = {};
                submitData.forEach((value, key) => {
                    dataObj[key] = value;
                });

                let apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/product-sub-section`;

                try {
                    if (isEditing) {
                        await axios
                            .put(`${apiUrl}/${id}`, dataObj)
                            .then((response) => {
                                if (response.data.status === true) {
                                    handleClose();
                                    toast.success("Data Berhasil di Simpan");
                                } else if (response.data.status === false) {
                                    handleClose();
                                    toast.error(response.data.message)
                                }
                            }).catch((error) => {
                                toast.error(error);
                            });
                    } else {
                        await axios.post(apiUrl, dataObj, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }).then((response) => {
                            console.log(response);

                            if (response.data.status === true) {
                                handleClose();
                                toast.success("Data Berhasil di Tambahkan");
                            } else if (response.data.status === false) {
                                handleClose();
                                toast.error(response.data.message);
                            }
                        }).catch((error) => {
                            toast.error(error);
                        });
                    }
                } catch (error) {
                    toast.error("Terjadi kesalahan saat mengirim data : " + error);
                }
            } else {
                const submitData = new FormData();

                for (const key in formData) {
                    submitData.append(key, formData[key]);
                }

                let apiUrl = '';

                const dataObj = {};
                submitData.forEach((value, key) => {
                    dataObj[key] = value;
                });

                const id = location.pathname.split("/")[3];
                apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/subsection`;
                dataObj["section_id"] = id;
                submitData.append("section_id", id);

                try {
                    if (isEditing) {
                        await axios
                            .put(`${apiUrl}/${id}`, dataObj)
                            .then((response) => {
                                if (response.data.status === true) {
                                    handleClose();
                                    toast.success("Data Berhasil di Simpan");
                                } else if (response.data.status === false) {
                                    handleClose();
                                    toast.error(response.data.message)
                                }
                            }).catch((error) => {
                                toast.error(error);
                            });
                    } else {
                        await axios.post(apiUrl, submitData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }).then((response) => {
                            console.log(response);

                            if (response.data.status === true) {
                                handleClose();
                                toast.success("Data Berhasil di Tambahkan");
                            } else if (response.data.status === false) {
                                handleClose();
                                toast.error(response.data.message);
                            }
                        }).catch((error) => {
                            toast.error(error);
                        });
                    }
                } catch (error) {
                    toast.error("Terjadi kesalahan saat mengirim data : " + error);
                }
            }
        } else {
            if (location.pathname.includes("lainnya")) {

                const updatedFormData = {
                    ...formData,
                    url_id: location.pathname.split("/")[3],
                    is_product: "false",
                    harga: pricePWA,
                    harga_dasar: hargaIncludeTNOSRange,
                    include_tnos_fee: includeTnosFee,
                    include_ppn: pricePPN,
                    tnos_fee: tnosFee,
                    platform_fee: platformFee,
                    ref_columns: selectedOptions.map(option => option.id).join(","),
                }

                const submitData = new FormData();

                for (const key in updatedFormData) {
                    submitData.append(key, updatedFormData[key]);
                }

                const dataObj = {};
                submitData.forEach((value, key) => {
                    dataObj[key] = value;
                });

                let apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/others`;

                try {
                    if (isEditing) {
                        await axios
                            .put(`${apiUrl}/${id}`, dataObj)
                            .then((response) => {
                                if (response.data.status === true) {
                                    handleClose();
                                    toast.success("Data Berhasil di Simpan");
                                } else if (response.data.status === false) {
                                    handleClose();
                                    toast.error(response.data.message)
                                }
                            }).catch((error) => {
                                toast.error(error);
                            });
                    } else {
                        await axios.post(apiUrl, dataObj, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }).then((response) => {
                            console.log(response);

                            if (response.data.status === true) {
                                handleClose();
                                toast.success("Data Berhasil di Tambahkan");
                            } else if (response.data.status === false) {
                                handleClose();
                                toast.error(response.data.message);
                            }
                        }).catch((error) => {
                            toast.error(error);
                        });
                    }
                } catch (error) {
                    toast.error("Terjadi kesalahan saat mengirim data : " + error);
                }

            } else {
                const submitData = new FormData();

                for (const key in formData) {
                    submitData.append(key, formData[key]);
                }

                const dataObj = {};
                submitData.forEach((value, key) => {
                    dataObj[key] = value;
                });

                let apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/provider`;

                if (location.pathname.includes("/pwa-b2b/security-provider/")) {
                    const id = location.pathname.split("/")[3];
                    apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/layanan`;
                    dataObj["provider_id"] = id;
                    submitData.append("provider_id", id);
                } else if (location.pathname.includes("/pwa-b2b/section")) {
                    if (location.pathname.endsWith("product-sub-section")) {
                        const id = location.pathname.split("/")[3];
                        apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/product`;
                        dataObj["section_id"] = id;
                        submitData.append("section_id", id);
                    } else if (location.pathname.endsWith("sub-section")) {
                        const id = location.pathname.split("/")[3];
                        apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/subsection`;
                        dataObj["section_id"] = id;
                        submitData.append("section_id", id);
                    } else {
                        const id = location.pathname.split("/")[3];
                        apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/product`;
                        dataObj["section_id"] = id;
                        submitData.append("section_id", id);
                    }
                } else if (location.pathname === "/pwa-b2b/security-provider") {
                    apiUrl = apiUrl
                } else if (location.pathname.includes("/pwa-b2b/unit")) {
                    apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/unit`
                } else if (location.pathname.includes("/pwa-b2b/component-others")) {
                    apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/komponen-lainnya`
                } else {
                    const id = location.pathname.split("/")[3];
                    apiUrl = `${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/section`;
                    dataObj["layanan_id"] = id;
                    submitData.append("layanan_id", id);
                }

                try {
                    if (isEditing) {
                        await axios
                            .put(`${apiUrl}/${id}`, dataObj)
                            .then((response) => {
                                if (response.data.status === true) {
                                    handleClose();
                                    toast.success("Data Berhasil di Simpan");
                                } else if (response.data.status === false) {
                                    handleClose();
                                    toast.error(response.data.message)
                                }
                            }).catch((error) => {
                                toast.error(error);
                            });
                    } else {
                        await axios.post(apiUrl, submitData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }).then((response) => {
                            console.log(response);

                            if (response.data.status === true) {
                                handleClose();
                                toast.success("Data Berhasil di Tambahkan");
                            } else if (response.data.status === false) {
                                handleClose();
                                toast.error(response.data.message);
                            }
                        }).catch((error) => {
                            toast.error(error);
                        });
                    }
                } catch (error) {
                    toast.error("Terjadi kesalahan saat mengirim data : " + error);
                }
            }
        }

    };

    const resetForm = () => {
        setHargaIncludeTnos(0)
        setTnosFee(0)
        setPricePPN(0)
        setPlatformFee(0)
        setPricePWA(0)
        setFormData({})
    }

    useEffect(() => {
        const fetchDataColumn = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/product-sub-section/${location.pathname.split("/")[3]}`);

                setReference(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchDataUnit = async () => {
            try {
                let response = await axios.get(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/unit`)

                console.log("Data");
                console.log(response.data.data.unit);
                
                setSatuanUnit(response.data.data.unit)
            } catch (error) {
                console.log(error);   
            }
        }

        if (location.pathname.includes("lainnya")) {
            fetchDataColumn();
            fetchDataUnit()
        }

    }, [location.pathname]);

    useEffect(() => {
        if (id) {
            const fetchDataById = async () => {
                try {
                    let response = null;
                    if (isTable === "provider") {
                        response = await axios.get(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/provider/${id}`);
                    } else if (isTable === "layanan") {
                        response = await axios.get(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/layanan/${id}/show`)
                    } else if (isTable === "section") {
                        response = await axios.get(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/section/${id}/show`)
                    } else if (isTable === "product") {
                        response = await axios.get(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/product/${id}/show`)
                    } else if (isTable === "subsection") {
                        response = await axios.get(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/subsection/${id}/show`)
                    } else if (isTable === "unit") {
                        response = await axios.get(`${process.env.REACT_APP_API_PWA_TNOS_DSBRD_URL}/pwa-revamp/unit2/${id}/show`)
                    }

                    if (response) {
                        setFormData(response.data.data);
                    }
                } catch (error) {
                    toast.error("Terjadi kesalahan saat mengambil data.");
                }
            };

            fetchDataById();
        }
    }, [id, isTable, selectedSetting]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "Edit Data" : "Tambah Data"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {location.pathname.includes("/pwa-b2b/security-provider/") ? (

                    <Form onSubmit={handleSubmit} method="POST">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nama Layanan
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Masukkan Nama Layanan"
                                value={formData.name || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </Form>
                ) : (location.pathname.includes("/pwa-b2b/layanan")) ? (
                    <Form onSubmit={handleSubmit} method="POST">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"> Nama </label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Masukkan Nama" value={formData.name || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="have_sub_section" className="form-label"> Punya Sub Menu </label>
                            <Form.Select value={formData.have_sub_section || ""} name="have_sub_section" id="have_sub_section" onChange={handleChange}>
                                <option value="">- Pilih -</option>
                                <option value="0">Tidak</option>
                                <option value="1">Ya</option>
                            </Form.Select>
                        </div>
                    </Form>
                ) : (location.pathname.includes("/pwa-b2b/section")) ? (
                    <>
                        {location.pathname.endsWith("product-sub-section") ? (
                            <>
                                <Form onSubmit={handleSubmit} method="POST">
                                    <Row>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="column" className="form-label"> Kolom </label>
                                                <input type="text" className="form-control" id="column" name="column" placeholder="Masukkan Nama Kolom" value={formData.column || ""} onChange={handleChange} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="satuan" className="form-label"> Satuan </label>
                                                <Form.Select
                                                    name="satuan"
                                                    value={selectedSetting}
                                                    onChange={(e) => setSelectedSetting(parseInt(e.target.value))}
                                                >
                                                    {getSatuanUnit?.map((item) => (
                                                        <option key={item.key} value={item.id}>
                                                            {item.satuan}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div className="mb-3">
                                                <label htmlFor="harga_dasar" className="form-label"> Setting Harga Dasar </label>
                                                <Form.Select
                                                    name="transaction_status"
                                                    value={selectedSetting}
                                                    onChange={(e) => setSelectedSetting(parseInt(e.target.value))}
                                                >
                                                    {getSettingHargaDasar?.map((item) => (
                                                        <option key={item.key} value={item.value}>
                                                            {item.defaultValue}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </div>
                                        </Col>
                                    </Row>

                                    {selectedSetting !== 0 ? (
                                        <>
                                            {selectedSetting === 2 ? (
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="mb-3">
                                                            <label htmlFor="harga_dasar" className="form-label"> Harga Dasar </label>
                                                            <input type="number" className="form-control" id="harga_dasar" name="harga_dasar" placeholder="Masukkan Harga Dasar" value={formData.harga_dasar || ""} onChange={handleChange} />
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="mb-3">
                                                            <label htmlFor="include_tnos_fee" className="form-label"> Include TNOS Fee (%) </label>
                                                            <input type="number" className="form-control" id="include_tnos_fee" name="include_tnos_fee" placeholder="Masukkan Include TNOS Fee (%)" value={formData.include_tnos_fee || ""} onChange={handleChange} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            ) : selectedSetting === 1 ? (
                                                <>
                                                    <Row>
                                                        <Col md={6}>
                                                            <div className="mb-3">
                                                                <label htmlFor="include_tnos_range" className="form-label"> Include TNOS </label>
                                                                <input type="number" className="form-control" id="include_tnos_range" name="include_tnos_range" placeholder="Masukkan Include TNOS" value={formData.include_tnos_range || ""} onChange={handleChange} />
                                                            </div>
                                                        </Col>
                                                        <Col md={6}>
                                                            <div className="mb-3">
                                                                <label htmlFor="percentance" className="form-label"> Persentanse Harga Dasar </label>
                                                                <input type="number" className="form-control" id="percentance" name="percentance" placeholder="Masukkan Persentanse" value={formData.percentance || ""} onChange={handleChange} />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <label htmlFor="include_ppn" className="form-label"> Include PPN (%) </label>
                                                        <input type="number" className="form-control" id="include_ppn" name="include_ppn" placeholder="Masukkan Include PPN" value={formData.include_ppn || ""} onChange={handleChange} />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <label htmlFor="platform_fee" className="form-label"> Platform Fee </label>
                                                        <input type="number" className="form-control" id="platform_fee" name="platform_fee" placeholder="Masukkan Platform Fee" value={formData.platform_fee || ""} onChange={handleChange} />
                                                    </div>
                                                </Col>
                                            </Row>

                                            {hargaIncludeTnos !== 0 || hargaIncludeTNOSRange !== 0 ? (
                                                <Button variant="danger" size="sm" onClick={resetForm}>
                                                    <FontAwesomeIcon icon={faTrash} /> Reset
                                                </Button>
                                            ) : (
                                                <>
                                                </>
                                            )}

                                            <hr />

                                            {selectedSetting === 1 ? (
                                                <Row>
                                                    <Col md={4}>
                                                        <div className="mb-1">
                                                            <label htmlFor="include_tnos_fee" className="form-label"> Harga Dasar </label>
                                                        </div>
                                                    </Col>
                                                    <Col md={8}>
                                                        <div className="mb-1" style={{ textAlign: 'right' }}>
                                                            <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(hargaIncludeTNOSRange)} </label>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <></>
                                            )}

                                            <Row>
                                                <Col md={4}>
                                                    <div className="mb-1">
                                                        <label htmlFor="include_tnos_fee" className="form-label"> Include TNOS {selectedSetting === 1 ? "" : "Fee"} </label>
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="mb-1" style={{ textAlign: 'right' }}>
                                                        <label htmlFor="include_tnos_fee" className="form-label">
                                                            {selectedSetting === 1 ? (
                                                                formatRupiah(includeTnosFee)
                                                            ) : (
                                                                formatRupiah(hargaIncludeTnos)
                                                            )}
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="mb-1">
                                                        <label htmlFor="include_tnos_fee" className="form-label"> TNOS Fee </label>
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="mb-1" style={{ textAlign: 'right' }}>
                                                        <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(tnosFee)} </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="mb-1">
                                                        <label htmlFor="include_tnos_fee" className="form-label"> Include PPN </label>
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="mb-1" style={{ textAlign: 'right' }}>
                                                        <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(pricePPN)} </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="mb-1">
                                                        <label htmlFor="include_tnos_fee" className="form-label"> Harga Platform </label>
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="mb-1" style={{ textAlign: 'right' }}>
                                                        <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(platformFee)} </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="mb-1">
                                                        <label htmlFor="include_tnos_fee" className="form-label"> Harga PWA </label>
                                                    </div>
                                                </Col>
                                                <Col md={8}>
                                                    <div className="mb-1" style={{ textAlign: 'right' }}>
                                                        <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(pricePWA)} </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                </Form>
                            </>
                        ) : location.pathname.endsWith("sub-section") ? (
                            <>
                                <Form onSubmit={handleSubmit} method="POST">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label"> Nama </label>
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Masukkan Nama" value={formData.name || ""} onChange={handleChange} />
                                    </div>
                                </Form>
                            </>
                        ) : (
                            <>
                                <Form onSubmit={handleSubmit} method="POST">
                                    <div className="mb-3">
                                        <label htmlFor="column" className="form-label"> Kolom </label>
                                        <input type="text" className="form-control" id="column" name="column" placeholder="Masukkan Nama Kolom" value={formData.column || ""} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="harga" className="form-label"> Harga </label>
                                        <input type="number" className="form-control" id="harga" name="harga" placeholder="Masukkan Harga" value={formData.harga || ""} onChange={handleChange} />
                                    </div>
                                </Form>
                            </>
                        )}
                    </>
                ) : (location.pathname.includes("/pwa-b2b/lainnya")) ? (
                    <Form onSubmit={handleSubmit} method="POST">
                        <div className="mb-3">
                            <label htmlFor="others_column" className="form-label">
                                Others Column
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="others_column"
                                name="others_column"
                                placeholder="Masukkan Others Column"
                                value={formData.others_column || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reference_id" className="form-label">
                                Reference Column
                            </label>
                            <Form.Select name="reference_id" value={formData.reference_id || ""} onChange={handleChangeReference}>
                                <option value="">- Pilih Referensi Kolom -</option>
                                {getReference?.length > 0 ? (
                                    getReference?.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.column}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">- Loading -</option>
                                )}
                            </Form.Select>
                        </div>

                        <div className="mb-3">
                            <h6>Termasuk Pilihan Kolom</h6>
                            {selectedOptions.length > 0 ? (
                                <ul>
                                    {selectedOptions.map((option, index) => (
                                        <li key={index}>
                                            {option.column}{" "}
                                            <span
                                                style={{
                                                    color: "red",
                                                    cursor: "pointer",
                                                    marginLeft: "10px"
                                                }}
                                                onClick={() => handleDeleteArr(option.id)}
                                            >
                                                🗑️
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Belum Ada Pilihan</p>
                            )}
                        </div>

                        <Row>
                            <Col md={12}>
                                <div className="mb-3">
                                    <label htmlFor="harga_dasar" className="form-label"> Setting Harga Dasar </label>
                                    <Form.Select
                                        name="transaction_status"
                                        value={selectedSetting}
                                        onChange={(e) => setSelectedSetting(parseInt(e.target.value))}
                                    >
                                        {getSettingHargaDasar?.map((item) => (
                                            <option key={item.key} value={item.value}>
                                                {item.defaultValue}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                            </Col>
                        </Row>

                        {selectedSetting !== 0 ? (
                            <>
                                {selectedSetting === 2 ? (
                                    <Row>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="harga_dasar" className="form-label"> Harga Dasar </label>
                                                <input type="number" className="form-control" id="harga_dasar" name="harga_dasar" placeholder="Masukkan Harga Dasar" value={formData.harga_dasar || ""} onChange={handleChange} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="mb-3">
                                                <label htmlFor="include_tnos_fee" className="form-label"> Include TNOS Fee (%) </label>
                                                <input type="number" className="form-control" id="include_tnos_fee" name="include_tnos_fee" placeholder="Masukkan Include TNOS Fee (%)" value={formData.include_tnos_fee || ""} onChange={handleChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                ) : selectedSetting === 1 ? (
                                    <>
                                        <Row>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <label htmlFor="include_tnos_range" className="form-label"> Include TNOS </label>
                                                    <input type="number" className="form-control" id="include_tnos_range" name="include_tnos_range" placeholder="Masukkan Include TNOS" value={formData.include_tnos_range || ""} onChange={handleChange} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <label htmlFor="percentance" className="form-label"> Persentanse Harga Dasar </label>
                                                    <input type="number" className="form-control" id="percentance" name="percentance" placeholder="Masukkan Persentanse" value={formData.percentance || ""} onChange={handleChange} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <></>
                                )}
                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label htmlFor="include_ppn" className="form-label"> Include PPN (%) </label>
                                            <input type="number" className="form-control" id="include_ppn" name="include_ppn" placeholder="Masukkan Include PPN" value={formData.include_ppn || ""} onChange={handleChange} />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label htmlFor="platform_fee" className="form-label"> Platform Fee </label>
                                            <input type="number" className="form-control" id="platform_fee" name="platform_fee" placeholder="Masukkan Platform Fee" value={formData.platform_fee || ""} onChange={handleChange} />
                                        </div>
                                    </Col>
                                </Row>

                                {hargaIncludeTnos !== 0 || hargaIncludeTNOSRange !== 0 ? (
                                    <Button variant="danger" size="sm" onClick={resetForm}>
                                        <FontAwesomeIcon icon={faTrash} /> Reset
                                    </Button>
                                ) : (
                                    <>
                                    </>
                                )}

                                <hr />

                                {selectedSetting === 1 ? (
                                    <Row>
                                        <Col md={4}>
                                            <div className="mb-1">
                                                <label htmlFor="include_tnos_fee" className="form-label"> Harga Dasar </label>
                                            </div>
                                        </Col>
                                        <Col md={8}>
                                            <div className="mb-1" style={{ textAlign: 'right' }}>
                                                <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(hargaIncludeTNOSRange)} </label>
                                            </div>
                                        </Col>
                                    </Row>
                                ) : (
                                    <></>
                                )}

                                <Row>
                                    <Col md={4}>
                                        <div className="mb-1">
                                            <label htmlFor="include_tnos_fee" className="form-label"> Include TNOS {selectedSetting === 1 ? "" : "Fee"} </label>
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <div className="mb-1" style={{ textAlign: 'right' }}>
                                            <label htmlFor="include_tnos_fee" className="form-label">
                                                {selectedSetting === 1 ? (
                                                    formatRupiah(includeTnosFee)
                                                ) : (
                                                    formatRupiah(hargaIncludeTnos)
                                                )}
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <div className="mb-1">
                                            <label htmlFor="include_tnos_fee" className="form-label"> TNOS Fee </label>
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <div className="mb-1" style={{ textAlign: 'right' }}>
                                            <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(tnosFee)} </label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <div className="mb-1">
                                            <label htmlFor="include_tnos_fee" className="form-label"> Include PPN </label>
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <div className="mb-1" style={{ textAlign: 'right' }}>
                                            <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(pricePPN)} </label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <div className="mb-1">
                                            <label htmlFor="include_tnos_fee" className="form-label"> Harga Platform </label>
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <div className="mb-1" style={{ textAlign: 'right' }}>
                                            <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(platformFee)} </label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <div className="mb-1">
                                            <label htmlFor="include_tnos_fee" className="form-label"> Harga PWA </label>
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <div className="mb-1" style={{ textAlign: 'right' }}>
                                            <label htmlFor="include_tnos_fee" className="form-label"> {formatRupiah(pricePWA)} </label>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <></>
                        )}
                    </Form>
                ) : (location.pathname.includes("/pwa-b2b/unit")) ? (
                    <>
                        <Form onSubmit={handleSubmit} method="POST">
                            <div className="mb-3">
                                <label htmlFor="satuan" className="form-label">
                                    Satuan
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="satuan"
                                    name="satuan"
                                    placeholder="Masukkan Satuan"
                                    value={formData.satuan || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form>
                    </>
                ) : (location.pathname.includes("/pwa-b2b/component-others")) ? (
                    <>
                        <Form onSubmit={handleSubmit} method="POST">
                            <div className="mb-3">
                                <label htmlFor="komponen" className="form-label">
                                    Nama Komponen
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="komponen"
                                    name="komponen"
                                    placeholder="Masukkan Nama Komponen"
                                    value={formData.komponen || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="harga" className="form-label">
                                    Harga Komponen
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="harga"
                                    name="harga"
                                    placeholder="Masukkan Harga Komponen"
                                    value={formData.harga || ""}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form>
                    </>
                ) : (
                    <Form onSubmit={handleSubmit} method="POST">
                        <div className="mb-3">
                            <label htmlFor="name_sc" className="form-label">
                                Nama Security Provider
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name_sc"
                                name="name_sc"
                                placeholder="Masukkan Nama Security Provider"
                                value={formData.name_sc || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name_pt" className="form-label">
                                Nama PT
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name_pt"
                                name="name_pt"
                                placeholder="Masukkan Nama PT"
                                value={formData.name_pt || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Logo Gambar
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Deskripsi
                            </label>
                            <textarea
                                name="description"
                                className="form-control"
                                id="description"
                                placeholder="Masukkan Deskripsi"
                                rows={5}
                                value={formData.description || ""}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button type="reset" size="sm" variant="danger" onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} style={{ marginRight: '5px' }} /> Batal
                </Button>
                <Button type="submit" size="sm" variant="success" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} /> Simpan
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyModal;
