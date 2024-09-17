import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [imagesToShow, setImagesToShow] = useState(8);

  const fetchData = async (limit) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
      );

      setData((prevData) => [...prevData, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(imagesToShow);
  }, [page]);

  const loadMore = () => {
    const nextBatch = imagesToShow === 8 ? 12 : 10;
    setImagesToShow(nextBatch);
    fetchData(nextBatch);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setData([]);
    fetchData(imagesToShow);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setData([]);
      fetchData(imagesToShow);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-orange-300 text-center p-4">
        <h1 className="text-white text-2xl">Responsive Image Gallery</h1>
      </header>

      {/* Image Gallery Section */}
      <div className="container mx-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={item.download_url}
              alt={item.author}
              className="object-cover h-80 w-full"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 rounded-b-lg">
              <p className="text-sm">Author: {item.author}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="text-center py-4 flex justify-center space-x-4">
        <button
          onClick={handlePrevPage}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
          disabled={page === 1}
        >
          Previous
        </button>
        <p>Page {page}</p>
        <button
          onClick={handleNextPage}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>

      {/* Load More Button */}
      <div className="flex justify-center py-4">
        <button
          onClick={loadMore}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <svg
                className="w-6 h-6 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2-1h12a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2z"
                />
              </svg>
              <span className="ml-2">Loading...</span>
            </div>
          ) : (
            "Load More"
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
