import React, { useState, useEffect } from "react";
import ReactExport from "react-export-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Card,
  Row,
  Button,
  Form,
  InputGroup,
  Badge,
  Modal,
  Alert,
} from "@themesberg/react-bootstrap";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { TnosDataTable } from "../../components/TnosDataTable";
import FlashMessage from "react-flash-message";

export default () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [getIsReload, setIsReload] = useState(true);
  const [getRefundData, setRefundData] = useState();
  const [getRefundSid, setRefundSid] = useState();
  const [getAllRefundData, setAllRefundData] = useState();
  const [getAllStatusRefundData, setAllStatusRefundData] = useState();
  const [getMessageEmptyData, setMessageEmptyData] = useState(
    "Belum ada data pada status ini"
  );
  const [getPendingData, setPendingData] = useState();
  const [getOnProgressData, setOnProgressData] = useState();
  const [getDoneData, setDoneData] = useState();
  const [getActiveStatus, setActiveStatus] = useState("W");
  const [getFlashMesage, setFlashMessage] = useState({
    status: false,
    message: "",
    color: "",
  });

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const onDoneSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch(`${process.env.REACT_APP_PORTAL_API_URL}/payment/refund/complete`, {
      method: "POST",
      body: JSON.stringify({
        sid: getRefundSid,
        noref: formData.get("reference_num"),
        bank: formData.get("reference_bank"),
        note: formData.get("reference_note"),
        adminid: localStorage.getItem("user_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setFlashMessage({
            status: true,
            message: `Berhasil mengubah status pengembalian dengan sid ${getRefundSid} dari Proses ke Selesai`,
            color: "success",
          });
          localStorage.setItem("activeRefundStatus", "Y");
          window.location.reload();
        } else {
          setFlashMessage({
            status: true,
            message: `Gagal mengubah status`,
            color: "danger",
          });
        }
      });
  };

  const updateStatus = (sid) => {
    fetch(`${process.env.REACT_APP_PORTAL_API_URL}/payment/refund/proses`, {
      method: "POST",
      body: JSON.stringify({
        sid: sid,
        adminid: localStorage.getItem("user_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setFlashMessage({
            status: true,
            message: `Berhasil mengubah status pengembalian dengan sid ${sid} dari Menunggu ke Proses`,
            color: "success",
          });
          localStorage.setItem("activeRefundStatus", "P");
          window.location.reload();
        } else {
          setFlashMessage({
            status: true,
            message: `Gagal mengubah status`,
            color: "danger",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const TableRow = (props) => {
    const {
      sid,
      total,
      potongan,
      kembali,
      mitrafee,
      compfee,
      bank_name,
      bank_norek,
      bank_account,
      create_at,
      status,
    } = props;

    return (
      <tr>
        <td>{props.num}</td>
        <td>{sid}</td>
        <td>{"IDR " + parseInt(total).toLocaleString("id-ID", {})}</td>
        <td>{"IDR " + parseInt(potongan).toLocaleString("id-ID", {})}</td>
        <td>{"IDR " + parseInt(kembali).toLocaleString("id-ID", {})}</td>
        <td>{"IDR " + parseInt(mitrafee).toLocaleString("id-ID", {})}</td>
        <td>{"IDR " + parseInt(compfee).toLocaleString("id-ID", {})}</td>
        <td>{bank_name}</td>
        <td>{bank_norek}</td>
        <td>{bank_account}</td>
        <td>
          {getRefundDateTime(
            create_at.split("+")[0].split("T")[0],
            create_at.split("+")[0].split("T")[1],
            true
          )}
        </td>
        <td>
          <Badge
            bg={
              status === "W"
                ? "danger"
                : status === "P"
                ? "warning"
                : status === "Y"
                ? "success"
                : ""
            }
            className="badge-lg"
          >
            {status === "W"
              ? "Menunggu"
              : status === "P"
              ? "Sedang Diproses"
              : status === "Y"
              ? "Selesai"
              : ""}
          </Badge>
        </td>
        {getActiveStatus !== "Y" && (
          <td>
            <Badge
              bg={status === "W" ? "warning" : status === "P" ? "primary" : ""}
              className="badge-lg"
              style={{ cursor: "pointer" }}
            >
              {status === "W" ? (
                <span onClick={() => updateStatus(sid)}>Proses</span>
              ) : status === "P" ? (
                <>
                  <span
                    onClick={() => {
                      setShow(true);
                      setRefundSid(sid);
                    }}
                  >
                    Masukkan No. Referensi
                  </span>
                  <Modal show={show} onHide={handleClose} centered size="sm">
                    <Modal.Body>
                      <Form onSubmit={onDoneSubmit} method="POST">
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Bank <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="reference_bank"
                            placeholder="cth : BCA"
                            autoFocus
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            No. Referensi <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="reference_num"
                            placeholder="cth : 2346278"
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Catatan</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="6"
                            name="reference_note"
                          />
                        </Form.Group>
                        <Row>
                          <Col>
                            {" "}
                            <Button
                              variant="secondary"
                              onClick={handleClose}
                              className="btn btn-sm w-100"
                            >
                              Tutup
                            </Button>
                          </Col>
                          <Col>
                            {" "}
                            <Button
                              type="submit"
                              variant="primary"
                              className="btn btn-sm w-100"
                            >
                              Kirim
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </>
              ) : (
                ""
              )}
            </Badge>
          </td>
        )}
      </tr>
    );
  };

  const getRefundDateTime = (tglPengajuanBefore, jamPengajuan, split) => {
    let tglPengajuan = split
      ? tglPengajuanBefore.split("-").reverse().toString().replaceAll(",", "-")
      : tglPengajuanBefore;
    return tglPengajuan + " " + jamPengajuan;
  };

  const getTnosDateConvert = (date) => {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const getDateBefore = (date) => {
    let today = new Date();
    today.setMonth(today.getMonth() - date);
    return getTnosDateConvert(today);
  };

  const getTodayDate = () => {
    let today = new Date();
    return getTnosDateConvert(today);
  };

  const getDataBetweenDate = (datas, startDate, endDate) => {
    return JSON.parse(datas).filter(
      (item) =>
        new Date(
          getRefundDateTime(
            item.create_at.split("+")[0].split("T")[0],
            item.create_at.split("+")[0].split("T")[1]
            // true
          )
        ).getTime() >= new Date(startDate).getTime() &&
        new Date(
          getRefundDateTime(
            item.create_at.split("+")[0].split("T")[0],
            item.create_at.split("+")[0].split("T")[1]
            // true
          )
        ).getTime() <= new Date(endDate).getTime()
    );
  };

  useEffect(() => {
    localStorage.setItem("getStartDateRefund", getDateBefore(1) + " 00:00:00");
    localStorage.setItem("getEndDateRefund", getTodayDate() + " 23:59:59");
    fetch(`${process.env.REACT_APP_PORTAL_API_URL}/payment/refund/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let datas = data.data;
        setAllStatusRefundData(datas);
        setAllRefundData(datas);

        const monthTransaction = getDataBetweenDate(
          JSON.stringify(datas),
          getDateBefore(1) + "T00:00:00",
          getTodayDate() + "T23:59:59"
        );
        monthTransaction.sort(
          (a, b) =>
            new Date(
              getRefundDateTime(
                b.create_at.split("+")[0].split("T")[0],
                b.create_at.split("+")[0].split("T")[1],
                true
              )
            ) -
            new Date(
              getRefundDateTime(
                a.create_at.split("+")[0].split("T")[0],
                a.create_at.split("+")[0].split("T")[1],
                true
              )
            )
        );
        setRefundData(monthTransaction.filter((item) => item.status === "W"));
        setPendingData(monthTransaction.filter((item) => item.status === "W"));
        setOnProgressData(
          monthTransaction.filter((item) => item.status === "P")
        );
        setDoneData(monthTransaction.filter((item) => item.status === "Y"));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateRefundDate = (e) => {
    e.preventDefault();

    setActiveStatus("W");
    setIsReload(false);

    const formData = new FormData(e.target);
    const splitDate = (date) => {
      let str = date.split("");
      str[10] = " ";
      str = str.join("");
      return str;
    };

    localStorage.setItem(
      "getStartDateRefund",
      splitDate(formData.get("start_date_time"))
    );
    localStorage.setItem(
      "getEndDateRefund",
      splitDate(formData.get("end_date_time"))
    );

    let getUpdatedRefundData = getDataBetweenDate(
      JSON.stringify(
        getAllRefundData.sort(
          (a, b) =>
            new Date(b.create_at.split("+")[0].split("T")[0]) -
            new Date(a.create_at.split("+")[0].split("T")[1])
        )
      ),
      formData.get("start_date_time"),
      formData.get("end_date_time")
    );

    setRefundData(getUpdatedRefundData);
    setAllStatusRefundData(getUpdatedRefundData);
    setPendingData(getUpdatedRefundData.filter((item) => item.status === "W"));
    setOnProgressData(
      getUpdatedRefundData.filter((item) => item.status === "P")
    );
    setDoneData(getUpdatedRefundData.filter((item) => item.status === "Y"));
    getAllRefundData.filter(
      (item) =>
        new Date(
          getRefundDateTime(
            item.create_at.split("+")[0].split("T")[0],
            item.create_at.split("+")[0].split("T")[1],
            true
          )
        ).getTime() >= new Date(formData.get("start_date_time")).getTime() &&
        new Date(
          getRefundDateTime(
            item.create_at.split("+")[0].split("T")[0],
            item.create_at.split("+")[0].split("T")[1],
            true
          )
        ).getTime() <= new Date(formData.get("end_date_time")).getTime()
    );
    getAllRefundData.filter(
      (item) =>
        new Date(
          getRefundDateTime(
            item.create_at.split("+")[0].split("T")[0],
            item.create_at.split("+")[0].split("T")[1],
            true
          )
        ).getTime() >= new Date(formData.get("start_date_time")).getTime() &&
        new Date(
          getRefundDateTime(
            item.create_at.split("+")[0].split("T")[0],
            item.create_at.split("+")[0].split("T")[1],
            true
          )
        ).getTime() <= new Date(formData.get("end_date_time")).getTime()
    ).length === 0 &&
      setMessageEmptyData("Tidak ada penarikan diantara tanggal ini");
  };
  return (
    <>
      <Col xl={12} className="mt-2">
        <Card border="light">
          <Card.Body>
            <Form method="POST" onSubmit={updateRefundDate}>
              <Row className="mb-3">
                <Col md={8}>
                  <Form.Label>Waktu Pengajuan</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      name="start_date_time"
                      step="1"
                      defaultValue={getDateBefore(1) + "T00:00:00"}
                      required
                    />
                    <InputGroup.Text>&#x2192;</InputGroup.Text>
                    <Form.Control
                      type="datetime-local"
                      name="end_date_time"
                      step="1"
                      defaultValue={getTodayDate() + "T23:59:59"}
                      required
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control
                    className="btn btn-primary"
                    type="submit"
                    name="btn_search_refund"
                    value="Cari Pengajuan"
                  />
                </Col>
              </Row>
            </Form>
            <TnosDataTable
              alert={
                getFlashMesage?.status === true && (
                  <FlashMessage duration={3000} persistOnHover={true}>
                    <Alert variant={getFlashMesage.color}>
                      <div className="d-flex justify-content-between">
                        <div>{getFlashMesage.message}</div>
                      </div>
                    </Alert>
                  </FlashMessage>
                )
              }
              title={[
                {
                  variant: "blue",
                  status: "Semua Pengajuan",
                  value: "S",
                  length: getAllStatusRefundData?.length,
                },
                {
                  variant: "danger",
                  status: "Menunggu",
                  value: "W",
                  length: getPendingData?.length,
                },
                {
                  variant: "warning",
                  status: "Sedang Diproses",
                  value: "P",
                  length: getOnProgressData?.length,
                },
                {
                  variant: "success",
                  status: "Selesai",
                  value: "Y",
                  length: getDoneData?.length,
                },
              ].map((item) => {
                return (
                  <Button
                    variant={item.variant}
                    className="btn btn-sm me-2 mb-2 text-white"
                    style={
                      getActiveStatus === item.value
                        ? {
                            boxShadow: "0px 5px 5px #888888",
                            fontWeight: "bold",
                          }
                        : {}
                    }
                    onClick={() => {
                      setActiveStatus(item.value);
                      localStorage.setItem("activeRefundStatus", item.value);
                      setRefundData(
                        item.value === "W"
                          ? getPendingData
                          : item.value === "P"
                          ? getOnProgressData
                          : item.value === "Y"
                          ? getDoneData
                          : getAllStatusRefundData
                      );
                      setMessageEmptyData("Belum ada data pada status ini");
                    }}
                  >
                    {item.status} &nbsp;
                    <Badge bg="dark">{item.length}</Badge>
                  </Button>
                );
              })}
              subtitle={
                getIsReload &&
                "Menampilkan data dari satu bulan yang lalu sampai hari ini"
              }
              data={
                <>
                  <thead className="thead-light">
                    <tr>
                      <th className="border-0">No.</th>
                      <th className="border-0">sid</th>
                      <th className="border-0">Total</th>
                      <th className="border-0">Potongan</th>
                      <th className="border-0">Kembali</th>
                      <th className="border-0">Pendapatan Mitra</th>
                      <th className="border-0">Pendapatan Perusahaan</th>
                      <th className="border-0">Bank</th>
                      <th className="border-0">No. Rekening</th>
                      <th className="border-0">Atas Nama</th>
                      <th className="border-0">Waktu Pengajuan</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">
                        <ExcelFile
                          element={
                            <Badge
                              bg="primary"
                              className="badge-lg"
                              style={{ cursor: "pointer" }}
                            >
                              <FontAwesomeIcon icon={faFileExcel} /> Export
                              Excel
                            </Badge>
                          }
                          filename={`refund_${
                            getActiveStatus === "W"
                              ? "waiting"
                              : getActiveStatus === "P"
                              ? "on_progress"
                              : getActiveStatus === "Y"
                              ? "done"
                              : "all"
                          }_( ${localStorage.getItem(
                            "getStartDateWithdrawal"
                          )} - ${localStorage.getItem(
                            "getEndDateWithdrawal"
                          )} )`}
                        >
                          <ExcelSheet
                            data={getRefundData}
                            name="Data Pengembalian"
                          >
                            <ExcelColumn label="SID" value="sid" />
                            <ExcelColumn
                              label="Total"
                              value={(col) =>
                                "IDR " +
                                parseInt(col.total).toLocaleString("id-ID", {})
                              }
                            />
                            <ExcelColumn
                              label="Potongan"
                              value={(col) =>
                                "IDR " +
                                parseInt(col.potongan).toLocaleString(
                                  "id-ID",
                                  {}
                                )
                              }
                            />
                            <ExcelColumn
                              label="Kembali"
                              value={(col) =>
                                "IDR " +
                                parseInt(col.kembali).toLocaleString(
                                  "id-ID",
                                  {}
                                )
                              }
                            />
                            <ExcelColumn
                              label="Pendapatan Mitra"
                              value={(col) =>
                                "IDR " +
                                parseInt(col.mitrafee).toLocaleString(
                                  "id-ID",
                                  {}
                                )
                              }
                            />
                            <ExcelColumn
                              label="Pendapatan Perusahaan"
                              value={(col) =>
                                "IDR " +
                                parseInt(col.compfee).toLocaleString(
                                  "id-ID",
                                  {}
                                )
                              }
                            />
                            <ExcelColumn label="Bank" value="bank_name" />
                            <ExcelColumn
                              label="No. Rekening"
                              value="bank_norek"
                            />
                            <ExcelColumn
                              label="Atas Nama"
                              value="bank_account"
                            />
                            <ExcelColumn
                              label="Waktu Pengajuan"
                              value={(col) =>
                                getRefundDateTime(
                                  col.create_at.split("+")[0].split("T")[0],
                                  col.create_at.split("+")[0].split("T")[1],
                                  true
                                )
                              }
                            />
                            <ExcelColumn
                              label="Status"
                              value={(col) =>
                                col.status === "W"
                                  ? "Menunggu"
                                  : col.status === "P"
                                  ? "Sedang Diproses"
                                  : col.status === "Y"
                                  ? "Selesai"
                                  : ""
                              }
                            />
                          </ExcelSheet>
                          {/* If you want to add sheet just copy ExcelSheet */}
                        </ExcelFile>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getRefundData?.length > 0 ? (
                      getRefundData?.map((pr, index) => (
                        <TableRow
                          key={`payment-refund-${pr.sid}`}
                          {...pr}
                          num={index + 1}
                        />
                      ))
                    ) : (
                      <tr className="text-center">
                        <td colspan={9}>{getMessageEmptyData}</td>
                      </tr>
                    )}
                  </tbody>
                </>
              }
            />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
