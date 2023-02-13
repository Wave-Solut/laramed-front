<template>
  <div
    class="py-4 container-fluid"
    v-for="product in product"
    :key="product.productinfo.id"
  >
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-4">Product Details</h5>
            <div class="row">
              <div class="text-left col-xl-5 col-lg-6 ms-3">
                <h4 class="mt-4 mt-lg-0 d-flex">
                  {{ product.productinfo.branded_name }}
                </h4>
                <p class="text-xs">
                  Category : {{ product.productinfo.categoryName }}
                </p>
                <div class="rating">
                  <i class="fas fa-star" aria-hidden="true"></i>
                  <i class="fas fa-star" aria-hidden="true"></i>
                  <i class="fas fa-star" aria-hidden="true"></i>
                  <i class="fas fa-star" aria-hidden="true"></i>
                  <i class="fas fa-star-half-alt" aria-hidden="true"></i>
                </div>
                <br />
                <span class="badge badge-success mt-3">In Stock</span>
                <br />
                <h6 class="mt-3 mb-0">
                  Price : ${{ product.productinfo.price }} / Pack
                </h6>

                <div class="mt-4 text-xs">
                  <ul>
                    <li>
                      <h6>Active Substance :</h6>
                      <p
                        class="text-xs"
                        v-for="substance in product.substances"
                        :key="substance.id"
                      >
                        {{ substance.name }}
                      </p>
                    </li>
                    <li>
                      <h6>Product Form(s) :</h6>
                      <p
                        class="text-xs"
                        v-for="form in product.forms"
                        :key="form.id"
                      >
                        {{ form.name }} - {{ form.volume }}
                      </p>
                    </li>
                    <li>
                      <h6>Packs(s) :</h6>
                      <p
                        class="text-xs"
                        v-for="pack in product.sizes"
                        :key="pack.id"
                      >
                        {{ pack.size }} / Pack
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="mx-auto col-lg-5 ms-3">
                <ul>
                  <li>
                    <h6 class="mt-2">Marketing Authorization Holder :</h6>
                    <p class="text-xs">
                      {{ product.productinfo.marketing_auth_holder }}
                    </p>
                  </li>

                  <li>
                    <h6>ATC :</h6>
                    <p class="text-xs">
                      {{ product.productinfo.atc }} -
                      {{ product.productinfo.atcDescription }}
                    </p>
                  </li>
                  <li>
                    <h6>Product Number :</h6>
                    <p class="text-xs">
                      {{ product.productinfo.product_number }}
                    </p>
                  </li>

                  <li>
                    <h6>Available Markets :</h6>
                    <p
                      class="text-xs"
                      v-for="country in product.countries"
                      :key="country.id"
                      style="width: 100%; display: block"
                    >
                      {{ country.name }} - {{ country.code }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-5 row">
              <div class="col-lg-9"></div>
              <div class="col-lg-3">
                <div class="d-flex">
                  <router-link
                    :to="{
                      name: 'Edit Product',
                      params: { id: product.productinfo.id },
                    }"
                  >
                    <button
                      class="mb-0 btn bg-gradient-success btn-sm me-2"
                      type="button"
                      name="button"
                    >
                      Edit
                    </button>
                  </router-link>
                  <router-link
                    :to="{
                      name: 'Edit Product',
                      params: { id: product.productinfo.id },
                    }"
                  >
                    <button
                      class="mb-0 btn btn-outline-dark btn-sm"
                      type="button"
                      name="button"
                    >
                      Remove
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Choices from "choices.js";
import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";

export default {
  name: "ProductInfo",
  components: {},
  mounted() {
    const bootstrap = this.$store.state.bootstrap;
    this.getChoices("choices-quantity");
    this.getChoices("choices-material");
    this.getChoices("choices-colors");

    // Gallery Carousel
    if (document.getElementById("products-carousel")) {
      var myCarousel = document.querySelector("#products-carousel");
      // eslint-disable-next-line no-unused-vars
      var carousel = new bootstrap.Carousel(myCarousel);
    }

    // Products gallery

    var initPhotoSwipeFromDOM = function (gallerySelector) {
      // parse slide data (url, title, size ...) from DOM elements
      // (children of gallerySelector)
      var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          linkEl,
          size,
          item;

        for (var i = 0; i < numNodes; i++) {
          figureEl = thumbElements[i]; // <figure> element
          // include only element nodes
          if (figureEl.nodeType !== 1) {
            continue;
          }

          linkEl = figureEl.children[0]; // <a> element

          size = linkEl.getAttribute("data-size").split("x");

          // create slide object
          item = {
            src: linkEl.getAttribute("href"),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10),
          };

          if (figureEl.children.length > 1) {
            // <figcaption> content
            item.title = figureEl.children[1].innerHTML;
          }

          if (linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
            item.msrc = linkEl.children[0].getAttribute("src");
          }

          item.el = figureEl; // save link to element for getThumbBoundsFn
          items.push(item);
        }

        return items;
      };

      // find nearest parent element
      var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
      };

      // triggers when user clicks on thumbnail
      var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function (el) {
          return el.tagName && el.tagName.toUpperCase() === "FIGURE";
        });

        if (!clickedListItem) {
          return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;

        for (var i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue;
          }

          if (childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
          }
          nodeIndex++;
        }

        if (index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe(index, clickedGallery);
        }
        return false;
      };

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
          params = {};

        if (hash.length < 5) {
          return params;
        }

        var vars = hash.split("&");
        for (var i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue;
          }
          var pair = vars[i].split("=");
          if (pair.length < 2) {
            continue;
          }
          params[pair[0]] = pair[1];
        }

        if (params.gid) {
          params.gid = parseInt(params.gid, 10);
        }

        return params;
      };

      var openPhotoSwipe = function (
        index,
        galleryElement,
        disableAnimation,
        fromURL
      ) {
        var pswpElement = document.querySelectorAll(".pswp")[0],
          gallery,
          options,
          items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
          // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute("data-pswp-uid"),

          getThumbBoundsFn: function (index) {
            // See Options -> getThumbBoundsFn section of documentation for more info
            var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
              pageYScroll =
                window.pageYOffset || document.documentElement.scrollTop,
              rect = thumbnail.getBoundingClientRect();

            return {
              x: rect.left,
              y: rect.top + pageYScroll,
              w: rect.width,
            };
          },
        };

        // PhotoSwipe opened from URL
        if (fromURL) {
          if (options.galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (var j = 0; j < items.length; j++) {
              if (items[j].pid == index) {
                options.index = j;
                break;
              }
            }
          } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1;
          }
        } else {
          options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
          return;
        }

        if (disableAnimation) {
          options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(
          pswpElement,
          // eslint-disable-next-line no-undef
          PhotoSwipeUI_Default,
          items,
          options
        );
        gallery.init();
      };

      // loop through all gallery elements and bind events
      var galleryElements = document.querySelectorAll(gallerySelector);

      for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute("data-pswp-uid", i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
      }

      // Parse URL and open gallery if it contains #&pid=3&gid=1
      var hashData = photoswipeParseHash();
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(
          hashData.pid,
          galleryElements[hashData.gid - 1],
          true,
          true
        );
      }
    };

    // execute above function
    initPhotoSwipeFromDOM(".my-gallery");
  },
  created() {
    this.$store.dispatch("loadProduct", this.$route.params.id);
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
  },
  methods: {
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          itemSelectText: "",
          allowHTML: true,
        });
      }
    },
  },
};
</script>
