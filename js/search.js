function searchPurpose(keyword, purposes) {
    keyword = keyword.toLowerCase();

    return purposes.filter(item =>
        item.toLowerCase().includes(keyword)
    );
}
