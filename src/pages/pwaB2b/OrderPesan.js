import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReadableDateTime from "../../components/ReadableDateTime";

export default () => {
  const currentURL = window.location.href;
  const orderId = currentURL.split("/").slice(-2, -1)[0];

  const [orderData, setOrderData] = useState(null);

  const ifNotNull = (field, type = "normal", optionArr = "normal") => {
    let updateField = field;

    if (!field) {
      return "-";
    }

    if (type === "curr") {
      updateField = `IDR ${parseInt(field).toLocaleString("id-ID", {})}`;
    }

    if (type === "option") {
      updateField = optionArr?.map(
        (item) => field === item.value && item.defaultValue
      );
    }

    if (type === "obj") {
      updateField = JSON.parse(field)[optionArr];
    }

    if (type === "saham") {
      const data = JSON.parse(field);
      const output = data
        .map((item) => `${item.name}: ${item.persentase}%`)
        .join(", ");
      return output;
    }

    if (type === "sunder") {
      const data = JSON.parse(field);
      const output = data
        .map((item) => `${item.jabatan}: ${item.name}`)
        .join(", ");
      return output;
    }

    if (type === "bidus") {
      const data = JSON.parse(field);
      const output = data.map((item) => `${item.value}`).join(", ");
      return output;
    }

    if (type === "objArr") {
      const parsedData = JSON.parse(field);
      const options = parsedData.map((item) => item[optionArr]);
      return options.join(", ");
    }

    if (type === "sahamCard") {
      const data = JSON.parse(field);
      const output = data.map((item, index) => (
        <span>
          {index + 1}. {item.name}: {item.persentase}%
          <br />
        </span>
      ));
      return output;
    }

    if (type === "sunderCard") {
      const data = JSON.parse(field);
      const output = data.map((item, index) => (
        <span>
          {index + 1}. {item.jabatan}: {item.name}
          <br />
        </span>
      ));
      return output;
    }

    if (type === "bidusCard") {
      const data = JSON.parse(field);
      const output = data.map((item, index) => (
        <span>
          {index + 1}. {item.value}
          <br />
        </span>
      ));
      return output;
    }

    if (type === "objArrCard") {
      const parsedData = JSON.parse(field);
      const options = parsedData.map((item, index) => (
        <span>
          {index + 1}. {item[optionArr]}
          <br />
        </span>
      ));
      return options;
    }

    if (type === "address") {
      let addressObj = JSON.parse(field);

      if (optionArr === "dom") {
        return addressObj.domisili_sekarang;
      }

      let order = [
        "jalan",
        "rt",
        "rw",
        "kelurahan.label",
        "kecamatan.label",
        "kabupaten.label",
        "provinsi.label",
        "kode_pos",
      ];

      let result = order.map((item) => {
        let keys = item.split(".");
        let value = addressObj[keys[0]];

        if (keys.length > 1 && value) {
          value = value[keys[1]];
        }

        if (keys[0] === "rt") {
          value = "RT " + value;
        } else if (keys[0] === "rw") {
          value = "RW " + value;
        }

        return value ? value : "";
      });

      return result.filter((item) => item !== "").join(", ");
    }

    if (type === "dom") {
    }

    return updateField;
  };

  const location = orderData?.alamat_badan_hukum;
  
  function createGoogleMapsLink(location) {
    const mapsURL = `https://www.google.com/maps/place/${encodeURIComponent(
      location
    )}`;

    // Mengembalikan URL
    return mapsURL;
  }

  const googleMapsLink = createGoogleMapsLink(location);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_PWA_TNOSWORLD_URL}/pemesanan/${orderId}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === false) {
          Swal.fire({
            icon: "error",
            title: "Data Tidak Ada",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/";
            }
          });
        } else if (response.status === true) {
          setOrderData(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(orderData);

  const confirmPesanan = (orderIdPesanan) => {
    Swal.fire({
      title: "Konfirmasi",
      html: `<p>Apakah Anda Yakin Ingin Memproses Pesanan Ini ?</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });
  };

  return (
    <div className="container-fluid">
      <Col xs={12} xl={12} style={{ marginTop: "30px" }}>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <Row>
              <Col md={6} className="mb-3">
                <h6>Detail Pemesanan &nbsp;</h6>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <small style={{ color: "#7376A1" }}> No. Invoice </small>
                <p style={{ fontWeight: "bold" }}>
                  {orderData?.tnos_invoice_id}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <small style={{ color: "#7376A1" }}>ID Referensi</small>
                <p style={{ fontWeight: "bold" }}>{orderData?.external_id}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <small style={{ color: "#7376A1" }}>Keperluan Pengamanan</small>
                <p style={{ fontWeight: "bold" }}>{orderData?.needs}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <small style={{ color: "#7376A1" }}>
                  Rincian Lokasi |
                  <a
                    href={googleMapsLink}
                    target="_blank"
                    style={{ color: "#1a0dab", marginLeft: "5px" }}
                  >
                    <u>Lihat Map</u>
                  </a>
                </small>
                <p style={{ fontWeight: "bold" }}>
                  {ifNotNull(orderData?.location)}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <small style={{ color: "#7376A1" }}>
                  Tanggal & Waktu Mulai
                </small>
                <p style={{ fontWeight: "bold" }}>
                  {ReadableDateTime(
                    ifNotNull(
                      orderData?.tanggal_mulai + " " + orderData?.jam_mulai
                    ),
                    "shortMonth"
                  )}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <small style={{ color: "#7376A1" }}>Jumlah Pengamanan</small>
                <p style={{ fontWeight: "bold" }}>
                  {`${ifNotNull(orderData?.jml_personil)} Personel`}
                </p>
              </Col>
            </Row>
            <Button
              variant="primary"
              className="btn-block"
              onClick={() => {
                confirmPesanan(orderId);
              }}
            >
              <FontAwesomeIcon icon={faCheck} size="sm" /> Konfirmasi Pesanan
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};
