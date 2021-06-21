import React from 'react'
import PropTypes from 'prop-types';


GameListPagination.propTypes = {
  dispatch: PropTypes.func,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      label: PropTypes.string,
      url: PropTypes.string
    })
  ),
  hasData: PropTypes.bool,
}
export default function GameListPagination({dispatch, links, hasData}) {

  if (!hasData) {
    return null
  }

  return (
    <div>
      <nav className="d-flex justify-content-center">
        <ul className="pagination table-responsive">
        {links !== undefined && links.map((link, i) => {

          const isPrev = link.label.includes("Previous");
          const isNext = link.label.includes("Next");

          const label = isPrev ? <span className="text-nowrap">&laquo; Previous</span> : isNext ? <span className="text-nowrap">Next &raquo;</span> : link.label

          return (
            <li key={i} className={`page-item ${link.active ? "active" : link.url === null ? "disabled" : null}`}>
              <span 
                role="button" 
                aria-label={label} 
                className={`page-link`}
                onClick={() => dispatch({type: "search-url", payload: link.url})}
                >
                <span aria-hidden="true">{label}</span>
              </span>
            </li>
          )
        })}
        </ul>
      </nav>
    </div>
  )
}
