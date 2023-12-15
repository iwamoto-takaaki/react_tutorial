import { SquareValue } from './types/square-value'

interface SquareProps {
    value: SquareValue
    onClick: () => void
}

export default function Square({ value, onClick }: SquareProps) {
    return (
        <button
            className="square"
            onClick={() => onClick()}>
            {value}
        </button>
    )
}
