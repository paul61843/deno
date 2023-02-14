import { parseHTML } from "https://esm.sh/linkedom";

// <!-- Google tag (gtag.js) -->
const GAScript = `
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-155Q6212Z8"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-155Q6212Z8');
  </script>
`

const { document, customElements, HTMLElement } = parseHTML(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather</title>
    ${GAScript}
    <style>
      * {
        box-sizing: border-box;
        font-family: 微軟正黑體;
      }
      html, body {
        padding: 0;
        margin: 0;
      }
      h1, h2, h3, h4, h5 {
        margin: 0;
      }
      
    </style>
  </head>

  <body></body>
</html>
`);

export { document, customElements, HTMLElement };