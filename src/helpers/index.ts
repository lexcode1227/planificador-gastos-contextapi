export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(date))
}