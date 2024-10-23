// formatData.js

// Function to capitalize the first letter of a string
export function capitalizeFirstLetter(string) {
  if (typeof string !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to format a date in a readable format (e.g., "January 1, 2024")
export function formatDate(date) {
  if (!date) return "";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

// Function to truncate a long string and add ellipsis
export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// Function to format numbers (e.g., 1000 to 1,000)
export function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

// Function to sanitize a string by removing unwanted characters
export function sanitizeString(str) {
  return str.replace(/[^a-zA-Z0-9 ]/g, "");
}

