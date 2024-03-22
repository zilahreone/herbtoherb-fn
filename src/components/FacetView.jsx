export default function FacetView(props) {
  let {options, onRemove, onSelect, onMoreClick, showSearch, showMore, showCount } = props
  return (
    <>
      {
        options.map((option, index) => (
          <div key={index} className="checkbox-wrapper-4">
            <input
              className="inp-cbx"
              id={`${option.value}${index}`}
              type="checkbox"
              checked={option.selected}
              onChange={() => (option.selected ? onRemove(option.value) : onSelect(option.value))}
            />
            <label className="cbx" htmlFor={`${option.value}${index}`}>
              <span>
                <svg width="12px" height="10px"><use xlinkHref="#check-4"></use></svg>
              </span>
              <span>{showCount && option.count} {option.value}</span>
            </label>
            <svg className="inline-svg">
              <symbol id="check-4" viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </symbol>
            </svg>
          </div>
        ))
      }
      {
        showMore && <button onClick={onMoreClick}>+ More</button>
      }
      {/* <div>{ JSON.stringify(options) }</div> */}
    </>
  )
}
