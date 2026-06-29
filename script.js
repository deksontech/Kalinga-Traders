const siteConfig = {
  whatsappNumber: "917978186064",
  businessName: "Kalinga Traders"
};

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

function buildInquiryMessage(form) {
  const data = new FormData(form);
  const lines = [
    `New maize inquiry for ${siteConfig.businessName}`,
    `Name: ${data.get("name") || ""}`,
    `Company: ${data.get("company") || ""}`,
    `Phone: ${data.get("phone") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Product: ${data.get("product") || ""}`,
    `Quantity: ${data.get("quantity") || ""} MT`,
    `Delivery Location: ${data.get("location") || ""}`,
    `Message: ${data.get("message") || ""}`
  ];
  return lines.join("\n");
}

function whatsappUrl(message) {
  if (!siteConfig.whatsappNumber) return "";
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".inquiry-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    const url = whatsappUrl(buildInquiryMessage(form));
    if (url) {
      window.open(url, "_blank", "noopener");
    }
    if (note) {
      note.textContent = url
        ? "Your WhatsApp inquiry is ready in a new tab."
        : "Thank you. Add the business WhatsApp number in script.js to send this inquiry directly on WhatsApp.";
    }
    if (url) form.reset();
  });
});

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const message = `Hello ${siteConfig.businessName}, I want to inquire about bulk maize supply.`;
  const url = whatsappUrl(message);
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Please add the business WhatsApp number in script.js before launch.");
    });
  }
});
