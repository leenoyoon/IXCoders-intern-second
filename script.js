document.addEventListener("DOMContentLoaded", function () {
  const translations = {
    en: {
      tab_title: "Hosting Company",
      nav_services: "Our Services",
      nav_about: "About",
      nav_blog: "Blog&News",
      nav_contact: "Contact",
      nav_account: "Account",
      lang_btn: "EN",
      hero_title: "Premium Web</br> Hosting for Your</br> Website",
      hero_desc:
        "Blazing fast web hosting for individuals and businesses of all sizes backed by 24x7x365 Support.",
      hero_btn_main: "Create an Account",
      hero_btn_secondary: "Choose your plane",
    },
    ar: {
      tab_title: "شركة استضافة",
      nav_services: "خدماتنا",
      nav_about: "من نحن",
      nav_blog: "المدونة والأخبار",
      nav_contact: "اتصل بنا",
      nav_account: "الحساب",
      lang_btn: "عربي",
      hero_title: "استضافة مواقع</br> مميزة لموقعك</br> الإلكتروني",
      hero_desc:
        "استضافة مواقع سريعة للأفراد والشركات من جميع الأحجام، مدعومة بدعم فني 24/7/365.",
      hero_btn_main: "إنشاء حساب",
      hero_btn_secondary: "اختر خطتك",
    },
  };

  const pricingSwitch = document.getElementById("pricingSwitch");
  const priceElements = document.querySelectorAll(".price");
  const periodElements = document.querySelectorAll(".price-period");
  const discountBadge = document.querySelector(".discount-badge");

  let monthlyPrices = [];
  priceElements.forEach((priceEl) => {
    monthlyPrices.push(parseFloat(priceEl.textContent.replace("$", "")));
  });

  const langSwitcherButton = document.getElementById("langSwitcherButton");
  const htmlTag = document.documentElement;
  const bootstrapLtrLink = document.getElementById("bootstrap-ltr");
  const bootstrapRtlLink = document.getElementById("bootstrap-rtl");

  function translatePage(lang) {
    document.querySelectorAll("[data-lang-key]").forEach((element) => {
      const key = element.getAttribute("data-lang-key");
      if (translations[lang] && translations[lang][key]) {
        element.innerHTML = translations[lang][key];
      }
    });

    document.title = translations[lang]["tab_title"];
  }

  function setLanguage(lang) {
    if (lang === "ar") {
      htmlTag.lang = "ar";
      htmlTag.dir = "rtl";
      bootstrapLtrLink.disabled = true;
      bootstrapRtlLink.disabled = false;
    } else {
      htmlTag.lang = "en";
      htmlTag.dir = "ltr";
      bootstrapLtrLink.disabled = false;
      bootstrapRtlLink.disabled = true;
    }

    translatePage(lang);
    localStorage.setItem("userLanguage", lang);
  }

  if (langSwitcherButton) {
    langSwitcherButton.addEventListener("click", function (e) {
      e.preventDefault();
      const currentLang = htmlTag.lang || "en";
      const newLang = currentLang === "en" ? "ar" : "en";
      setLanguage(newLang);
    });
  }

  const savedLang = localStorage.getItem("userLanguage");
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    setLanguage("en");
  }

  if (pricingSwitch) {
    pricingSwitch.addEventListener("change", function () {
      if (this.checked) {
        priceElements.forEach((priceEl, index) => {
          const monthlyPrice = monthlyPrices[index];
          const yearlyPrice = monthlyPrice * 12;
          const discountedYearlyPrice = yearlyPrice * 0.8;
          priceEl.textContent = "$" + discountedYearlyPrice.toFixed(2);
        });
        periodElements.forEach((periodEl) => {
          periodEl.textContent = "Per year";
        });
      } else {
        priceElements.forEach((priceEl, index) => {
          const monthlyPrice = monthlyPrices[index];
          priceEl.textContent = "$" + monthlyPrice.toFixed(2);
        });
        periodElements.forEach((periodEl) => {
          periodEl.textContent = "Per month";
        });
      }
    });
  }
});
