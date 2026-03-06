export function formatDate(date) {
    const d = new Date(date)

    const year = d.getFullYear().toString().slice(-2) // last 2 digits
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}