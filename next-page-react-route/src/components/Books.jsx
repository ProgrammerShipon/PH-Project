import React from "react";
import { useLoaderData } from "react-router-dom";
import BookCart from "./BookCart";

const Books = () => {
	const { books } = useLoaderData();

	return (
		<div>
			<div className="my-container">
				<div className="grid gap-6 mb-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
					{books?.map((book) => (
						<BookCart key={book?.isbn13} book={book} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Books;
