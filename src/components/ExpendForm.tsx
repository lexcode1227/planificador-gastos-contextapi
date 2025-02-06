import { ChangeEvent, useEffect, useState } from "react"
import DatePicker from "react-date-picker"
import ErrorMessage from "./ErrorMessage"
import { categories } from "../data/catetgories"
import { DraftExpense } from "../types"
import { Value } from "react-calendar/src/shared/types.js"
import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"
import { useBudget } from "../hooks/useBudget"

const ExpendForm = () => {
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })
    const [error, setError] = useState<string>("")
    const [previousAmount, setPreviousAmount] = useState(0)
    const { state, dispatch, remainingBudget } = useBudget()

    useEffect(() => {
        if(state.editingId) {
            const expenseToEdit = state.expenses.filter(expense => expense.id === state.editingId)[0]
            setExpense(expenseToEdit)
            setPreviousAmount(expenseToEdit.amount)
        }
    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleChangeDate = (date: Value) => {
        setExpense({
            ...expense,
            date
        });
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(expense).includes('') || expense.amount <= 0) {
            setError("Todos los campos son obligatorios")
            return
        }

        if( (expense.amount - previousAmount) > remainingBudget) {
            setError("Ese gasto supera el presupuesto restante")
            return
        }

        if(state.editingId) {
            dispatch({ type: 'UPDATE_EXPENSE', payload: {expense: { id: state.editingId, ...expense}} })
        } else {
            dispatch({ type: 'ADD_EXPENSE', payload: {expense} })
        }
    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
        </legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-blue-500 font-bold">Nombre del Gasto:</label>
            <input 
                type="text" 
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-blue-500 font-bold">Cantidad:</label>
            <input 
                type="number" 
                id="amount"
                placeholder="Añade la cantidad del gasto: ej. 300"
                className="bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-blue-500 font-bold">Catetgoria:</label>
            <select 
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                {categories.map((category) => (
                    <option 
                        key={category.id} 
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-blue-500 font-bold">Fecha Gasto:</label>
            <DatePicker
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate} 
            />
        </div>
        <input 
            type="submit"
            className="bg-blue-600 text-white w-full font-bold p-2 rounded-lg hover:bg-blue-700 cursor-pointer uppercase"
            value={state.editingId ? "Guardar Cambios" : "Registrar Gasto"}
        />
    </form>
  )
}

export default ExpendForm
