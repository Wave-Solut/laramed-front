<template>
  <!-- Navbar -->
  <nav
    class="navbar navbar-expand-lg top-0 z-index-3 position-absolute mt-4 pr-4"
    :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'"
  >
    <div class="container ps-2 pe-0">
      <router-link
        class="navbar-brand font-weight-bolder ms-lg-0 ms-3"
        :class="darkMode ? 'text-black' : 'text-white'"
        to="/"
        >One Pharma</router-link
      >
      <button
        class="shadow-none navbar-toggler ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="mt-2 navbar-toggler-icon">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        id="navigation"
        class="pt-3 pb-2 collapse navbar-collapse w-100 py-lg-0"
      >
        <ul class="mx-auto navbar-nav navbar-nav-hover">
          <li class="mx-2 nav-item dropdown dropdown-hover">
            <a
              href="/"
              role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center"
              :class="[darkModes]"
            >
              Home
            </a>
          </li>
          <li class="mx-2 nav-item dropdown dropdown-hover">
            <a
              href="/marketplace"
              role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center"
              :class="[darkModes]"
            >
              Marketplace
            </a>
          </li>
          <li class="mx-2 nav-item dropdown dropdown-hover">
            <a
              href="#"
              role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center"
              :class="[darkModes]"
            >
              About Us
            </a>
          </li>

          <li v-show="!isAuth" class="mx-3 nav-item dropdown dropdown-hover">
            <a
              href="#"
              class="mb-1 btn bg-gradient-warning btn-xs"
              :class="btnBackground ? btnBackground : 'bg-white text-dark'"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              v-show="!isAuth"
              @click="showMenu = !showMenu"
            >
              <i class="ni ni-basket text-white text-sm opacity-10"></i
            ></a>
            <ul
              class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
              :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton"
              v-show="!isAuth"
            >
              <li class="mb-2" v-for="item in cartItems" :key="item.product_id">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <span
                        class="removeBtn"
                        title="Remove from cart"
                        style="margin-right: 1rem; color: red"
                        @click.prevent="removeFromCart(item)"
                        >X</span
                      >
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold"
                          >{{ item.product_name }} ({{
                            item.product_form
                          }})</span
                        >
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-box-open me-1"></i>
                        Pack : {{ item.pack_size }} / pack
                      </p>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-cubes me-1"></i>
                        Quantity : {{ item.quantity }}
                      </p>
                    </div>
                  </div>
                </a>
              </li>

              <li class="text-center">
                {{ this.cartCount }}
                <p
                  v-show="this.cartCount < 1"
                  class="mb-0 text-xs text-secondary"
                >
                  Your Cart is Empty
                </p>

                <a
                  href="/dashboard/welcome"
                  class="mb-0 btn btn-sm me-1"
                  :class="btnBackground ? btnBackground : 'bg-white text-dark'"
                  onclick="smoothToPricing('pricing-soft-ui')"
                  v-show="this.cartCount > 0"
                  @click.prevent="askPTC()"
                  >Checkout
                </a>
              </li>
            </ul>
          </li>
          <!--<li class="mx-2 nav-item dropdown dropdown-hover">
            <a
              id="dropdownMenuPages"
              role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center"
              :class="[darkModes]"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Pages
              <img
                :src="downArrWhite"
                alt="down-arrow"
                class="arrow ms-1"
                :class="darkMode ? 'd-none' : 'd-lg-block d-none'"
              />
              <img
                :src="downArrBlack"
                alt="down-arrow"
                class="arrow ms-1 d-block"
                :class="darkMode ? 'd-lg-block' : 'd-lg-none'"
              />
            </a>
            <div
              class="p-3 mt-0 dropdown-menu dropdown-menu-animation dropdown-xl border-radius-xl mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="px-4 py-2 col-12">
                  <div class="row">
                    <div class="col-4 position-relative">
                      <div
                        class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                      >
                        <i class="ni ni-spaceship me-3 text-success"></i>
                        Dashboards
                      </div>
                      <router-link
                        :to="{ name: 'Default' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Default</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Automotive' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Automotive</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Smart Home' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Smart Home</span>
                      </router-link>
                      <router-link
                        to="#"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Virtual Reality</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'CRM' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">CRM</span>
                      </router-link>
                      <div
                        class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                      >
                        <i class="ni ni-circle-08 me-3 text-success"></i>
                        Users
                      </div>
                      <router-link
                        :to="{ name: 'Reports' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Reports</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'New User' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">New User</span>
                      </router-link>
                      <hr class="vertical dark" />
                    </div>
                    <div class="col-4 position-relative">
                      <div
                        class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                      >
                        <i class="ni ni-badge me-3 text-success"></i>
                        Profile
                      </div>
                      <router-link
                        :to="{ name: 'Overview' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Overview</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Teams' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Teams</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'All Projects' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Projects</span>
                      </router-link>
                      <div
                        class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                      >
                        <i class="ni ni-app me-3 text-success"></i>
                        Projects
                      </div>
                      <router-link
                        :to="{ name: 'General' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">General</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Timeline' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Timeline</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'New Project' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">New Project</span>
                      </router-link>
                      <hr class="vertical dark" />
                    </div>
                    <div class="col-4">
                      <div
                        class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                      >
                        <i class="ni ni-single-02 me-3 text-success"></i>
                        Account
                      </div>
                      <router-link
                        :to="{ name: 'Settings' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Settings</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Billing' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Billing</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Invoice' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Invoice</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Security' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Security</span>
                      </router-link>
                      <div
                        class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                      >
                        <i class="ni ni-folder-17 me-3 text-success"></i>
                        Extra
                      </div>
                      <router-link
                        :to="{ name: 'Pricing Page' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Pricing Page</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'RTL' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">RTL Page</span>
                      </router-link>
                      <router-link
                        :to="{ name: 'Widgets' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span class="ps-3">Widgets</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="d-lg-none">
                <div
                  class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                >
                  <div class="d-inline-block">
                    <div
                      class="text-center icon icon-shape icon-xs border-radius-md bg-gradient-success me-2 d-flex align-items-center justify-content-center"
                    >
                      <i class="ni ni-spaceship me-3 text-success"></i>
                    </div>
                  </div>
                  Dashboards
                </div>
                <router-link
                  :to="{ name: 'Default' }"
                  class="dropdown-item border-radius-md"
                  >Default</router-link
                >
                <router-link
                  :to="{ name: 'Automotive' }"
                  class="dropdown-item border-radius-md"
                  >Automotive</router-link
                >
                <router-link
                  :to="{ name: 'Smart Home' }"
                  class="dropdown-item border-radius-md"
                  >Smart Home</router-link
                >
                <router-link
                  :to="{ name: 'VR Default' }"
                  class="dropdown-item border-radius-md"
                  >Virtual Reality</router-link
                >
                <router-link
                  :to="{ name: 'CRM' }"
                  class="dropdown-item border-radius-md"
                  >CRM</router-link
                >
                <div
                  class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                >
                  <i class="ni ni-circle-08 me-3 text-success"></i>
                  Users
                </div>
                <router-link
                  :to="{ name: 'Reports' }"
                  class="dropdown-item border-radius-md"
                  >Reports</router-link
                >
                <router-link to="#" class="dropdown-item border-radius-md"
                  >New user</router-link
                >
                <div
                  class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                >
                  <i class="ni ni-badge me-3 text-success"></i>
                  Profile
                </div>
                <router-link
                  :to="{ name: 'Overview' }"
                  class="dropdown-item border-radius-md"
                  >Overview</router-link
                >
                <router-link
                  :to="{ name: 'Teams' }"
                  class="dropdown-item border-radius-md"
                  >Teams</router-link
                >
                <router-link to="#" class="dropdown-item border-radius-md"
                  >Projects</router-link
                >
                <div
                  class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                >
                  <i class="ni ni-app me-3 text-success"></i>
                  Projects
                </div>
                <router-link
                  :to="{ name: 'General' }"
                  class="dropdown-item border-radius-md"
                  >General</router-link
                >
                <router-link
                  :to="{ name: 'Timeline' }"
                  class="dropdown-item border-radius-md"
                  >Timeline</router-link
                >
                <router-link
                  :to="{ name: 'New Project' }"
                  class="dropdown-item border-radius-md"
                  >New Project</router-link
                >
                <div
                  class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                >
                  <i class="ni ni-single-02 me-3 text-success"></i>
                  Account
                </div>
                <router-link
                  :to="{ name: 'Settings' }"
                  class="dropdown-item border-radius-md"
                  >Settings</router-link
                >
                <router-link
                  :to="{ name: 'Billing' }"
                  class="dropdown-item border-radius-md"
                  >Billing</router-link
                >
                <router-link
                  :to="{ name: 'Invoice' }"
                  class="dropdown-item border-radius-md"
                  >Invoice</router-link
                >
                <router-link
                  :to="{ name: 'Security' }"
                  class="dropdown-item border-radius-md"
                  >Security</router-link
                >
                <div
                  class="px-0 mt-3 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                >
                  <i class="ni ni-folder-17 me-3 text-success"></i>
                  Extra
                </div>
                <router-link
                  :to="{ name: 'Pricing Page' }"
                  class="dropdown-item border-radius-md"
                  >Pricing Page</router-link
                >
                <router-link
                  :to="{ name: 'RTL' }"
                  class="dropdown-item border-radius-md"
                  >RTL Page</router-link
                >
                <router-link
                  :to="{ name: 'Widgets' }"
                  class="dropdown-item border-radius-md"
                  >Widgets</router-link
                >
              </div>
            </div>
          </li>-->
          <!--<li class="mx-2 nav-item dropdown dropdown-hover">
            <a
              id="dropdownMenuDocs"
              role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center"
              :class="[darkModes]"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Docs
              <img
                :src="downArrWhite"
                alt="down-arrow"
                class="arrow ms-1"
                :class="darkMode ? 'd-none' : 'd-lg-block d-none'"
              />
              <img
                :src="downArrBlack"
                alt="down-arrow"
                class="arrow ms-1 d-block"
                :class="darkMode ? 'd-lg-block' : 'd-lg-none'"
              />
            </a>-->
          <!--<div
              class="p-3 mt-0 dropdown-menu dropdown-menu-animation dropdown-lg mt-lg-3 border-radius-lg"
              aria-labelledby="dropdownMenuDocs"
            >
              <div class="d-none d-lg-block">
                <ul class="list-group">
                  <li class="p-0 border-0 nav-item list-group-item">
                    <a
                      class="py-2 dropdown-item ps-3 border-radius-md"
                      href="https://www.creative-tim.com/learning-lab/vue/overview/argon-dashboard/"
                    >
                      <div class="d-flex">
                        <div class="h-10 mt-1 icon me-3 d-flex">
                          <i class="ni ni-planet text-success"></i>
                        </div>
                        <div>
                          <h6
                            class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                          >
                            Getting Started
                          </h6>
                          <span class="text-sm">
                            All about overview, quick start, license and
                            contents
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li class="p-0 border-0 nav-item list-group-item">
                    <a
                      class="py-2 dropdown-item ps-3 border-radius-md"
                      href="https://www.creative-tim.com/learning-lab/vue/colors/argon-dashboard/"
                    >
                      <div class="d-flex">
                        <div class="h-10 mt-1 icon me-3 d-flex">
                          <i class="ni ni-single-copy-04 text-success"></i>
                        </div>
                        <div>
                          <h6
                            class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                          >
                            Foundation
                          </h6>
                          <span class="text-sm"
                            >See our colors, icons and typography</span
                          >
                        </div>
                      </div>
                    </a>
                  </li>
                  <li class="p-0 border-0 nav-item list-group-item">
                    <a
                      class="py-2 dropdown-item ps-3 border-radius-md"
                      href="https://www.creative-tim.com/learning-lab/vue/alerts/argon-dashboard/"
                    >
                      <div class="d-flex">
                        <div class="h-10 mt-1 icon me-3 d-flex">
                          <i class="ni ni-app text-success"></i>
                        </div>
                        <div>
                          <h6
                            class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                          >
                            Components
                          </h6>
                          <span class="text-sm"
                            >Explore our collection of fully designed
                            components</span
                          >
                        </div>
                      </div>
                    </a>
                  </li>
                  <li class="p-0 border-0 nav-item list-group-item">
                    <a
                      class="py-2 dropdown-item ps-3 border-radius-md"
                      href="https://www.creative-tim.com/learning-lab/vue/datepicker/argon-dashboard/"
                    >
                      <div class="d-flex">
                        <div class="h-10 mt-1 icon me-3 d-flex">
                          <i class="ni ni-chart-bar-32 text-success"></i>
                        </div>
                        <div>
                          <h6
                            class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                          >
                            Plugins
                          </h6>
                          <span class="text-sm"
                            >Check how you can integrate our plugins</span
                          >
                        </div>
                      </div>
                    </a>
                  </li>
                  <li class="p-0 border-0 nav-item list-group-item">
                    <a
                      class="py-2 dropdown-item ps-3 border-radius-md"
                      href="https://www.creative-tim.com/learning-lab/vue/utilities/argon-dashboard/"
                    >
                      <div class="d-flex">
                        <div class="h-10 mt-1 icon me-3 d-flex">
                          <i class="ni ni-settings text-success"></i>
                        </div>
                        <div>
                          <h6
                            class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                          >
                            Utility Classes
                          </h6>
                          <span class="text-sm">
                            For those who want flexibility, use our utility
                            classes
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="row d-lg-none">
                <div class="col-md-12 g-0">
                  <a
                    class="py-2 dropdown-item ps-3 border-radius-md"
                    href="../../pages/about-us.html"
                  >
                    <div class="d-flex">
                      <div class="h-10 mt-1 icon me-3 d-flex">
                        <i class="ni ni-planet text-success"></i>
                      </div>
                      <div>
                        <h6
                          class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                        >
                          Getting Started
                        </h6>
                        <span class="text-sm"
                          >All about overview, quick start, license and
                          contents</span
                        >
                      </div>
                    </div>
                  </a>
                  <a
                    class="py-2 dropdown-item ps-3 border-radius-md"
                    href="../../pages/about-us.html"
                  >
                    <div class="d-flex">
                      <div class="h-10 mt-1 icon me-3 d-flex">
                        <i class="ni ni-single-copy-04 text-success"></i>
                      </div>
                      <div>
                        <h6
                          class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                        >
                          Foundation
                        </h6>
                        <span class="text-sm"
                          >See our colors, icons and typography</span
                        >
                      </div>
                    </div>
                  </a>
                  <a
                    class="py-2 dropdown-item ps-3 border-radius-md"
                    href="../../pages/about-us.html"
                  >
                    <div class="d-flex">
                      <div class="h-10 mt-1 icon me-3 d-flex">
                        <i class="ni ni-app text-success"></i>
                      </div>
                      <div>
                        <h6
                          class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                        >
                          Components
                        </h6>
                        <span class="text-sm"
                          >Explore our collection of fully designed
                          components</span
                        >
                      </div>
                    </div>
                  </a>
                  <a
                    class="py-2 dropdown-item ps-3 border-radius-md"
                    href="../../pages/about-us.html"
                  >
                    <div class="d-flex">
                      <div class="h-10 mt-1 icon me-3 d-flex">
                        <i class="ni ni-chart-bar-32 text-success"></i>
                      </div>
                      <div>
                        <h6
                          class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                        >
                          Plugins
                        </h6>
                        <span class="text-sm"
                          >Check how you can integrate our plugins</span
                        >
                      </div>
                    </div>
                  </a>
                  <a
                    class="py-2 dropdown-item ps-3 border-radius-md"
                    href="../../pages/about-us.html"
                  >
                    <div class="d-flex">
                      <div class="h-10 mt-1 icon me-3 d-flex">
                        <i class="ni ni-settings text-success"></i>
                      </div>
                      <div>
                        <h6
                          class="p-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center"
                        >
                          Utility Classes
                        </h6>
                        <span class="text-sm"
                          >All about overview, quick start, license and
                          contents</span
                        >
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </li>-->
        </ul>
        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <a
              href="/authentication/signin"
              class="mb-0 btn btn-sm me-1"
              :class="btnBackground ? btnBackground : 'bg-white text-dark'"
              onclick="smoothToPricing('pricing-soft-ui')"
              v-show="this.isAuth"
              >Login</a
            >
            <a
              href="/authentication/signup"
              class="mb-0 btn btn-sm me-1"
              :class="btnBackground ? btnBackground : 'bg-white text-dark'"
              onclick="smoothToPricing('pricing-soft-ui')"
              v-show="this.isAuth"
              >Register</a
            >
            <a
              href="/dashboard/welcome"
              class="mb-0 btn btn-sm me-1"
              :class="btnBackground ? btnBackground : 'bg-white text-dark'"
              onclick="smoothToPricing('pricing-soft-ui')"
              v-show="!isAuth"
              >Dashboard</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import downArrWhite from "@/assets/img/down-arrow-white.svg";
import downArrBlack from "@/assets/img/down-arrow-dark.svg";
import axios from "axios";

export default {
  name: "Navbar",

  props: {
    btnBackground: {
      type: String,
      default: "",
    },
    isBlur: {
      type: String,
      default: "",
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      downArrWhite,
      downArrBlack,
      isAuth: false,
      showMenu: false,
      cartCount: 0,
      cartItems: [],
    };
  },

  computed: {
    darkModes() {
      return {
        "text-dark": this.darkMode,
      };
    },
  },

  created() {
    this.cartItems = this.$store.state.cart;
    this.cartCount = this.$store.state.cartCount;
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.isAuth = true;
    }
  },
  methods: {
    async removeFromCart(item) {
      await this.$store.dispatch("removeFromCart", item);
    },

    showSwal(type) {
      if (type === "success-message-enquiry") {
        this.$swal({
          icon: "success",
          title: "Submit Enquiry!",
          text: "Your Order has been submitted!",
          type: type,
        });
      } else if (type === "auto-close") {
        let timerInterval;
        this.$swal({
          title: "Sending Order!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            this.$swal.showLoading();
            const b = this.$swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = this.$swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      } else if (type === "ask-proceed") {
        this.$swal({
          title: "Please verify your order details!",
          text: "By Choosing 'Yes', you accept the terms and conditions of ONE PHARMA!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, I Confirm!",
          customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-danger",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.proceedToCheckout();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            this.$swal.dismiss;
          }
        });
      }
    },
    askPTC() {
      this.showSwal("ask-proceed");
    },
    async proceedToCheckout() {
      this.$swal({
        title: "Submit your Order",
        showCancelButton: true,
        confirmButtonText: "Send",
        showLoaderOnConfirm: true,
        customClass: {
          confirmButton: "btn bg-gradient-success",
          cancelButton: "btn bg-gradient-danger",
        },
        buttonsStyling: false,
        preConfirm: () => {
          let data = {
            cart: JSON.stringify(this.cartItems),
          };
          return axios
            .post("enquiry", data, this.axios_config)
            .then(({ data }) => {
              this.showSwal("success-message-enquiry");
              window.localStorage.setItem("cart", JSON.stringify([]));

              window.localStorage.setItem("cartCount", 0);
              this.cartCount = this.$store.state.cartCount;
              console.log(data.status);
            })
            .catch(({ response }) => {
              this.errMessage = response.data.message;
              this.$swal({
                title: "Error!",
                text: this.errMessage,
                icon: "error",
                customClass: {
                  confirmButton: "btn bg-gradient-success",
                },
                buttonsStyling: false,
              });
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: this.errMessage,
          });
        }
      });
    },
  },
};
</script>
