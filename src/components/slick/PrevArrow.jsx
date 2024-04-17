export default function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <div
        className='prev-btn'
        onClick={onClick}>  
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    </>
  )
}
