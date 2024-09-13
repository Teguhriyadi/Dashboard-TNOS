import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Routes } from "../routes";
// Auth
import Login from "./Login";

//pages dicki

import TnosGemsPembelian from "./tnos-coin/Transaction";
import TnosGemsProduct from "./tnos-coin/Product";
import MarketingMessageBlash from "./information/MessageBlash";

// Pages
import OrderIndex from "./order/Index";
import OrderOnProgress from "./order/OnProgress";
import OrderOnProgressDetail from "./order/OnProgressDetail";
import OrderSuccess from "./order/Success";
import OrderCancel from "./order/Cancel";

import PaymentIndex from "./payment/Index";
import PaymentTransaction from "./payment/Transaction";
import PaymentTransactionDetail from "./payment/TransactionDetail";
import PaymentOnProgress from "./payment/OnProgress";
import PaymentIn from "./payment/In";
import PaymentOut from "./payment/Out";
import PaymentWithdrawal from "./payment/Withdrawal";
import PaymentRefund from "./payment/Refund";

import PartnerIndex from "./partner/Index";
import PartnerGuard from "./partner/Guard";
import PartnerGuardCreate from "./partner/GuardCreate";
import PartnerGuardDetail from "./partner/GuardDetail";
import PartnerGuardUpdate from "./partner/GuardUpdate";
import PartnerGuardProfile from "./partner/GuardProfile";
import PartnerGuardBarcodes from "./partner/GuardBarcodes";
import PartnerLawyer from "./partner/Lawyer";
import PartnerLawyerDetail from "./partner/LawyerDetail";
import PartnerLawyerUpdate from "./partner/LawyerUpdate";
import PartnerLawyerProfile from "./partner/LawyerProfile";
import PartnerLawyerBarcodes from "./partner/LawyerBarcodes";
import PartnerSuspended from "./partner/Suspended";
import PartnerBlocked from "./partner/Blocked";

import MemberIndex from "./member/Index";
import MemberProfile from "./member/Profile";
import MemberActive from "./member/Active";
import MemberNonActive from "./member/NonActive";
import MemberSuspended from "./member/Suspended";
import MemberBlocked from "./member/Blocked";

import InformationIndex from "./information/Index";
import InformationFee from "./information/Fee";
import InformationDiscount from "./information/Discount";
import InformationPromotion from "./information/Promotion";
import InformationWebsite from "./information/Website";

import LiveMonitoringIndex from "./liveMonitoring/Index";
import LiveMonitoringPanicButton from "./liveMonitoring/PanicButton";

import TnosAdminIndex from "./tnosAdmin/Index";
import TnosAdminUser from "./tnosAdmin/User";
import TnosAdminUserCreate from "./tnosAdmin/UserCreate";
import TnosAdminUserUpdate from "./tnosAdmin/UserUpdate";
import TnosAdminGroup from "./tnosAdmin/Group";

import PwaB2bTransaction from "./pwaB2b/Transaction";
import PwaB2bTransactionDetail from "./pwaB2b/TransactionDetail";
import PwaB2bTransactionExportPdf from "./pwaB2b/TransactionExportPdf";
import PwaB2bOrder from "./pwaB2b/Order";
import PwaB2bOrderDetail from "./pwaB2b/OrderDetail";
import PwaB2bOrderExportPdf from "./pwaB2b/OrderExportPdf";
import PwaB2bIncome from "./pwaB2b/Income";
import PwaB2bRefund from "./pwaB2b/Refund";
import PwaB2bPartnerPayments from "./pwaB2b/PartnerPayments";
import PwaB2bVoucher from "./pwaB2b/Voucher";
import PwaB2bOrderVoucherDetail from "./pwaB2b/OrderVoucherDetail";
import PwaB2bPaymentVoucherDetail from "./pwaB2b/PaymentVoucherDetail";
import PwaB2bPembayaran from "./pwaB2b/Pembayaran.js";
import PwaB2bOrderPesan from "./pwaB2b/OrderPesan.js";
import PwaB2bSecurityProvider from "./pwaB2b/SecurityProvider.js";
import PwaB2bSecurityProviderLayanan from "./pwaB2b/LayananSecurityProvider.js";
import PwaB2bSection from "./pwaB2b/Section.js";
import PwaB2bProduct from "./pwaB2b/Product.js";
import PwaB2bSubSection from "./pwaB2b/SubSection.js";

import ConsultationChatIndex from "./consultationChat/Index";
import ConsultationChatList from "./consultationChat/List";
import ConsultationChatSpam from "./consultationChat/Spam";

// pages
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import CustomPrint from "./pwaB2b/CustomPrint";

import AddArticle from "./artikel/create";
import ArtikelIndex from "./artikel";
import ArticleDetail from "./artikel/detail.js";
import ArtikelUpdate from "./artikel/update.js";
import ArtikelKategory from "./artikel/artikelkategory.js";
import KategoryCreate from "./artikel/kategorycreate.js";
import SubCategory from "./artikel/subkategorycreate.js";
import SubKategoryList from "./artikel/subkategorylist.js";
import ArtikelTags from "./artikel/tags.js";
import TagsCreate from "./artikel/tagscreate.js";

// TAB
import TABInsiden from "./tab/insiden.js";
import TABResponder from "./tab/responder.js"
import TABDetailInsiden from "./tab/detail-insiden.js"
import TABTransaksiDetail from "./tab/transaksi-detail.js"
import TABMasterPaket from "./tab/master-paket.js"
import TABMasterPaketDetail from "./tab/master-paket-detail.js"
import TABUser from "./tab/user.js"

// TAB-B2B
import TABB2BOrder from "./tabB2b/Order.js"
import TABB2BUser from "./tabB2b/User.js"
import TABB2BAktivasiAkun from "./tabB2b/AktivasiAkun.js"

const RouteWithLoader = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Route
            {...rest}
            render={(props) => (
                <>
                    {" "}
                    <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
                </>
            )}
        />
    );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
    const [loaded] = useState(true);

    const localStorageIsSettingsVisible = () => {
        return localStorage.getItem("settingsVisible") === "false" ? false : true;
    };

    const [showSettings, setShowSettings] = useState(
        localStorageIsSettingsVisible
    );

    const toggleSettings = () => {
        setShowSettings(!showSettings);
        localStorage.setItem("settingsVisible", !showSettings);
    };

    const currentPath = rest.path;
    const isOrderFormPage =
        currentPath && currentPath.startsWith("/pwa-b2b/order/:id/form");

    return (
        <Route
            {...rest}
            render={(props) => (
                <>
                    <Preloader show={loaded ? false : true} />

                    {isOrderFormPage ? (
                        <Component {...props} />
                    ) : (
                        <>
                            <Sidebar />

                            {/* <main className="content">
                                <Navbar />
                                <Component {...props} />
                                <Footer
                                    toggleSettings={toggleSettings}
                                    showSettings={showSettings}
                                />
                            </main> */}
                        </>
                    )}
                </>
            )}
        />
    );
};

export default () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [getSubMenuData] = useState([
        {
            id: 1,
            component: OrderIndex,
            path: Routes.OrderIndex.path,
        },
        {
            id: 2,
            component: OrderOnProgress,
            path: Routes.OrderOnProgress.path,
        },
        {
            id: 5,
            component: OrderSuccess,
            path: Routes.OrderSuccess.path,
        },
        {
            id: 6,
            component: OrderCancel,
            path: Routes.OrderCancel.path,
        },
        {
            id: 7,
            component: PaymentIndex,
            path: Routes.PaymentIndex.path,
        },
        {
            id: 8,
            component: PaymentTransaction,
            path: Routes.PaymentTransaction.path,
        },
        {
            id: 11,
            component: PaymentOnProgress,
            path: Routes.PaymentOnProgress.path,
        },
        {
            id: 12,
            component: PaymentIn,
            path: Routes.PaymentIn.path,
        },
        {
            id: 15,
            component: PaymentOut,
            path: Routes.PaymentOut.path,
        },
        {
            id: 16,
            component: PaymentWithdrawal,
            path: Routes.PaymentWithdrawal.path,
        },
        {
            id: 53,
            component: PaymentRefund,
            path: Routes.PaymentRefund.path,
        },
        {
            id: 17,
            component: PartnerIndex,
            path: Routes.PartnerIndex.path,
        },
        {
            id: 18,
            component: PartnerGuard,
            path: Routes.PartnerGuard.path,
        },
        {
            id: 19,
            component: PartnerLawyer,
            path: Routes.PartnerLawyer.path,
        },
        {
            id: 21,
            component: PartnerSuspended,
            path: Routes.PartnerSuspended.path,
        },
        {
            id: 22,
            component: PartnerBlocked,
            path: Routes.PartnerBlocked.path,
        },
        {
            id: 23,
            component: MemberIndex,
            path: Routes.MemberIndex.path,
        },
        {
            id: 24,
            component: MemberActive,
            path: Routes.MemberActive.path,
        },
        {
            id: 25,
            component: MemberNonActive,
            path: Routes.MemberNonActive.path,
        },
        {
            id: 27,
            component: MemberSuspended,
            path: Routes.MemberSuspended.path,
        },
        {
            id: 29,
            component: MemberBlocked,
            path: Routes.MemberBlocked.path,
        },
        {
            id: 32,
            component: InformationIndex,
            path: Routes.InformationIndex.path,
        },
        {
            id: 50,
            component: InformationFee,
            path: Routes.InformationFee.path,
        },
        {
            id: 33,
            component: InformationDiscount,
            path: Routes.InformationDiscount.path,
        },
        {
            id: 34,
            component: InformationPromotion,
            path: Routes.InformationPromotion.path,
        },
        {
            id: 38,
            component: InformationWebsite,
            path: Routes.InformationWebsite.path,
        },
        {
            id: 39,
            component: LiveMonitoringIndex,
            path: Routes.LiveMonitoringIndex.path,
        },
        {
            id: 43,
            component: LiveMonitoringPanicButton,
            path: Routes.LiveMonitoringPanicButton.path,
        },
        {
            id: 44,
            component: TnosAdminIndex,
            path: Routes.TnosAdminIndex.path,
        },
        {
            id: 45,
            component: TnosAdminUser,
            path: Routes.TnosAdminUser.path,
        },
        {
            id: 49,
            component: TnosAdminGroup,
            path: Routes.TnosAdminGroup.path,
        },
        {
            id: 57,
            component: PwaB2bTransaction,
            path: Routes.PwaB2bTransaction.path,
        },
        {
            id: 58,
            component: PwaB2bOrder,
            path: Routes.PwaB2bOrder.path,
        },
        {
            id: 59,
            component: PwaB2bIncome,
            path: Routes.PwaB2bIncome.path,
        },
        {
            id: 60,
            component: PwaB2bRefund,
            path: Routes.PwaB2bRefund.path,
        },
        {
            id: 61,
            component: PwaB2bPartnerPayments,
            path: Routes.PwaB2bPartnerPayments.path,
        },
        {
            id: 62,
            component: PwaB2bVoucher,
            path: Routes.PwaB2bVoucher.path,
        },
        {
            id: 63,
            component: ConsultationChatIndex,
            path: Routes.ConsultationChatIndex.path,
        },
        {
            id: 64,
            component: ConsultationChatList,
            path: Routes.ConsultationChatList.path,
        },
        {
            id: 65,
            component: ConsultationChatSpam,
            path: Routes.ConsultationChatSpam.path,
        },
        {
            id: 67,
            component: PwaB2bPembayaran,
            path: Routes.PwaB2bPembayaran.path,
        },
        {
            id: 24,
            component: PwaB2bSecurityProvider,
            path: Routes.PwaB2bSecurityProvider.path,
        },
        {
            id: 24,
            component: PwaB2bSecurityProviderLayanan,
            path: Routes.PwaB2bSecurityProviderLayanan.path
        },
        {
            id: 24,
            component: PwaB2bSection,
            path: Routes.PwaB2bSection.path
        },
        {
            id: 24,
            component: PwaB2bProduct,
            path: Routes.PwaB2bProduct.path
        },
        {
            id: 24,
            component: PwaB2bSubSection,
            path: Routes.PwaB2bSubSection.path
        },
        {
            id: 24,
            component: ArtikelKategory,
            path: Routes.ArtikelKategory.path,
        },
        {
            id: 24,
            component: ArtikelIndex,
            path: Routes.ArtikelIndex.path,
        },
        {
            id: 70,
            component: TABInsiden,
            path: Routes.TABInsiden.path,
        },
        {
            id: 72,
            component: TABResponder,
            path: Routes.TABResponder.path,
        },
        {
            id: 72,
            component: TABB2BAktivasiAkun,
            path: Routes.TABB2BAktivasiAkun.path
        },
        {
            id: 72,
            component: TABB2BUser,
            path: Routes.TABB2BUser.path
        },
        {
            id: 70,
            component: TABDetailInsiden,
            path: Routes.TABInsidenDetail.path
        },
        {
            id: 69,
            component: TABB2BOrder,
            path: Routes.TABB2BOrder.path
        },
        {
            id: 69,
            component: TABTransaksiDetail,
            path: Routes.TABTransaksiDetail.path
        },
        {
            id: 69,
            component: TABMasterPaket,
            path: Routes.TABMasterPaket.path
        },
        {
            id: 69,
            component: TABMasterPaketDetail,
            path: Routes.TABMasterPaketDetail.path
        },
        {
            id: 69,
            component: TABUser,
            path: Routes.TABUser.path
        },
    ]);
    const [getReadWriteSubMenuData] = useState([
        {
            id: 1,
            path: Routes.TnosAdminUserCreate.path,
            component: TnosAdminUserCreate,
            type: 1,
            sub_menu_id: 45,
        },
        {
            id: 2,
            path: Routes.PartnerGuardCreate.path,
            component: PartnerGuardCreate,
            type: 1,
            sub_menu_id: 18,
        },
        {
            id: 3,
            path: Routes.PartnerGuardDetail.path,
            component: PartnerGuardDetail,
            type: 0,
            sub_menu_id: 18,
        },
        {
            id: 4,
            path: Routes.PartnerGuardUpdate.path,
            component: PartnerGuardUpdate,
            type: 1,
            sub_menu_id: 18,
        },
        {
            id: 5,
            path: Routes.PartnerGuardProfile.path,
            component: PartnerGuardProfile,
            type: 0,
            sub_menu_id: 18,
        },
        {
            id: 6,
            path: Routes.PartnerGuardBarcodes.path,
            component: PartnerGuardBarcodes,
            type: 0,
            sub_menu_id: 18,
        },
        {
            id: 7,
            path: Routes.PartnerLawyerDetail.path,
            component: PartnerLawyerDetail,
            type: 0,
            sub_menu_id: 19,
        },
        {
            id: 8,
            path: Routes.PartnerLawyerUpdate.path,
            component: PartnerLawyerUpdate,
            type: 1,
            sub_menu_id: 19,
        },
        {
            id: 9,
            path: Routes.PartnerLawyerProfile.path,
            component: PartnerLawyerProfile,
            type: 0,
            sub_menu_id: 19,
        },
        {
            id: 10,
            path: Routes.PartnerLawyerBarcodes.path,
            component: PartnerLawyerBarcodes,
            type: 0,
            sub_menu_id: 19,
        },
        {
            id: 11,
            path: Routes.TnosAdminUserUpdate.path,
            component: TnosAdminUserUpdate,
            type: 1,
            sub_menu_id: 45,
        },
        {
            id: 12,
            path: Routes.PaymentTransactionDetail.path,
            component: PaymentTransactionDetail,
            type: 0,
            sub_menu_id: 8,
        },
        {
            id: 13,
            path: Routes.OrderOnProgressDetail.path,
            component: OrderOnProgressDetail,
            type: 0,
            sub_menu_id: 2,
        },
        {
            id: 14,
            path: Routes.MemberProfile.path,
            component: MemberProfile,
            type: 0,
            sub_menu_id: 24,
        },
        {
            id: 15,
            path: Routes.PwaB2bOrderDetail.path,
            component: PwaB2bOrderDetail,
            type: 0,
            sub_menu_id: 58,
        },
        {
            id: 16,
            path: Routes.PwaB2bTransactionDetail.path,
            component: PwaB2bTransactionDetail,
            type: 0,
            sub_menu_id: 57,
        },
        {
            id: 17,
            path: Routes.PwaB2bOrderExportPdf.path,
            component: PwaB2bOrderExportPdf,
            type: 0,
            sub_menu_id: 58,
        },
        {
            id: 18,
            path: Routes.PwaB2bTransactionExportPdf.path,
            component: PwaB2bTransactionExportPdf,
            type: 0,
            sub_menu_id: 57,
        },
        {
            id: 19,
            path: Routes.PwaB2bOrderVoucherDetail.path,
            component: PwaB2bOrderVoucherDetail,
            type: 0,
            sub_menu_id: 62,
        },
        {
            id: 20,
            path: Routes.PwaB2bPaymentVoucherDetail.path,
            component: PwaB2bPaymentVoucherDetail,
            type: 0,
            sub_menu_id: 62,
        },
        {
            id: 24,
            path: Routes.ArtikelCreate.path,
            component: AddArticle,
            type: 1,
            sub_menu_id: 18,
        },
        {
            id: 5,
            path: Routes.ArtikelDetail.path,
            component: ArticleDetail,
            type: 0,
            sub_menu_id: 18,
        },
        {
            id: 6,
            path: Routes.ArtikelUpdate.path,
            component: ArtikelUpdate,
            type: 0,
            sub_menu_id: 18,
        },
        {
            id: 7,
            path: Routes.KategoryCreate.path,
            component: KategoryCreate,
            type: 0,
            sub_menu_id: 19,
        },
        {
            id: 8,
            path: Routes.SubCategory.path,
            component: SubCategory,
            type: 1,
            sub_menu_id: 19,
        },
        {
            id: 9,
            path: Routes.SubKategoryList.path,
            component: SubKategoryList,
            type: 0,
            sub_menu_id: 19,
        },
        {
            id: 10,
            path: Routes.ArtikelTags.path,
            component: ArtikelTags,
            type: 0,
            sub_menu_id: 19,
        },
        {
            id: 11,
            path: Routes.TagsCreate.path,
            component: TagsCreate,
            type: 1,
            sub_menu_id: 45,
        },
    ]);
    const [getSubMenuIds, setSubMenuIds] = useState([]);
    const [getReadWriteSubMenuIds, setReadWriteSubMenuIds] = useState([]);
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);

            fetch(`${process.env.REACT_APP_API_URL}/admin-group-menu-access/${localStorage.getItem("user_group_id")}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => response.json())
                .then((data) => {
                    const subMenuIds = data[0].sub_menu_ids.split(",");
                    const readWriteSubMenuIds = data[0].read_write_ids.split(",");
                    setSubMenuIds(subMenuIds);
                    setReadWriteSubMenuIds(readWriteSubMenuIds);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            history.push("/login");
        }
    }, [history]);

    return (
        <div>
            <Switch>
                {/* Halaman Login */}
                {/* <RouteWithLoader exact path={Routes.Login.path} component={Login} />
                <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
                <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
                <RouteWithLoader
                    exact
                    path={Routes.ForgotPassword.path}
                    component={ForgotPassword}
                />
                <RouteWithLoader
                    exact
                    path={Routes.ResetPassword.path}
                    component={ResetPassword}
                /> */}
                {/* Halaman yang tidak memerlukan login */}
                {/* <RouteWithLoader
                    exact
                    path={Routes.PwaB2bOrderPesan.path}
                    component={PwaB2bOrderPesan}
                /> */}
                {/* Routes yang memerlukan login */}
                {isLoggedIn && (
                    <>
                        {/* <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
                        <RouteWithLoader
                            exact
                            path={Routes.NotFound.path}
                            component={NotFoundPage}
                        />
                        <RouteWithLoader
                            exact
                            path={Routes.ServerError.path}
                            component={ServerError}
                        /> */}
                        {/* Pages */}
                        {/* {getSubMenuData?.map((item) => {
                            return (
                                getSubMenuIds?.includes(item.id.toString()) && (
                                    <RouteWithSidebar
                                        key={item.id}
                                        exact
                                        path={item.path}
                                        component={item.component}
                                    />
                                )
                            );
                        })} */}
                        {/* Pages (Read) */}
                        {/* {getReadWriteSubMenuData?.map((item) => {
                            // If item.menu_id in getSubMenuIds, then render the component
                            return getSubMenuIds?.includes(item.sub_menu_id.toString()) &&
                                item.type === 0 ? (
                                <RouteWithSidebar
                                    key={item.id}
                                    exact
                                    path={item.path}
                                    component={item.component}
                                />
                            ) : (
                                ""
                            );
                        })} */}
                        {/* Pages (Read and Write) */}
                        {/* {getReadWriteSubMenuData?.map((item) => {
                            // If item.menu_id in getSubMenuIds, then render the component
                            return getReadWriteSubMenuIds?.includes(
                                item.sub_menu_id.toString()
                            ) && item.type === 1 ? (
                                <RouteWithSidebar
                                    key={item.id}
                                    exact
                                    path={item.path}
                                    component={item.component}
                                />
                            ) : (
                                ""
                            );
                        })} */}
                        {/* pages */}
                        {/* <RouteWithSidebar
                            exact
                            path={Routes.DashboardOverview.path}
                            component={DashboardOverview}
                        /> */}
                        {/* <RouteWithSidebar
                            exact
                            path={Routes.Upgrade.path}
                            component={Upgrade}
                        /> */}

                        {/* dicki  */}
                        {/* <RouteWithSidebar
                            exact
                            path={Routes.TnosGems.path}
                            component={TnosGemsPembelian}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.TnosGemsProduct.path}
                            component={TnosGemsProduct}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.MarketingMessageBlash.path}
                            component={MarketingMessageBlash}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Transactions.path}
                            component={Transactions}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Settings.path}
                            component={Settings}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.BootstrapTables.path}
                            component={BootstrapTables}
                        /> */}
                        {/* components */}
                        {/* <RouteWithSidebar
                            exact
                            path={Routes.Accordions.path}
                            component={Accordion}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Alerts.path}
                            component={Alerts}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Badges.path}
                            component={Badges}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Breadcrumbs.path}
                            component={Breadcrumbs}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Buttons.path}
                            component={Buttons}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Forms.path}
                            component={Forms}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Modals.path}
                            component={Modals}
                        />
                        <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
                        <RouteWithSidebar
                            exact
                            path={Routes.Navbars.path}
                            component={Navbars}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Pagination.path}
                            component={Pagination}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Popovers.path}
                            component={Popovers}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Progress.path}
                            component={Progress}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Tables.path}
                            component={Tables}
                        />
                        <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
                        <RouteWithSidebar
                            exact
                            path={Routes.Tooltips.path}
                            component={Tooltips}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.Toasts.path}
                            component={Toasts}
                        /> */}
                        {/* documentation */}
                        {/* <RouteWithSidebar
                            exact
                            path={Routes.DocsOverview.path}
                            component={DocsOverview}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.DocsDownload.path}
                            component={DocsDownload}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.DocsQuickStart.path}
                            component={DocsQuickStart}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.DocsLicense.path}
                            component={DocsLicense}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.DocsFolderStructure.path}
                            component={DocsFolderStructure}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.DocsBuild.path}
                            component={DocsBuild}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.DocsChangelog.path}
                            component={DocsChangelog}
                        />
                        <RouteWithSidebar
                            exact
                            path={Routes.CustomPrint.path}
                            component={CustomPrint}
                        /> */}
                    </>
                )}
            </Switch>
        </div>
    );
};
