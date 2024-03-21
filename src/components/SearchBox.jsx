import React from 'react'

export default function SearchBox({ setSearchTerm, searchTerm }) {
  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  }
  return (
    <>
      <input type="text" onChange={handleFilter} value={searchTerm} placeholder='พิมพ์ข้อความ เช่น ชื่อพืช ชื่ออาหาร ชื่อส่วนผสม...' />
    </>
  )
}
