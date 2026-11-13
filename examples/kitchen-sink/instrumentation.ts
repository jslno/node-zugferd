import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

const sdk = new NodeSDK({
	resource: resourceFromAttributes({
		[ATTR_SERVICE_NAME]: "kitchen-sink",
	}),
	traceExporter: new OTLPTraceExporter({
		url: "http://localhost:4318/v1/traces",
	}),
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

process.once("SIGTERM", () => void sdk.shutdown());
process.once("SIGINT", () => void sdk.shutdown());
