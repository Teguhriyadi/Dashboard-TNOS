import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    Col,
    Row,
    Card,
} from "@themesberg/react-bootstrap";
import Preloader from "../../components/Preloader";
import { useLocation } from "react-router-dom";

export default () => {
    const [getDetailData, setDetailData] = useState();

    const location = useLocation()
    const id_panic = location.pathname.split("/")[3];

    useEffect(() => {
        const fetchDetailData = () => {
            fetch(`${process.env.REACT_APP_API_TAB_ORGANISASI}/panic_report/${id_panic}/show`)
                .then((res) => res.json())
                .then((response) => {
                    
                    setDetailData(response.data)

                }).catch((error) => {
                    console.log("Error Fetching Data " + error);
                });
        }

        fetchDetailData();
    }, []);

    return (
        <>
            <Row>
                <Preloader show={!getDetailData ? true : false} />
                <Row className="mt-4"></Row>
                <Breadcrumb
                    className="d-none d-md-inline-block"
                    listProps={{
                        className: "breadcrumb-darktransaksi breadcrumb-transparent",
                    }}
                >
                    <Breadcrumb.Item href="/tab-b2b/insiden">
                        Daftar Insiden
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active style={{ color: 'black' }}>Detail Panic</Breadcrumb.Item>
                </Breadcrumb>
                <Col xs={12} xl={12}>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            <Row>
                                <Col md={7}>
                                    <h6>
                                        Detail Panic
                                    </h6>
                                    <Row className="mt-3">
                                        <Col md={6}>
                                            <small style={{ color: "#7376A1" }}>Nama</small>
                                            <p style={{ fontWeight: "bold" }}>
                                                {getDetailData?.name}
                                            </p>
                                        </Col>
                                        <Col md={6}>
                                            <small style={{ color: "#7376A1" }}>Nomor HP</small>
                                            <p style={{ fontWeight: "bold" }}>
                                                {getDetailData?.phone_number}
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <small style={{ color: "#7376A1" }}>Tanggal, Jam</small>
                                            <p style={{ fontWeight: "bold" }}>{getDetailData?.tanggal} | {getDetailData?.jam} </p>
                                        </Col>
                                        <Col md={6}>
                                            <small style={{ color: "#7376A1" }}>Status</small>
                                            <p style={{ fontWeight: "bold" }}>{getDetailData?.status}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <small style={{ color: "#7376A1" }}>Nama Responder</small>
                                            <p style={{ fontWeight: "bold" }}>
                                                {getDetailData?.responder_name}
                                            </p>
                                        </Col>
                                        <Col md={6}>
                                            <small style={{ color: "#7376A1" }}>Nomor HP Responder</small>
                                            <p style={{ fontWeight: "bold" }}>
                                                {getDetailData?.phone_number_responder}
                                            </p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
