window.addEventListener("load", () => {
  document.querySelectorAll(".sd-qrcode").forEach((e, _) => {
    const withSDico = e.getAttribute("data-icon") ?? "";
    if (withSDico === "")
      e.innerHTML = window.QRCodeRender(
        window.QRCodeGetMatrix(e.getAttribute("data-url")),
        "#000",
      );
    else {
      const qr = window.QRCodeRender(
        window.QRCodeGetMatrix(e.getAttribute("data-url"), EcLevels.H),
        "#000",
      );
      e.innerHTML = `<div class="sd-qrcode-wrapper">${qr}<div class="sd-qrcode-icon"><img src="${withSDico}" /></div></div>`;
    }
  });
});
