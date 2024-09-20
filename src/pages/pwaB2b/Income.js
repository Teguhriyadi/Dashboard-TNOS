import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThList, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Card,
  Row,
  Button,
  Form,
  InputGroup,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "@themesberg/react-bootstrap";
import Preloader from "../../components/Preloader";
import { Link } from "react-router-dom";
import { TnosDataTable } from "../../components/TnosDataTable";
import TodayDate from "../../components/TodayDate";
import DateBetweenFilter from "../../components/DateBetweenFilter";
import ReadableDateTime from "../../components/ReadableDateTime";

export default () => {
  const [getIncomeData, setIncomeData] = useState();
  const [getAllIncomeData, setAllIncomeData] = useState();
  const [getTotalAmountToday, setTotalAmountToday] = useState();
  const [getTotalAmountBetween, setTotalAmountBetween] = useState();
  const [getMessageEmptyData, setMessageEmptyData] = useState(
    "Belum ada pendapatan pada hari ini"
  );

  const [getServiceTypeArr] = useState([
    {
      key: "service_type_0",
      value: 0,
      defaultValue: "Semua Layanan",
      tnos_service_id: 0,
      tnos_subservice_id: 0,
    },
    {
      key: "service_type_1",
      value: 1,
      defaultValue: "Pengamanan Usaha & Bisnis",
      tnos_service_id: 2,
      tnos_subservice_id: 2,
    },
    {
      key: "service_type_2",
      value: 2,
      defaultValue: "Badan Hukum PT",
      tnos_service_id: 3,
      tnos_subservice_id: 1,
    },
    {
      key: "service_type_3",
      value: 3,
      defaultValue: "Badan Usaha CV",
      tnos_service_id: 3,
      tnos_subservice_id: 2,
    },
    {
      key: "service_type_4",
      value: 4,
      defaultValue: "Yayasan",
      tnos_service_id: 3,
      tnos_subservice_id: 3,
    },
    {
      key: "service_type_5",
      value: 5,
      defaultValue: "Perkumpulan",
      tnos_service_id: 3,
      tnos_subservice_id: 4,
    },
    {
      key: "service_type_6",
      value: 6,
      defaultValue: "Asosiasi",
      tnos_service_id: 3,
      tnos_subservice_id: 5,
    },
    {
      key: "service_type_7",
      value: 7,
      defaultValue: "Legalitas Lainnya",
      tnos_service_id: 3,
      tnos_subservice_id: 6,
    },
    {
      key: "service_type_8",
      value: 8,
      defaultValue: "Komprehensif Solusi Hukum",
      tnos_service_id: 3,
      tnos_subservice_id: 7,
    },
    {
      key: "service_type_9",
      value: 9,
      defaultValue: "Pembayaran Lainnya",
      tnos_service_id: 3,
      tnos_subservice_id: 8,
    },
    {
      key: "service_type_10",
      value: 10,
      defaultValue: "PAS",
      tnos_service_id: 4,
      tnos_subservice_id: 1,
    },
    {
      key: "service_type_11",
      value: 11,
      defaultValue: "TRIGER",
      tnos_service_id: 5,
      tnos_subservice_id: 1,
    },
  ]);

  const [getOrderStatusArr] = useState([
    {
      key: "order_status_0",
      value: 0,
      defaultValue: "Semua Status",
      us: "All Status",
      desc: "Menampilkan Semua Status Pemesanan",
      color: "",
    },
    {
      key: "order_status_1",
      value: 1,
      defaultValue: "Menunggu",
      us: "001",
      desc: "Menunggu pembayaran dari customer",
      color: "primary",
    },
    {
      key: "order_status_2",
      value: 2,
      defaultValue: "Order diproses",
      us: "002",
      desc: "Admin sedang memproses order",
      color: "primary",
    },
    {
      key: "order_status_3",
      value: 3,
      defaultValue: "Siap Bertugas",
      us: "003",
      desc: "Mitra telah tersedia",
      color: "primary",
    },
    {
      key: "order_status_4",
      value: 4,
      defaultValue: "Menuju Lokasi",
      us: "004",
      desc: "Mitra sedang menuju lokasi",
      color: "primary",
    },
    {
      key: "order_status_5",
      value: 5,
      defaultValue: "Hadir dan Sedang Bertugas",
      us: "005",
      desc: "Mitra telah hadir di lokasi",
      color: "primary",
    },
    {
      key: "order_status_6",
      value: 6,
      defaultValue: "Proses Pembuatan Akta",
      us: "006",
      desc: "Sedang Proses Pembuatan Akta",
      color: "primary",
    },
    {
      key: "order_status_7",
      value: 7,
      defaultValue: "Proses SK MENKUMHAM",
      us: "007",
      desc: "Sedang Proses Pembuatan SK MENKUMHAM",
      color: "primary",
    },
    {
      key: "order_status_8",
      value: 8,
      defaultValue: "Proses NPWP",
      us: "008",
      desc: "Sedang Proses Pembuatan NPWP",
      color: "primary",
    },
    {
      key: "order_status_9",
      value: 9,
      defaultValue: "Proses NIB",
      us: "009",
      desc: "Sedang Proses Pembuatan NIB",
      color: "primary",
    },
    {
      key: "order_status_10",
      value: 10,
      defaultValue: "Selesai",
      us: "010",
      desc: "Hardcopy telah diterima oleh Klien",
      color: "primary",
    },
    {
      key: "order_status_11",
      value: 11,
      defaultValue: "Gagal",
      us: "011",
      desc: "Gagal",
      color: "danger",
    },
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
      defaultValue: "Memesan",
      us: "ORDER",
      desc: "Memesan tapi belum masuk ke menu pembayaran",
      color: "primary",
    },
    {
      key: "payment_status_2",
      value: 2,
      defaultValue: "Belum Dibayar",
      us: "UNPAID",
      desc: "Tautan pembayaran sudah berhasil dibuat dan dapat dibayarkan oleh Pelanggan Anda sampai tanggal kedaluwarsa yang Anda tentukan",
      color: "danger",
    },
    {
      key: "payment_status_3",
      value: 3,
      defaultValue: "Sudah Dibayar",
      us: "PAID",
      desc: "Tautan pembayaran sudah berhasil dibayarkan oleh pelanggan Anda",
      color: "success",
    },
    {
      key: "payment_status_4",
      value: 4,
      defaultValue: "Selesai",
      us: "SETTLED",
      desc: "Dana sudah berhasil diteruskan ke akun Xendit Anda dan dapat ditarik melalui tab Saldo",
      color: "success",
    },
    {
      key: "payment_status_5",
      value: 5,
      defaultValue: "Kadaluarsa",
      us: "EXPIRED",
      desc: "Pembayaran Kadaluarsa",
      color: "danger",
    },
  ]);

  const TableRow = (props) => {
    const {
      id,
      tnos_invoice_id,
      invoice_id,
      paid_at,
      service_datas,
      pendapatan_tnos,
      order_status_datas,
    } = props;

    return (
      <tr className="text-center">
        <td className="text-center">{props.num}</td>
        <td className="text-center">
          {!tnos_invoice_id ? (
            <Badge bg="primary" className="badge-lg">
              Menunggu Konfirmasi &nbsp;
              <OverlayTrigger
                trigger={["hover", "focus"]}
                overlay={
                  <Tooltip>
                    No. Invoice akan muncul setelah pemesanan dikonfirmasi
                  </Tooltip>
                }
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ cursor: "pointer" }}
                />
              </OverlayTrigger>
            </Badge>
          ) : (
            <Link
              to={`/pwa-b2b/order/detail`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                onClick={() => {
                  localStorage.setItem(
                    "pwaB2bOrderDataById",
                    JSON.stringify(
                      getAllIncomeData.filter((item) => item.id === id)[0]
                    )
                  );
                }}
              >
                {tnos_invoice_id}
              </span>
            </Link>
          )}
        </td>
        <td className="text-center">
          {!invoice_id ? (
            <Badge bg="primary" className="badge-lg">
              Menunggu Pembayaran &nbsp;
              <OverlayTrigger
                trigger={["hover", "focus"]}
                overlay={
                  <Tooltip>
                    Id transaksi akan muncul setelah pembayaran selesai
                  </Tooltip>
                }
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ cursor: "pointer" }}
                />
              </OverlayTrigger>
            </Badge>
          ) : (
            <Link
              to={`/pwa-b2b/transaction/detail`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                onClick={() => {
                  localStorage.setItem(
                    "pwaB2bIncomeDataById",
                    JSON.stringify(
                      getAllIncomeData.filter((item) => item.id === id)[0]
                    )
                  );
                }}
              >
                {invoice_id}
              </span>
            </Link>
          )}
        </td>
        <td className="text-center">{ReadableDateTime(paid_at)}</td>
        <td className="text-center">
          <Badge bg={order_status_datas.color} className="badge-lg">
            {order_status_datas.name}
            &nbsp;
            <OverlayTrigger
              trigger={["hover", "focus"]}
              overlay={<Tooltip>{order_status_datas.desc}</Tooltip>}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ cursor: "pointer" }}
              />
            </OverlayTrigger>
          </Badge>
        </td>
        <td className="text-center">{service_datas.name}</td>
        <td>
          {"IDR " + parseInt(pendapatan_tnos).toLocaleString("id-ID", {})}
        </td>
        <td>
          <Link
            to={`/pwa-b2b/transaction/detail`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="sm"
              className="text-white"
              onClick={() => {
                localStorage.setItem(
                  "pwaB2bIncomeDataById",
                  JSON.stringify(
                    getAllIncomeData.filter((item) => item.id === id)[0]
                  )
                );
              }}
            >
              <FontAwesomeIcon icon={faThList} />
            </Button>
          </Link>
        </td>
        {/* <td>
          <Link
            to={`/pwa-b2b/transaction/export-pdf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="sm"
              className="text-white"
              onClick={() => {
                localStorage.setItem(
                  "pwaB2bExportIncomeDataById",
                  JSON.stringify(
                    getAllIncomeData.filter((item) => item.id === id)[0]
                  )
                );
              }}
            >
              <FontAwesomeIcon icon={faPrint} />
            </Button>
          </Link>
        </td> */}
      </tr>
    );
  };

  const getDataBetweenDate = (datas, startDate, endDate) => {
    return DateBetweenFilter(datas, "created_at", startDate, endDate);
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_PWA_TNOSWORLD_URL}/order?type=pendapatan`
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "getStartDatePwaB2bIncome",
          TodayDate() + " 00:00:00"
        );
        localStorage.setItem(
          "getEndDatePwaB2bIncome",
          TodayDate() + " 23:59:59"
        );

        const getServiceType = (serviceId, subServiceId) => {
          let data = getServiceTypeArr.filter(
            (item) =>
              item.tnos_service_id === parseInt(serviceId) &&
              item.tnos_subservice_id === parseInt(subServiceId)
          );
          return {
            id: data[0].value,
            name: data[0].defaultValue,
          };
        };
        const getOrderStatus = (us) => {
          let data = getOrderStatusArr.filter((item) => {
            return item.us === us;
          });
          return {
            id: data[0].value,
            name: data[0].defaultValue,
            desc: data[0].desc,
            color: data[0].color,
          };
        };
        const getPaymentStatus = (us, type) => {
          let data = getPaymentStatusArr.filter((item) => {
            return item.us === us;
          });
          // let data = getPaymentStatusArr.filter((item) => item.us === us);
          return {
            id: data[0].value,
            name: data[0].defaultValue,
            desc: data[0].desc,
            color: data[0].color,
          };
        };

        let datas = data.detail.map((item) => {
          return {
            ...item,
            service_datas: getServiceType(
              item.tnos_service_id,
              item.tnos_subservice_id
            ),
            order_status_datas: getOrderStatus(item.status_order),
            payment_status_datas: getPaymentStatus(item.payment_status),
          };
        });

        // Filter untuk data Selesai
        // datas = datas.filter((item) => item.order_status_datas.id === 4);

        let totalAmountToday = 0;
        const todayOrder = getDataBetweenDate(
          datas,
          TodayDate() + "T00:00:00",
          TodayDate() + "T23:59:59"
        ).sort(
          (a, b) =>
            new Date(
              b.created_at.split("T")[0] +
                " " +
                b.created_at.split("T")[1].split(".")[0]
            ) -
            new Date(
              a.created_at.split("T")[0] +
                " " +
                a.created_at.split("T")[1].split(".")[0]
            )
        );

        todayOrder.length === 1
          ? (totalAmountToday = parseInt(todayOrder[0].order_total))
          : todayOrder.forEach((item) => {
              totalAmountToday = totalAmountToday + parseInt(item.order_total);
            });

        setIncomeData(todayOrder);
        setAllIncomeData(datas);
        setTotalAmountToday(totalAmountToday.toLocaleString("id-ID", {}));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateIncomeData = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const splitDate = (date) => {
      let str = date.split("");
      str[10] = " ";
      str = str.join("");
      return str;
    };
    localStorage.setItem(
      "getStartDatePwaB2bIncome",
      splitDate(formData.get("start_date_time"))
    );
    localStorage.setItem(
      "getEndDatePwaB2bIncome",
      splitDate(formData.get("end_date_time"))
    );

    let sortIncomeData = getAllIncomeData.sort(
      (a, b) =>
        new Date(
          b.created_at.split("T")[0] +
            " " +
            b.created_at.split("T")[1].split(".")[0]
        ) -
        new Date(
          a.created_at.split("T")[0] +
            " " +
            a.created_at.split("T")[1].split(".")[0]
        )
    );

    sortIncomeData =
      formData.get("service_type") !== "0"
        ? sortIncomeData.filter(
            (item) =>
              item.service_datas.id === parseInt(formData.get("service_type"))
          )
        : sortIncomeData;

    let dataBetween = getDataBetweenDate(
      sortIncomeData,
      formData.get("start_date_time"),
      formData.get("end_date_time")
    );
    setIncomeData(dataBetween);
    let totalAmountBetween = 0;
    dataBetween.forEach((item) => {
      totalAmountBetween = totalAmountBetween + parseInt(item.order_total);
    });
    dataBetween.length === 0 &&
      setMessageEmptyData("Tidak ada transaksi diantara tanggal ini");
    setTotalAmountBetween(totalAmountBetween.toLocaleString("id-ID", {}));
  };

  return (
    <>
      <Preloader show={!getTotalAmountToday ? true : false} />
      <Col xl={12} className="mt-2">
        <Card border="light">
          <Card.Body>
            <Form method="POST" onSubmit={updateIncomeData}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Tanggal Transaksi</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      name="start_date_time"
                      step="1"
                      defaultValue={TodayDate() + "T00:00:00"}
                      required
                    />
                    <InputGroup.Text>&#x2192;</InputGroup.Text>
                    <Form.Control
                      type="datetime-local"
                      name="end_date_time"
                      step="1"
                      defaultValue={TodayDate() + "T23:59:59"}
                      required
                    />
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Group id="service_type">
                    <Form.Label>Tipe Layanan</Form.Label>
                    <Form.Select name="service_type" required>
                      {getServiceTypeArr?.map((item) => (
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
              title={`Total transaksi hari ini : IDR ${getTotalAmountToday}`}
              subtitle={
                localStorage.getItem("getStartDatePwaB2bIncome") ===
                  TodayDate() + " 00:00:00" &&
                localStorage.getItem("getEndDatePwaB2bIncome") ===
                  TodayDate() + " 23:59:59"
                  ? ""
                  : `Total transaksi ( ${localStorage.getItem(
                      "getStartDatePwaB2bIncome"
                    )} - ${localStorage.getItem(
                      "getEndDatePwaB2bIncome"
                    )} ) : IDR ${getTotalAmountBetween}`
              }
              getExportData={getIncomeData}
              getMenu={`pwa-b2b-income`}
              data={
                <>
                  <thead
                    className="thead-light"
                    style={{ position: "sticky", top: 0, zIndex: 1 }}
                  >
                    <tr>
                      <th className="border-0 text-center">No.</th>
                      <th className="border-0 text-center">No. Invoice</th>
                      <th className="border-0 text-center">ID Transaksi</th>
                      <th className="border-0 text-center">Waktu Transaksi</th>
                      <th className="border-0 text-center">Status Pemesanan</th>
                      <th className="border-0 text-center">Layanan</th>
                      <th className="border-0 text-center">PENDAPATAN</th>
                      <th className="border-0">Detail</th>
                      {/* <th className="border-0">Export PDF</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {getIncomeData?.length > 0 ? (
                      getIncomeData?.map((td, index) => (
                        <TableRow
                          key={`order-success-${td.id}`}
                          {...td}
                          num={index + 1}
                        />
                      ))
                    ) : (
                      <tr className="text-center">
                        <td colspan={8}>{getMessageEmptyData}</td>
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
