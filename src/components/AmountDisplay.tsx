import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}

const AmountDisplay = ({label, amount}: AmountDisplayProps) => {
  return (
    <article className="text-2xl">
        <p className='text-blue-600 font-bold'>
            { label && `${label}:`}
            <span className='text-black font-bold'> {formatCurrency(amount)}</span>
        </p>
    </article>
  )
}

export default AmountDisplay
