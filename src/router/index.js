import { createRouter, createWebHistory } from "vue-router";

import FrontWelcome from "../views/auth/signin/Home.vue";
import MarketPlace from "../views/auth/signin/Marketplace.vue";
import Welcome from "../views/dashboard/Welcome.vue";
import Landing from "../views/dashboards/Landing.vue";
import Default from "../views/dashboards/Default.vue";
import Automotive from "../views/dashboards/Automotive.vue";
import SmartHome from "../views/dashboards/SmartHome.vue";
import VRDefault from "../views/dashboards/vr/VRDefault.vue";
import VRInfo from "../views/dashboards/vr/VRInfo.vue";
import CRM from "../views/dashboards/CRM.vue";
import Overview from "../views/pages/profile/Overview.vue";
import Teams from "../views/pages/profile/Teams.vue";
import Projects from "../views/pages/profile/Projects.vue";
import General from "../views/pages/projects/General.vue";
import Timeline from "../views/pages/projects/Timeline.vue";
import NewProject from "../views/pages/projects/NewProject.vue";
import Pricing from "../views/pages/Pricing.vue";
import Checkout from "../views/pages/Checkout.vue";
import RTL from "../views/pages/Rtl.vue";
import Charts from "../views/pages/Charts.vue";
import SweetAlerts from "../views/pages/SweetAlerts.vue";
import Notifications from "../views/pages/Notifications.vue";
import Kanban from "../views/applications/Kanban.vue";
import Wizard from "../views/applications/wizard/Wizard.vue";
import DataTables from "../views/applications/DataTables.vue";
import Analytics from "../views/applications/analytics/Analytics.vue";
import EcommerceOverview from "../views/ecommerce/overview/Overview.vue";
import NewProduct from "../views/ecommerce/products/NewProduct.vue";
import EditProduct from "../views/ecommerce/EditProduct.vue";
import EditCategory from "../views/ecommerce/EditCategory.vue";
import EditAtc from "../views/ecommerce/EditAtc.vue";
import EditForm from "../views/ecommerce/EditForm.vue";
import EditSubstance from "../views/ecommerce/EditSubstance.vue";
import EditCountry from "../views/ecommerce/EditCountry.vue";

import AddProduct from "../views/ecommerce/AddProduct.vue";
import AddCategory from "../views/ecommerce/AddCategory.vue";
import AddAtc from "../views/ecommerce/AddAtc.vue";
import AddForm from "../views/ecommerce/AddForm.vue";
import AddSubstance from "../views/ecommerce/AddSubstance.vue";
import AddCountry from "../views/ecommerce/AddCountry.vue";
import ProductPage from "../views/ecommerce/ProductPage.vue";
import ProductInfo from "../views/ecommerce/ProductInfo.vue";
import ProductsList from "../views/ecommerce/ProductsList.vue";
import CategoriesList from "../views/ecommerce/CategoriesList.vue";
import AtcsList from "../views/ecommerce/AtcsList.vue";
import FormsList from "../views/ecommerce/FormsList.vue";
import SubstancesList from "../views/ecommerce/SubstancesList.vue";
import CountriesList from "../views/ecommerce/CountriesList.vue";
import UsersList from "../views/ecommerce/UsersList.vue";
import OrderDetails from "../views/ecommerce/Orders/OrderDetails.vue";
import EnquiryDetails from "../views/ecommerce/Orders/EnquiryDetails.vue";
import OrderList from "../views/ecommerce/Orders/OrderList.vue";
import Referral from "../views/ecommerce/Referral.vue";
import Reports from "../views/pages/Users/Reports.vue";
import NewUser from "../views/pages/Users/NewUser.vue";
import Settings from "../views/pages/Account/Settings.vue";
import ProfileSetting from "../views/pages/Account/ProfileSetting.vue";
import Billing from "../views/pages/Account/Billing.vue";
import Invoice from "../views/pages/Account/Invoice.vue";
import Security from "../views/pages/Account/Security.vue";
import Widgets from "../views/pages/Widgets.vue";
import Basic from "../views/auth/signin/Basic.vue";
import Cover from "../views/auth/signin/Cover.vue";
import Illustration from "../views/auth/signin/Illustration.vue";
import ResetBasic from "../views/auth/reset/Basic.vue";
import ResetCover from "../views/auth/reset/Cover.vue";
import ResetIllustration from "../views/auth/reset/Illustration.vue";
import VerificationBasic from "../views/auth/verification/Basic.vue";
import VerificationCover from "../views/auth/verification/Cover.vue";
import VerificationIllustration from "../views/auth/verification/Illustration.vue";
import SignupBasic from "../views/auth/signup/Basic.vue";
import SignupCover from "../views/auth/signup/Cover.vue";
import SignupIllustration from "../views/auth/signup/Illustration.vue";
import Error404 from "../views/auth/error/Error404.vue";
import Error500 from "../views/auth/error/Error500.vue";
import lockBasic from "../views/auth/lock/Basic.vue";
import lockCover from "../views/auth/lock/Cover.vue";
import lockIllustration from "../views/auth/lock/Illustration.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "front Welcome",
    component: FrontWelcome,
  },
  {
    path: "/marketplace",
    name: "Marketplace",
    component: MarketPlace,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/dashboard/welcome",
    name: "Welcome",
    component: Welcome,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/dashboards/dashboard-default",
    name: "Default",
    component: Default,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/dashboards/landing",
    name: "Landing",
    component: Landing,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/dashboards/automotive",
    name: "Automotive",
    component: Automotive,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/dashboards/smart-home",
    name: "Smart Home",
    component: SmartHome,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/dashboards/vr/vr-default",
    name: "VR Default",
    component: VRDefault,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/dashboards/vr/vr-info",
    name: "VR Info",
    component: VRInfo,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/dashboards/crm",
    name: "CRM",
    component: CRM,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/profile/overview",
    name: "Profile Overview",
    component: Overview,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/profile/teams",
    name: "Teams",
    component: Teams,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/profile/projects",
    name: "All Projects",
    component: Projects,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/projects/general",
    name: "General",
    component: General,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/projects/timeline",
    name: "Timeline",
    component: Timeline,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/projects/new-project",
    name: "New Project",
    component: NewProject,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/pricing-page",
    name: "Pricing Page",
    component: Pricing,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/checkout/:id",
    name: "Checkout Page",
    component: Checkout,
    props: true,
    meta: {
      isAuth: true,
    },
  },

  {
    path: "/pages/rtl-page",
    name: "RTL",
    component: RTL,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/charts",
    name: "Charts",
    component: Charts,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/widgets",
    name: "Widgets",
    component: Widgets,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/sweet-alerts",
    name: "Sweet Alerts",
    component: SweetAlerts,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/notifications",
    name: "Notifications",
    component: Notifications,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/applications/kanban",
    name: "Kanban",
    component: Kanban,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/applications/wizard",
    name: "Wizard",
    component: Wizard,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/applications/data-tables",
    name: "Data Tables",
    component: DataTables,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/applications/analytics",
    name: "Analytics",
    component: Analytics,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/overview",
    name: "Overview",
    component: EcommerceOverview,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/products/new-product",
    name: "New Product",
    component: NewProduct,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/products/edit-product/:id",
    name: "Edit Product",
    component: EditProduct,
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/categories/edit-category/:id",
    name: "Edit Category",
    component: EditCategory,
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/atcs/edit-atc/:id",
    name: "Edit Atc",
    component: EditAtc,
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/forms/edit-form/:id",
    name: "Edit Form",
    component: EditForm,
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/substances/edit-substance/:id",
    name: "Edit Substance",
    component: EditSubstance,
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/countries/edit-country/:id",
    name: "Edit Country",
    component: EditCountry,
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/products/add-product/",
    name: "Add Product",
    component: AddProduct,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/categories/add-category/",
    name: "Add Category",
    component: AddCategory,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/atcs/add-atc/",
    name: "Add Atc",
    component: AddAtc,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/forms/add-form/",
    name: "Add Form",
    component: AddForm,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/substances/add-substance/",
    name: "Add Substance",
    component: AddSubstance,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/countries/add-country/",
    name: "Add Country",
    component: AddCountry,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/products/product-page/",
    name: "Product Page",
    component: ProductPage,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/products/product-info/:id",
    name: "Product Info",
    component: ProductInfo,
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/products/products-list",
    name: "Products List",
    component: ProductsList,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/categories/categories-list",
    name: "Categories List",
    component: CategoriesList,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/users/users-list",
    name: "Users List",
    component: UsersList,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/atcs/atcs-list",
    name: "Atcs List",
    component: AtcsList,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/forms/forms-list",
    name: "Forms List",
    component: FormsList,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/substances/substances-list",
    name: "Substances List",
    component: SubstancesList,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/config/countries/countries-list",
    name: "Countries List",
    component: CountriesList,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/orders/order-details",
    name: "Order Details",
    component: OrderDetails,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/orders/order-list",
    name: "Order List",
    component: OrderList,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/orders/details/:id",
    name: "Enquiry Details",
    component: EnquiryDetails,
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/ecommerce/referral",
    name: "Referral",
    component: Referral,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/users/reports",
    name: "Reports",
    component: Reports,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/users/new-user",
    name: "New User",
    component: NewUser,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/users/account/settings",
    name: "Settings",
    component: Settings,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/users/account/profile-setting/:id",
    name: "Profile Setting",
    component: ProfileSetting,
    props: true,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/account/billing",
    name: "Billing",
    component: Billing,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/account/invoice",
    name: "Invoice",
    component: Invoice,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/pages/account/Security",
    name: "Security",
    component: Security,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/authentication/signin/basic",
    name: "Signin Basic",
    component: Basic,
  },
  {
    path: "/authentication/signin",
    name: "Signin Cover",
    component: Cover,
  },
  {
    path: "/authentication/signin/illustration",
    name: "Signin Illustration",
    component: Illustration,
  },
  {
    path: "/authentication/reset/basic",
    name: "Reset Basic",
    component: ResetBasic,
  },
  {
    path: "/authentication/reset/cover",
    name: "Reset Cover",
    component: ResetCover,
  },
  {
    path: "/authentication/reset/illustration",
    name: "Reset Illustration",
    component: ResetIllustration,
  },
  {
    path: "/authentication/lock/basic",
    name: "Lock Basic",
    component: lockBasic,
  },
  {
    path: "/authentication/lock/cover",
    name: "Lock Cover",
    component: lockCover,
  },
  {
    path: "/authentication/lock/illustration",
    name: "Lock Illustration",
    component: lockIllustration,
  },
  {
    path: "/authentication/verification/basic",
    name: "Verification Basic",
    component: VerificationBasic,
  },
  {
    path: "/authentication/verification/cover",
    name: "Verification Cover",
    component: VerificationCover,
  },
  {
    path: "/authentication/verification/illustration",
    name: "Verification Illustration",
    component: VerificationIllustration,
  },
  {
    path: "/authentication/signup/basic",
    name: "Signup Basic",
    component: SignupBasic,
  },
  {
    path: "/authentication/signup",
    name: "Signup Cover",
    component: SignupCover,
  },
  {
    path: "/authentication/signup/illustration",
    name: "Signup Illustration",
    component: SignupIllustration,
  },
  {
    path: "/authentication/error/error404",
    name: "Error Error404",
    component: Error404,
  },
  {
    path: "/authentication/error/error500",
    name: "Error Error500",
    component: Error500,
  },
];

const router = createRouter({
  //history: createWebHistory(),

  history: createWebHistory("/laramed-front/"),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuth)) {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      next("/authentication/signin");
    }
  }
  next();
});

export default router;
