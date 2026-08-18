import { useState } from 'react'

const ReviewForm = ({ onAddReview }) => {
    const [author, setAuthor] = useState('')
    const [score, setScore] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!author.trim() || !score || !comment.trim()) {
            setError('Todos los campos son obligatorios')
            return
        }

        const numericScore = Number(score)

        if (numericScore < 1 || numericScore > 5) {
            setError('El puntaje debe estar entre 1 y 5')
            return
        }

        setError('')

        await onAddReview({
            author,
            score: numericScore,
            comment
        })

        setAuthor('')
        setScore('')
        setComment('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Agregar reseña</h3>

            <div>
                <label>Autor</label>
                <input
                    type="text"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                />
            </div>

            <div>
                <label>Puntaje</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={score}
                    onChange={(event) => setScore(event.target.value)}
                />
            </div>

            <div>
                <label>Comentario</label>
                <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
            </div>

            {error && <p>{error}</p>}

            <button type="submit">Agregar reseña</button>
        </form>
    )
}

export default ReviewForm