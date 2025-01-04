function createDeepLTranslateWidget() {
  const translateDiv = document.createElement("div");
  translateDiv.id = "deepl_translate_element";
  const targetDiv = document.querySelector(".cover__header-content-title");
  targetDiv.parentNode.insertBefore(translateDiv, targetDiv.nextSibling);

  // Create a select dropdown for languages
  const languages = ["EN", "DE", "FR", "ES", "IT"];
  const select = document.createElement("select");
  select.id = "deepl_language_selector";

  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang;
    option.textContent = lang;
    select.appendChild(option);
  });

  translateDiv.appendChild(select);

  // Event listener to handle language selection
  select.addEventListener("change", function () {
    const textToTranslate = document.body.innerText; // Get the text to translate
    const targetLang = select.value;

    fetch(
      `https://api.deepl.com/v2/translate?auth_key=YOUR_API_KEY&text=${encodeURIComponent(
        textToTranslate
      )}&target_lang=${targetLang}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Replace body text with translated text
        document.body.innerHTML = data.translations[0].text;
      })
      .catch((error) => console.error("Error:", error));
  });
}

function checkForTargetElement() {
  const targetElement = document.querySelector(".cover__header-content-title");
  const buttonExists = document.querySelector("#deepl_translate_element");

  if (targetElement && !buttonExists) {
    createDeepLTranslateWidget();
  }
}

const observer = new MutationObserver(() => {
  checkForTargetElement();
});

observer.observe(document.body, { childList: true, subtree: true });

checkForTargetElement();
const style = document.createElement("style");
style.textContent =
  'iframe[id=":1.container"] { display: none !important; } body {top:0!important }; .goog-logo-link{display:none !important;}.goog-te-gadget{ color:transparent!important;} .VIpgJd-ZVi9od-l4eHX-hSRGPd{display: none} .goog-te-combo { background-color:#fff; color:#000000; border: 1px solid transparent; box-shadow: 0 4px 4px rgba(0,0,0,.1); border-radius:3px; padding:6px 8px; transition: transform .3s;} .skiptranslate.goog-te-gadget{ padding-left: 60px; padding-bottom: 20px;} #goog-gt-tt #goog-gt-vt{ display: none !important; } .VIpgJd-ZVi9od-aZ2wEe-wOHMyf.VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc { display: none !important; }';
document.head.appendChild(style);
