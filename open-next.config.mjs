export default {
  esbuild: {
    external: [
      "react-server-dom-webpack/client",
      "react-server-dom-webpack/server",
      "react-server-dom-webpack/static",
      "react-server-dom-webpack/server.node",
      "react-server-dom-turbopack/client",
      "react-server-dom-turbopack/server",
      "react-server-dom-turbopack/static",
      "react-dom/static",
      "critters",
      "@opentelemetry/api"
    ]
  }
}
