export const usDollarValue = Intl.NumberFormat("en-US", { maximumSignificantDigits: 6 });
export const usDollar = Intl.NumberFormat("en-US", { style: "currency", currency: "USD", });
export const realCurrency = Intl.NumberFormat("pr-BR", { style: "currency", currency: "BRL", });