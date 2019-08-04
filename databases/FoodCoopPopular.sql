SELECT
	DISTINCT
		HIGH_PRIORITY
        STRAIGHT_JOIN
        SQL_SMALL_RESULT
	product_idProduct, Rating
    FROM CustReview
    ORDER BY Rating
		DESC
	LIMIT 20