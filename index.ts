import {
    LoggerProvider,
    SimpleLogRecordProcessor
} from "@opentelemetry/sdk-logs";
import {Resource} from "@opentelemetry/resources";
import {OTLPLogExporter} from "@opentelemetry/exporter-logs-otlp-http";

const simpleLogRecordProcessor = new SimpleLogRecordProcessor(
    new OTLPLogExporter({
        url: "http://localhost:8443/v1/logs",
    }),
);

const loggerProvider = new LoggerProvider({
    resource: new Resource({
        "service.name": "demo-app",
    })
});

loggerProvider.addLogRecordProcessor(
    simpleLogRecordProcessor
)

const loggerOtel = loggerProvider.getLogger('default', '1.0.0');

const button = document.getElementById("button");
button?.addEventListener("click", () => {
    loggerOtel.emit({
        body: "Hello Otel!"
    })
});
