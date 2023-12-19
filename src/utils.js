// Returns formatted date for specififed offset from current date 
export default function formatDate (offset) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
};