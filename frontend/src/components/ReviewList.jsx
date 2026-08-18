const renderStars = (score) => {
    return Array.from(
        { length: 5 },
        (_, index) => (
            <span
                key={index}
                className={
                    index < score
                        ? 'star filled'
                        : 'star'
                }
            >
                ★
            </span>
        )
    )
}

const getInitials = (author) => {
    const parts = author
        .trim()
        .split(' ')
        .filter(Boolean)

    if (parts.length === 1) {
        return parts[0]
            .slice(0, 2)
            .toUpperCase()
    }

    return (
        parts[0][0] +
        parts[1][0]
    ).toUpperCase()
}

const ReviewList = ({
    reviews,
    onDeleteReview
}) => {
    return (
        <section className="reviews-section">
            <div className="section-heading">
                <h2>Reseñas</h2>

                <span>
                    {reviews.length}{' '}
                    reseña
                    {reviews.length !== 1
                        ? 's'
                        : ''}
                </span>
            </div>

            {reviews.length === 0 ? (
                <div className="empty-reviews">
                    Todavía no hay reseñas.
                </div>
            ) : (
                <div className="reviews-list">
                    {reviews.map((review) => (
                        <article
                            className="review-card"
                            key={review.id}
                        >
                            <div className="review-avatar">
                                {getInitials(
                                    review.author
                                )}
                            </div>

                            <div className="review-content">
                                <div className="review-header">
                                    <div className="review-author">
                                        <strong>
                                            {review.author}
                                        </strong>

                                        <span>
                                            Reseña de usuario
                                        </span>
                                    </div>

                                    <div className="review-actions">
                                        <div className="review-rating">
                                            <div className="stars">
                                                {renderStars(
                                                    review.score
                                                )}
                                            </div>

                                            <span>
                                                {review.score}/5
                                            </span>
                                        </div>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                onDeleteReview(
                                                    review.id
                                                )
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>

                                <p>
                                    {review.comment}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ReviewList