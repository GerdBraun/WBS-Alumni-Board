export const OpenCloseMenu = () =>{ //this js code snippet uses an event listener to close all <details> elements except the one that was clicked.
    document.querySelectorAll("details summary").forEach((summary) => {
      summary.addEventListener("click", function (event) {
        // Close all other <details> elements
        document.querySelectorAll("details").forEach((details) => {
          if (details !== this.parentNode) {
            details.removeAttribute("open");
          }
        });
      });
    });
    //This JS code snippet closes all <details> elements if the click happens outside of any <details>.
    document.addEventListener("click", function (event) {
      if (!event.target.closest("details")) {
        document.querySelectorAll("details").forEach((details) => {
          details.removeAttribute("open");
        });
      }
    });}