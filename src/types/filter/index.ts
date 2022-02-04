interface filterBlock {
    mainCategory: string,
    baseUrl: string,
    authRequired: boolean,
    filterItems: Array<filterItem>
}

interface filterItem {
    name: string,
    icon: string,
    link: string
}

export { filterBlock, filterItem }