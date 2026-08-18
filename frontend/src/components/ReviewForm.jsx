import { useState } from 'react'

const ReviewForm = ({ onAddReview }) => {
    const [author, setAuthor] = useState('')
    const [score, setScore] = useState(0)
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (
            !author.trim() ||
            !score ||
            !comment.trim()
        ) {
            setError(
                'Todos los campos son obligatorios'
            )
            return
        }

        setError('')

        try {
            await onAddReview({
                author,
                score,
                comment
            })

            setAuthor('')
            setScore(0)
            setComment('')
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                setError(
                    'No se pudo conectar con el servidor'
                )
            } else {
                setError(
                    error.message ||
                    'No se pudo agregar la reseña'
                )
            }
        }
    }

    return (
        <section className="review-form-section">
            <h2>
                Agregar reseña
            </h2>

            <form
                className="review-form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label htmlFor="author">
                        Tu nombre
                    </label>

                    <input
                        id="author"
                        type="text"
                        placeholder="Ej.: Josefina"
                        value={author}
                        onChange={(event) =>
                            setAuthor(
                                event.target.value
                            )
                        }
                    />
                </div>

                <div className="form-group">
                    <label>
                        Puntaje
                    </label>

                    <div className="rating-selector">
                        {[1, 2, 3, 4, 5].map(
                            (value) => (
                                <button
                                    key={value}
                                    type="button"
                                    className={
                                        value <= score
                                            ? 'rating-star active'
                                            : 'rating-star'
                                    }
                                    onClick={() =>
                                        setScore(value)
                                    }
                                >
                                    ★
                                </button>
                            )
                        )}
                    </div>

                    <span className="rating-helper">
                        {score
                            ? `${score} de 5`
                            : 'Seleccioná un puntaje'}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="comment">
                        Comentario
                    </label>

                    <textarea
                        id="comment"
                        placeholder="¿Qué te pareció la película?"
                        value={comment}
                        onChange={(event) =>
                            setComment(
                                event.target.value
                            )
                        }
                    />
                </div>

                {error && (
                    <p className="message error-message">
                        {error}
                    </p>
                )}

                <button
                    className="submit-review-button"
                    type="submit"
                >
                    Publicar reseña
                </button>
            </form>
        </section>
    )
}

export default ReviewForm