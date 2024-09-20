import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThList,
  faInfoCircle,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
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
import Swal from "sweetalert2";

export default () => {
  const [getOrderData, setOrderData] = useState();
  const [getAllOrderData, setAllOrderData] = useState();
  const [getTotalAmountToday, setTotalAmountToday] = useState();
  const [getTotalAmountBetween, setTotalAmountBetween] = useState();
  const [getMessageEmptyData, setMessageEmptyData] = useState(
    "Belum ada pemesanan pada hari ini"
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

  const [orderStatus, setOrderStatus] = useState("");

  const orderStatusRules = {
    2: [3],
    3: [4],
    4: [5],
    5: [6],
    6: [7],
    7: [8],
    8: [9],
    9: [10],
  };

  const handleOrderStatusChange = (id) => (event) => {
    const selectedOrderStatus = event.target.value;
    const selectedOrderStatusData = getOrderStatusArr.find(
      (status) => status.value === parseInt(selectedOrderStatus)
    );

    Swal.fire({
      title: "Konfirmasi",
      html: `<p>Apakah anda yakin ingin mengubah status menjadi <br> <strong>${selectedOrderStatusData.defaultValue}</strong> ?</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(
            `${process.env.REACT_APP_API_PWA_TNOSWORLD_URL}/pemesanan/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status_order: selectedOrderStatusData.us,
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.status == true) {
                Swal.fire("Success!", data.message, "success");
                setOrderStatus(selectedOrderStatus);
              }
            })
            .catch((err) => {
              Swal.fire("Error!", err, "error");
            });
        }
      })
      .catch((error) => {
        Swal.fire("Error!", error, "error");
      });
  };

  const showButton = (id) => {

    const url = `${window.location.href}/${id}/form`;

    Swal.fire({
      title: "Silahkan Copy Link Dibawah Ini",
      html: `<strong>${url}</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire("success", "Berhasil Copy Link", "success");
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const TableRow = (props) => {
    const {
      id,
      tnos_invoice_id,
      external_id,
      paid_at,
      order_total,
      user_id,
      name,
      partner_name,
      service_datas,
      order_status_datas,
    } = props;

    return (
      <tr className="text-center">
        <td>{props.num}</td>
        <td>
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
                      getAllOrderData.filter((item) => item.id === id)[0]
                    )
                  );
                }}
              >
                {tnos_invoice_id}
              </span>
            </Link>
          )}
        </td>
        <td>{external_id}</td>
        <td>{ReadableDateTime(paid_at)}</td>
        <td>
          <Form.Select
            value={orderStatus}
            size="sm"
            onChange={handleOrderStatusChange(id)}
            style={{ width: "250px" }}
          >
            <option value="">- Pilih -</option>
            {getOrderStatusArr.map((status) => (
              <option
                key={status.key}
                value={status.value}
                disabled={
                  !orderStatusRules[orderStatus]?.includes(status.value)
                }
                style={
                  orderStatusRules[orderStatus]?.includes(status.value)
                    ? {
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "green",
                    }
                    : { color: "grey" }
                }
              >
                {status.defaultValue}
              </option>
            ))}
          </Form.Select>
          {/* <Badge bg={order_status_datas.color} className="badge-lg">
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
          </Badge> */}
        </td>
        <td>{service_datas.name}</td>
        <td>
          <a
            href={"/member/profile/" + user_id}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </td>
        <td>{partner_name == null ? "-" : partner_name}</td>
        <td>{"IDR " + parseInt(order_total).toLocaleString("id-ID", {})}</td>
        <td>
          <Link
            to={`/pwa-b2b/order/detail`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="sm"
              className="text-white"
              onClick={() => {
                localStorage.setItem(
                  "pwaB2bOrderDataById",
                  JSON.stringify(
                    getAllOrderData.filter((item) => item.id === id)[0]
                  )
                );
              }}
            >
              <FontAwesomeIcon icon={faThList} />
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            className="text-white"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              showButton(id)
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </td>
      </tr>
    );
  };

  const getDataBetweenDate = (datas, startDate, endDate) => {
    return DateBetweenFilter(datas, "created_at", startDate, endDate);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_PWA_TNOSWORLD_URL}/order?type=pemesanan`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "getStartDatePwaB2bOrder",
          TodayDate() + " 00:00:00"
        );
        localStorage.setItem(
          "getEndDatePwaB2bOrder",
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
          let data = getOrderStatusArr.find((item) => item.us === us);
          return data ? data.value : "";
        };

        setOrderStatus(getOrderStatus(data.detail[0].status_order));

        const getPaymentStatus = (us, type) => {
          let data = getPaymentStatusArr.filter((item) => {
            return item.us === us;
          });

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

        setOrderData(todayOrder);
        setAllOrderData(datas);
        setTotalAmountToday(totalAmountToday.toLocaleString("id-ID", {}));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateOrderData = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const splitDate = (date) => {
      let str = date.split("");
      str[10] = " ";
      str = str.join("");
      return str;
    };
    localStorage.setItem(
      "getStartDatePwaB2bOrder",
      splitDate(formData.get("start_date_time"))
    );
    localStorage.setItem(
      "getEndDatePwaB2bOrder",
      splitDate(formData.get("end_date_time"))
    );

    let sortOrderData = getAllOrderData.sort(
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

    sortOrderData =
      formData.get("service_type") !== "0"
        ? sortOrderData.filter(
          (item) =>
            item.service_datas.id === parseInt(formData.get("service_type"))
        )
        : sortOrderData;

    sortOrderData =
      formData.get("order_status") !== "0"
        ? sortOrderData.filter(
          (item) =>
            item.order_status_datas.id ===
            parseInt(formData.get("order_status"))
        )
        : sortOrderData;

    let dataBetween = getDataBetweenDate(
      sortOrderData,
      formData.get("start_date_time"),
      formData.get("end_date_time")
    );
    setOrderData(dataBetween);
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
          <Card.Body style={{ height: "850px" }}>
            <Form method="POST" onSubmit={updateOrderData}>
              <Row className="mb-3">
                <Col md={4}>
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
                <Col md={2}>
                  <Form.Group id="order_status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="order_status" required>
                      {getPaymentStatusArr?.map((item) => (
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
                    value="Cari Pemesanan"
                  />
                </Col>
              </Row>
            </Form>
            <TnosDataTable
              title={`Total pemesanan hari ini : IDR ${getTotalAmountToday}`}
              subtitle={
                localStorage.getItem("getStartDatePwaB2bOrder") ===
                  TodayDate() + " 00:00:00" &&
                  localStorage.getItem("getEndDatePwaB2bOrder") ===
                  TodayDate() + " 23:59:59"
                  ? ""
                  : `Total pemesanan ( ${localStorage.getItem(
                    "getStartDatePwaB2bOrder"
                  )} - ${localStorage.getItem(
                    "getEndDatePwaB2bOrder"
                  )} ) : IDR ${getTotalAmountBetween}`
              }
              getExportData={getOrderData}
              getMenu={`pwa-b2b-order`}
              data={
                <>
                  <thead className="thead-light text-center" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <tr>
                      <th className="border-0 text-center">No.</th>
                      <th className="border-0 text-center">No. Invoice</th>
                      <th className="border-0 text-center">ID Referensi</th>
                      <th className="border-0">Waktu Transaksi</th>
                      <th className="border-0">Status Pemesanan</th>
                      <th className="border-0">Layanan</th>
                      <th className="border-0">Member</th>
                      <th className="border-0">Partner</th>
                      <th className="border-0">Jumlah</th>
                      <th className="border-0">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOrderData?.length > 0 ? (
                      getOrderData?.map((td, index) => (
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
