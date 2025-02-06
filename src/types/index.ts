import { Value } from "react-calendar/src/shared/types.js"

export type Expense = {
    id: string
    expenseName: string
    amount: number
    category: string
    date: Value
}

export type DraftExpense = Omit<Expense, 'id'>

export type Category = {
    id: string
    name: string
    icon: string
}