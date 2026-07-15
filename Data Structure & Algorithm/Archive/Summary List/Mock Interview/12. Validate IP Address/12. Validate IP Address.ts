// 12. Validate IP Address

// Validate an IP address (IPv4). An address is valid if and only if it is in the form "X.X.X.X", where each X is a number from 0 to 255.

// For example, "12.34.5.6", "0.23.25.0", and "255.255.255.255" are valid IP addresses, while "12.34.56.oops", "1.2.3.4.5", and "123.235.153.425" are invalid IP addresses.

// Examples:
// ip = '192.168.0.1'
// output: true

// ip = '0.0.0.0'
// output: true

// ip = '123.24.59.99'
// output: true

// ip = '192.168.123.456'
// output: false

export function validateIPv4(ip: string): boolean {
  const parts = ip.split('.');

  if (parts.length !== 4) {
    return false;
  }

  for (const part of parts) {
    // Each part should be a non-empty string of digits
    if (part.length === 0 || isNaN(Number(part))) {
      return false;
    }

    // Convert the part to a number and check the range
    const num = Number(part);
    if (num < 0 || num > 255) {
      return false;
    }

    // Ensure no leading zeros (e.g., "01" is invalid)
    if (part !== String(num)) {
      return false;
    }
  }

  return true;
}

// Test cases
const testIPs = [
  '192.168.0.1', // true
  '0.0.0.0', // true
  '123.24.59.99', // true
  '192.168.123.456', // false
  '12.34.5.6', // true
  '255.255.255.255', // true
  '12.34.56.oops', // false
  '1.2.3.4.5', // false
  '123.235.153.425', // false
];

// Validate and print results
testIPs.forEach((ip) => {
  console.log(`${ip}: ${validateIPv4(ip)}`);
});
