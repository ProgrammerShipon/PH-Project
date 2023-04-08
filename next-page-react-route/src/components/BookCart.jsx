import React from "react";
import { Link } from "react-router-dom";

const BookCart = ({ book }) => {
	return (
		<div>
			<Link to={`/bookDetails/${book.isbn13}`}>
				<div className="relative overflow-hidden transition duration-200 transform shadow-lg hover:shadow-2xl hover:-translate-y-2">
					<img
						src={book.image}
						alt="book cover"
						className="object-cover w-full h-56 md:h-64 xl:h-80"
					/>

					<div className="bg-black px-6 py-4 flex flex-col bg-opacity-75  transition duration-200 text-gray-300 absolute inset-0 opacity-0 hover:opacity-100 scale-75 hover:scale-100 rounded-lg">
						<p>{book.title}</p>
						<br />
						<p> {book.subtitle.substring(0, 45) + "..."} </p>
						<br />
						<p className="mt-auto"> Price: {book.price} </p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default BookCart;
