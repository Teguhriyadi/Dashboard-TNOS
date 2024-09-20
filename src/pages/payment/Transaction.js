import React, { useState, useEffect } from "react";
import ReactExport from "react-export-excel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Card,
  Row,
  Button,
  Form,
  InputGroup,
  Badge,
  Tooltip,
  OverlayTrigger,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { TnosDataTable } from "../../components/TnosDataTable";
import Preloader from "../../components/Preloader";

export default () => {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [getTransactionData, setTransactionData] = useState();
  const [getAllTransactionData, setAllTransactionData] = useState();
  const [getAllStatusTransactionData, setAllStatusTransactionData] = useState();
  const [getCaptureData, setCaptureData] = useState();
  const [getSettlementData, setSettlementData] = useState();
  const [getPendingData, setPendingData] = useState();
  const [getDenyData, setDenyData] = useState();
  const [getCancelData, setCancelData] = useState();
  const [getExpireData, setExpireData] = useState();
  const [getRefundData, setRefundData] = useState();
  const [getPartialRefundData, setPartialRefundData] = useState();
  const [getTotalAmountToday, setTotalAmountToday] = useState();
  const [getTotalAmountBetween, setTotalAmountBetween] = useState();
  const [getMessageEmptyData, setMessageEmptyData] = useState(
    "Belum ada transaksi pada hari ini"
  );
  const [getActiveStatus, setActiveStatus] = useState("all_status");

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

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const humanizeText = (str) => {
    var i,
      frags = str.split("_");
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  };

  const TableRow = (props) => {
    const {
      order_id,
      order_id_master,
      order_status,
      payment_type,
      currency,
      gross_amount,
      invoice_price,
      cut_price,
      transaction_time,
      transaction_status,
    } = props;

    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const formatTransactionTime = (transactionTime) => {
      const date = new Date(transactionTime);
      const day = String(date.getDate()).padStart(2, '0');
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${hours}:${minutes}:${seconds} - ${day} / ${month} / ${year}`;
    };

    return (
      <tr>
        <td>{props.num}</td>
        <td>{order_id}</td>
        <td className="text-center">
          <Badge
            bg={
              transaction_status === "capture"
                ? "soft-green"
                : transaction_status === "settlement"
                  ? "soft-green"
                  : transaction_status === "pending"
                    ? "secondary"
                    : transaction_status === "deny"
                      ? "danger"
                      : transaction_status === "cancel"
                        ? "danger"
                        : transaction_status === "expire"
                          ? "danger"
                          : transaction_status === "refund"
                            ? "blue"
                            : transaction_status === "partial_refund"
                              ? "blue"
                              : transaction_status === "SUCCEEDED"
                                ? "soft-green" : transaction_status === "CAPTURED" ? "success"
                                  : transaction_status === "SETTLED" ? "soft-green"
                                    : ""
            }
            className="badge-lg"
          >
            {transaction_status === "capture"
              ? "Capture"
              : transaction_status === "settlement"
                ? "Settlement"
                : transaction_status === "pending"
                  ? "Pending"
                  : transaction_status === "deny"
                    ? "Deny"
                    : transaction_status === "cancel"
                      ? "Cancel"
                      : transaction_status === "expire"
                        ? "Expire"
                        : transaction_status === "refund"
                          ? "Refund"
                          : transaction_status === "partial_refund"
                            ? "Partial Refund"
                            : transaction_status === "SUCCEEDED" ? "Succeeded"
                              : transaction_status === "CAPTURED" ? "Captured"
                                : transaction_status === "SETTLED" ? "Settled"
                                  : ""}
          </Badge>
        </td>
        <td>{humanizeText(payment_type)}</td>
        <td>
          {currency + " " + parseInt(gross_amount).toLocaleString("id-ID", {})}
        </td>
        <td>
          {order_status.status === "Selesai" ||
            order_status.status === "Dibatalkan" ||
            order_status.status === "Penugasan" ||
            order_status.status === "Sedang Berlangsung"
            ? currency +
            " " +
            parseInt(invoice_price).toLocaleString("id-ID", {})
            : "Tidak Ada"}
        </td>
        <td>
          {currency + " " + parseInt(cut_price).toLocaleString("id-ID", {})}
        </td>
        <td>{formatTransactionTime(transaction_time)}</td>
        <td className="text-center">
          {order_status.status === "Selesai" ||
            order_status.status === "Dibatalkan" ||
            order_status.status === "Penugasan" ||
            order_status.status === "Sedang Berlangsung" ? (
            <OverlayTrigger
              trigger={["hover", "focus"]}
              overlay={<Tooltip>Cek Pesanan</Tooltip>}
            >
              <Link
                to={`/order/on-progress/detail`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge
                  bg={order_status.status_color}
                  className="badge-lg"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    localStorage.setItem("orderIdMaster", order_id_master);
                  }}
                >
                  {order_status.status}
                </Badge>
              </Link>
            </OverlayTrigger>
          ) : (
            <Badge bg={order_status.status_color} className="badge-lg">
              {order_status.status}
            </Badge>
          )}
        </td>
        <td className="text-center">
          <Link
            to={`/payment/transaction/detail`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="sm"
              className="text-white"
              onClick={() => {
                localStorage.setItem("orderId", order_id);
              }}
            >
              <FontAwesomeIcon icon={faThList} />
              &nbsp; Detail
            </Button>
          </Link>
        </td>
      </tr>
    );
  };

  
  const getTodayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const getDataBetweenDate = (datas, startDate, endDate) => {
    return JSON.parse(datas).filter(
      (item) =>
        new Date(item.transaction_time).getTime() >=
        new Date(startDate).getTime() &&
        new Date(item.transaction_time).getTime() <= new Date(endDate).getTime()
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "getStartDateTransaction",
      getTodayDate() + " 00:00:00"
    );
    localStorage.setItem("getEndDateTransaction", getTodayDate() + " 23:59:59");

    const fetchTransactions = async () => {
      try {
        const transactionRes = await fetch(`${process.env.REACT_APP_PORTAL_API_URL}/payment/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const transactionData = await transactionRes.json();
        let transactionApiData = transactionData.data;

        const orderRes = await fetch(`${process.env.REACT_APP_PORTAL_API_URL}/order/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const orderData = await orderRes.json();
        let orderApiData = orderData.data;

        let transactionOrderData = [];
        transactionApiData.forEach((item) => {
          // Check if order_id does not start with "TAB-"
          if (!item.order_id.startsWith("TAB")) {
            transactionOrderData.push({
              ...item,
              order_id_master: JSON.stringify(orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)) !== "[]" &&
                orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].id,
              order_status: JSON.stringify(orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)) === "[]" ?
                { status: "Tidak Ada", status_color: "gray" } :
                orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].status === 1 ?
                  { status: "Menerima Pesanan", status_color: "primary" } :
                  orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].status === 2 ?
                    { status: "Dalam Perjalanan", status_color: "primary" } :
                    orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].status === 3 ?
                      { status: "Hadir dan Sedang Bertugas", status_color: "primary" } :
                      orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].status === 990 ?
                        { status: "Sedang Berlangsung", status_color: "blue" } :
                        orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].status === 999 ?
                          { status: "Selesai", status_color: "success" } :
                          orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].status === 1001 ?
                            { status: "Dibatalkan", status_color: "danger" } :
                            { status: "Tidak Ada", status_color: "gray" },
              invoice_price: JSON.stringify(orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)) !== "[]" &&
                orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].price,
              mitrafee: JSON.stringify(orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)) !== "[]" ?
                orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].mitraprice : 0,
              tnosfee: JSON.stringify(orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)) !== "[]" ?
                orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].tnosfee : 0,
              cut_price: JSON.stringify(orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)) !== "[]" ?
                orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].alasan_batal === "assLbl55" ?
                  (10 / 100) * orderApiData.filter((itemOrder) => itemOrder.sid === item.order_id)[0].price : 0 : 0,
            });
          }
        });

        setAllTransactionData(transactionOrderData);

        const todayTransaction = getDataBetweenDate(
          JSON.stringify(transactionOrderData),
          getTodayDate() + "T00:00:00",
          getTodayDate() + "T23:59:59"
        );
        let totalAmountToday = 0;

        todayTransaction
          .sort(
            (a, b) =>
              new Date(b.transaction_time) - new Date(a.transaction_time)
          )
          .forEach((item) => {
            totalAmountToday =
              totalAmountToday + parseInt(item.gross_amount);
          });

        setTransactionData(todayTransaction);
        setAllStatusTransactionData(todayTransaction);
        setCaptureData(
          todayTransaction.filter(
            (item) => item.transaction_status === "capture"
          )
        );
        setSettlementData(
          todayTransaction.filter(
            (item) => item.transaction_status === "settlement"
          )
        );
        setPendingData(
          todayTransaction.filter(
            (item) => item.transaction_status === "pending"
          )
        );
        setDenyData(
          todayTransaction.filter(
            (item) => item.transaction_status === "deny"
          )
        );
        setCancelData(
          todayTransaction.filter(
            (item) => item.transaction_status === "cancel"
          )
        );
        setExpireData(
          todayTransaction.filter(
            (item) => item.transaction_status === "expire"
          )
        );
        setRefundData(
          todayTransaction.filter(
            (item) => item.transaction_status === "refund"
          )
        );
        setPartialRefundData(
          todayTransaction.filter(
            (item) => item.transaction_status === "partial_refund"
          )
        );
        setTotalAmountToday(totalAmountToday.toLocaleString("id-ID", {}));
      } catch (err) {
        console.log(err);
      }
    };

    fetchTransactions();
  }, []);


  const updateTransactionDate = (e) => {
    e.preventDefault();

    setActiveStatus("all_status");
    const formData = new FormData(e.target);
    const splitDate = (date) => {
      let str = date.split("");
      str[10] = " ";
      str = str.join("");
      return str;
    };
    localStorage.setItem(
      "getStartDateTransaction",
      splitDate(formData.get("start_date_time"))
    );
    localStorage.setItem(
      "getEndDateTransaction",
      splitDate(formData.get("end_date_time"))
    );
    let getUpdatedTransactionData = getAllTransactionData
      .sort(
        (a, b) => new Date(b.transaction_time) - new Date(a.transaction_time)
      )
      .filter(
        (item) =>
          new Date(item.transaction_time).getTime() >=
          new Date(formData.get("start_date_time")).getTime() &&
          new Date(item.transaction_time).getTime() <=
          new Date(formData.get("end_date_time")).getTime()
      );
    setTransactionData(getUpdatedTransactionData);
    setAllStatusTransactionData(getUpdatedTransactionData);
    setCaptureData(
      getUpdatedTransactionData.filter(
        (item) => item.transaction_status === "capture"
      )
    );
    setSettlementData(
      getUpdatedTransactionData.filter(
        (item) => item.transaction_status === "settlement"
      )
    );
    setPendingData(
      getUpdatedTransactionData.filter(
        (item) => item.transaction_status === "pending"
      )
    );
    setDenyData(
      getUpdatedTransactionData.filter(
        (item) => item.transaction_status === "deny"
      )
    );
    setCancelData(
      getUpdatedTransactionData.filter(
        (item) => item.transaction_status === "cancel"
      )
    );
    setExpireData(
      getUpdatedTransactionData.filter(
        (item) => item.transaction_status === "expire"
      )
    );
    setRefundData(
      getUpdatedTransactionData.filter(
        (item) => item.transaction_status === "refund"
      )
    );
    setPartialRefundData(
      getUpdatedTransactionData.filter(
        (item) => item.transaction_status === "partial_refund"
      )
    );
    let totalAmountBetween = 0;
    getAllTransactionData
      .filter(
        (item) =>
          new Date(item.transaction_time).getTime() >=
          new Date(formData.get("start_date_time")).getTime() &&
          new Date(item.transaction_time).getTime() <=
          new Date(formData.get("end_date_time")).getTime()
      )
      .forEach((item) => {
        totalAmountBetween = totalAmountBetween + parseInt(item.gross_amount);
      });
    getAllTransactionData.filter(
      (item) =>
        new Date(item.transaction_time).getTime() >=
        new Date(formData.get("start_date_time")).getTime() &&
        new Date(item.transaction_time).getTime() <=
        new Date(formData.get("end_date_time")).getTime()
    ).length === 0 &&
      setMessageEmptyData("Tidak ada transaksi diantara tanggal ini");
    setTotalAmountBetween(totalAmountBetween.toLocaleString("id-ID", {}));
  };
  return (
    <>
      <Preloader show={!getTotalAmountToday ? true : false} />
      <Col xl={12} className="mt-2">
        <Card border="light">
          <Card.Body>
            <Form method="POST" onSubmit={updateTransactionDate}>
              <Row className="mb-3">
                <Col md={8}>
                  <Form.Label>Tanggal Transaksi</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      name="start_date_time"
                      step="1"
                      defaultValue={getTodayDate() + "T00:00:00"}
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
                <Col>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control
                    className="btn btn-primary"
                    type="submit"
                    name="btn_search_transaction"
                    value="Cari Transaksi"
                  />
                </Col>
              </Row>
            </Form>
            <TnosDataTable
              title={[
                {
                  variant: "blue",
                  status: "Semua Status",
                  value: "all_status",
                  length: getAllStatusTransactionData?.length,
                },
                {
                  variant: "soft-green",
                  status: "Capture",
                  value: "capture",
                  length: getCaptureData?.length,
                },
                {
                  variant: "soft-green",
                  status: "Settlement",
                  value: "settlement",
                  length: getSettlementData?.length,
                },
                {
                  variant: "secondary",
                  status: "Pending",
                  value: "pending",
                  length: getPendingData?.length,
                },
                {
                  variant: "danger",
                  status: "Deny",
                  value: "deny",
                  length: getDenyData?.length,
                },
                {
                  variant: "danger",
                  status: "Cancel",
                  value: "cancel",
                  length: getCancelData?.length,
                },
                {
                  variant: "danger",
                  status: "Expire",
                  value: "expire",
                  length: getExpireData?.length,
                },
                {
                  variant: "blue",
                  status: "Refund",
                  value: "refund",
                  length: getRefundData?.length,
                },
                {
                  variant: "blue",
                  status: "Partial Refund",
                  value: "partial_refund",
                  length: getPartialRefundData?.length,
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
                      localStorage.setItem(
                        "activeTransactionStatus",
                        item.value
                      );
                      setTransactionData(
                        item.value === "capture"
                          ? getCaptureData
                          : item.value === "settlement"
                            ? getSettlementData
                            : item.value === "pending"
                              ? getPendingData
                              : item.value === "deny"
                                ? getDenyData
                                : item.value === "cancel"
                                  ? getCancelData
                                  : item.value === "expire"
                                    ? getExpireData
                                    : item.value === "refund"
                                      ? getRefundData
                                      : item.value === "partial_refund"
                                        ? getPartialRefundData
                                        : getAllStatusTransactionData
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
                localStorage.getItem("getStartDateTransaction") !==
                  getTodayDate() + " 00:00:00" ||
                  localStorage.getItem("getEndDateTransaction") !==
                  getTodayDate() + " 23:59:59"
                  ? `Total transaksi ( ${localStorage.getItem(
                    "getStartDateTransaction"
                  )} - ${localStorage.getItem(
                    "getEndDateTransaction"
                  )} ) : IDR ${getTotalAmountBetween}`
                  : `Total transaksi hari ini : IDR ${getTotalAmountToday}`
              }
              data={
                <>
                  <thead className="thead-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <tr>
                      <th className="border-0">No.</th>
                      <th className="border-0">Id Pemesanan</th>
                      <th className="border-0">Status Transaksi</th>
                      <th className="border-0">Tipe Pembayaran</th>
                      <th className="border-0">Jumlah</th>
                      <th className="border-0">Harga Invoice</th>
                      <th className="border-0">Biaya Pembatalan</th>
                      <th className="border-0">Waktu Transaksi</th>
                      <th className="border-0">Status Pemesanan</th>
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
                          filename={`transaction_${getActiveStatus}_( ${localStorage.getItem(
                            "getStartDateTransaction"
                          )} - ${localStorage.getItem(
                            "getEndDateTransaction"
                          )} )`}
                        >
                          <ExcelSheet
                            data={getTransactionData}
                            name="Data Transaksi"
                          >
                            <ExcelColumn
                              label="ID Pemesanan"
                              value="order_id"
                            />
                            <ExcelColumn
                              label="Status Pemesanan"
                              value={(col) => col.order_status.status}
                            />
                            <ExcelColumn
                              label="Tipe Pembayaran"
                              value={(col) => humanizeText(col.payment_type)}
                            />
                            <ExcelColumn
                              label="Jumlah"
                              value={(col) =>
                                col.currency +
                                " " +
                                parseInt(col.gross_amount).toLocaleString(
                                  "id-ID",
                                  {}
                                )
                              }
                            />
                            <ExcelColumn
                              label="Harga Invoice"
                              value={(col) =>
                                col.order_status.status === "Selesai" ||
                                  col.order_status.status === "Dibatalkan" ||
                                  col.order_status.status === "Penugasan" ||
                                  col.order_status.status === "Sedang Berlangsung"
                                  ? col.currency +
                                  " " +
                                  parseInt(col.invoice_price).toLocaleString(
                                    "id-ID",
                                    {}
                                  )
                                  : "Tidak Ada"
                              }
                            />
                            <ExcelColumn
                              label="Biaya Pembatalan"
                              value={(col) =>
                                col.currency +
                                " " +
                                parseInt(col.cut_price).toLocaleString(
                                  "id-ID",
                                  {}
                                )
                              }
                            />
                            <ExcelColumn
                              label="Pendapatan Mitra"
                              value={(col) =>
                                col.currency +
                                " " +
                                parseInt(col.mitrafee).toLocaleString(
                                  "id-ID",
                                  {}
                                )
                              }
                            />
                            <ExcelColumn
                              label="Pendapatan Perusahaan"
                              value={(col) =>
                                col.currency +
                                " " +
                                parseInt(col.tnosfee).toLocaleString(
                                  "id-ID",
                                  {}
                                )
                              }
                            />
                            <ExcelColumn
                              label="Waktu Transaksi"
                              value="transaction_time"
                            />
                            <ExcelColumn
                              label="Status Transaksi"
                              value={(col) =>
                                col.transaction_status === "capture"
                                  ? "Capture"
                                  : col.transaction_status === "settlement"
                                    ? "Settlement"
                                    : col.transaction_status === "pending"
                                      ? "Pending"
                                      : col.transaction_status === "deny"
                                        ? "Deny"
                                        : col.transaction_status === "cancel"
                                          ? "Cancel"
                                          : col.transaction_status === "expire"
                                            ? "Expire"
                                            : col.transaction_status === "refund"
                                              ? "Refund"
                                              : col.transaction_status === "partial_refund"
                                                ? "Partial Refund"
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
                    {getTransactionData?.length > 0 ? (
                      getTransactionData?.map((td, index) => (
                        <TableRow
                          key={`page-traffic-${td.order_id}`}
                          {...td}
                          num={index + 1}
                        />
                      ))
                    ) : (
                      <tr className="text-center">
                        <td colspan={6}>{getMessageEmptyData}</td>
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
