import { v4 as uuidv4 } from "uuid";

// Define a telemetry configuration object.
interface TelemetryConfig {
  enabled: boolean;
  // Add other configuration options as needed.
}

// Initialize the telemetry configuration.
let telemetryConfig: TelemetryConfig = {
  enabled: false,
};

// Function to send telemetry data to a service.
export function sendTelemetry(data: any) {
  if (telemetryConfig.enabled) {
    // Send telemetry data to your service.
    console.log("telemetry: ", data);
  }
}

// Decorator to instrument a method with telemetry.
export function Telemetry() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      // Add telemetry logic here before and after method execution.
      sendTelemetry({
        methodName: propertyKey,
        arguments: args,
        id: uuidv4(),
        ts: performance.now(),
        // You can add more telemetry data as needed.
      });

      const result = originalMethod.apply(this, args);

      sendTelemetry({
        methodName: propertyKey,
        result,
        // You can add more telemetry data as needed.
      });

      return result;
    };
    return descriptor;
  };
}

// Function to enable or disable telemetry globally.
export function enableTelemetry(enabled: boolean) {
  telemetryConfig.enabled = enabled;
}
