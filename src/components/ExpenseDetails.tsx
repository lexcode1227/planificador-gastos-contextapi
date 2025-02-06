import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import { categories } from "../data/catetgories"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailsProps = {
    expense: Expense
    }

const ExpenseDetails = ({expense}: ExpenseDetailsProps) => {
    const { dispatch } = useBudget()
    const categoryInfo = categories.filter(category => category.id === expense.category)[0]
    
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'EDIT_EXPENSE', payload: { id: expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'REMOVE_EXPENSE', payload: { id: expense.id}})}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <article className="bg-white shadow-lg rounded-lg border-b border-gray-200 p-10 w-full flex gap-5 justify-between items-center">
                    <div>
                        <img 
                            src={`/icono_${categoryInfo.icon}.svg`} 
                            alt={categoryInfo.name}
                            className="w-20"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold text-slate-500 uppercase">{categoryInfo.name}</p>
                        <p className="text-xl font-bold">{expense.expenseName}</p>
                        <p className="text-gray-600">{formatDate(expense.date!.toString())}</p>
                    </div>
                    <AmountDisplay amount={expense.amount}/>
                </article>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetails