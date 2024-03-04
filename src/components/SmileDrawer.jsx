import React, { useRef } from 'react'
import { useEffect } from 'react'
import SmilesDrawer, { SmiDrawer } from 'smiles-drawer'

function SmileDrawer({ smilesStr }) {

  SmiDrawer.apply()
  // useEffect(() => {
  // }, [])

  return (
    // <canvas id='output-canvas' ref={canvasRef} />
    <img data-smiles={smilesStr} data-smiles-options="{ 'height': 300 }" />
  )
}

export default SmileDrawer