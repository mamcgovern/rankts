export function insertionSortWithUser(compareFn, items) {
    const ranked = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let pos = 0;
        while (pos < ranked.length && compareFn(item, ranked[pos]) > 0) pos++;
        ranked.splice(pos, 0, item);
    }
    return ranked;
}