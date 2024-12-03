export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}