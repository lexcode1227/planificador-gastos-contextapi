import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: 'ADD_BUDGET', payload: { budget: number} } |
    { type: 'SHOW_MODAL' } |
    { type: 'HIDE_MODAL' } |
    { type: 'ADD_EXPENSE', payload: { expense: DraftExpense } } |
    { type: 'REMOVE_EXPENSE', payload: { id: Expense["id"] } } |
    { type: 'EDIT_EXPENSE', payload: { id: Expense["id"] } } |
    { type: 'UPDATE_EXPENSE', payload: { expense: Expense } } |
    { type: 'RESET' }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense["id"]
}

const initialBudget = () : number => {
    const storedBudget = localStorage.getItem('budget')
    return storedBudget ? +storedBudget : 0
}

const localStorageExpense = () : Expense[] => {
    const localStorageExp = localStorage.getItem('expenses')
    return localStorageExp ? JSON.parse(localStorageExp) : []
}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpense(),
    editingId: ""
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = ( 
    state: BudgetState = initialState, 
    action: BudgetActions
    ) => {

    switch (action.type) {
        case 'ADD_BUDGET':
            return {
                ...state,
                budget: action.payload.budget
            }

        case 'SHOW_MODAL':
            return {
                ...state,
                modal: true
            }

        case 'HIDE_MODAL':
            return {
                ...state,
                modal: false,
                editingId: ""
            }

        case 'ADD_EXPENSE':
            const expense = createExpense(action.payload.expense)
            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false
            }

        case 'REMOVE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            }
        
        case 'EDIT_EXPENSE':
            return {
                ...state,
                editingId: action.payload.id,
                modal: true
            }

        case 'UPDATE_EXPENSE':
            const updatedExpenses = state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense)
            return {
                ...state,
                expenses: updatedExpenses,
                editingId: "",
                modal: false
            }
        
        case 'RESET':
            return {
                ...state,
                budget: 0,
                expenses: []
            }

        default:
            return state
    }
}