const ReviewList = ({ reviews, onDeleteReview }) => {
    return (
        <div>
            <h3>Reseñas</h3>

            {reviews.length === 0 ? (
                <p>Todavía no hay reseñas.</p>
            ) : (
                reviews.map(review => (
                    <div key={review.id}>
                        <p>Autor: {review.author}</p>
                        <p>Puntaje: {review.score}</p>
                        <p>{review.comment}</p>

                        <button onClick={() => onDeleteReview(review.id)}>
                            Eliminar
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}

export default ReviewList