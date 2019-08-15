SELECT
	DISTINCT
		HIGH_PRIORITY
        STRAIGHT_JOIN
        SQL_SMALL_RESULT
	product_idProduct, Rating
    FROM CustReview
    GROUP BY Rating
		DESC
	LIMIT 20
    INTO OUTFILE 'foodCoopPopular.pdf'
