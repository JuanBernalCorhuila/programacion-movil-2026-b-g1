package stdx_demo

import stdx.net.http.ServerBuilder

main() {
    let server = ServerBuilder()
        .addr("127.0.0.1")
        .port(8080)
        .build()

    server.distributor.register("/helphealth", { httpContext =>
        httpContext.responseBuilder.body("Hola desde Cangjie - Juan Camilo  ")
    })

    server.serve()
}