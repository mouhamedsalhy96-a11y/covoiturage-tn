
import { createHash } from "crypto";

export function getPaymeeBaseUrl() {
  const mode = process.env.PAYMEE_MODE ?? "sandbox";

  if (mode === "live") {
    return "https://app.paymee.tn";
  }

  return "https://sandbox.paymee.tn";
}

export function getPaymeeApiToken() {
  const apiToken = process.env.PAYMEE_API_TOKEN;

  if (!apiToken) {
    throw new Error("PAYMEE_API_TOKEN is missing.");
  }

  return apiToken;
}

export function getPaymeeApiKey() {
  return process.env.PAYMEE_API_KEY || getPaymeeApiToken();
}

export function buildPaymeeChecksum(token: string, paymentStatus: string) {
  const apiToken = getPaymeeApiToken();

  return createHash("md5")
    .update(`${token}${paymentStatus}${apiToken}`)
    .digest("hex");
}

export function verifyPaymeeChecksum(
  token: string,
  paymentStatus: string,
  checksum: string
) {
  const expected = buildPaymeeChecksum(token, paymentStatus);
  return expected.toLowerCase() === checksum.toLowerCase();
}
