import React from 'react';

function ForwordAndBack({ totalPages, currentPage, onPageChange }) {
  const pages = [];

  let start = Math.max(1, currentPage - 1);
  let end = Math.min(totalPages, start + 2);

  if (end - start < 2) {
    start = Math.max(1, end - 2);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="mt-3">
      <ul className="pagination justify-content-center">
        <li className={`page-item mx-1 ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item mx-1 ${currentPage === page ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item mx-1 ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default ForwordAndBack;
