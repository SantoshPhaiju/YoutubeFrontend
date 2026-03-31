export function formatViews(views: number): string {
    if (views < 1000) return views.toString();

    const units = ["K", "M", "B", "T"];
    let unitIndex = -1;

    while (views >= 1000 && unitIndex < units.length - 1) {
        views /= 1000;
        unitIndex++;
    }

    return `${views % 1 === 0 ? views : views.toFixed(1)}${units[unitIndex]}`;
}
