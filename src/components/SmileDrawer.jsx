import React, { useRef } from 'react'
import { useEffect } from 'react'
import SmilesDrawer, { SmiDrawer } from 'smiles-drawer'

function SmileDrawer({ smilesStr, uniqueKey = null }) {

  let moleculeOptions = {};
  let reactionOptions = {};
  // const unique = uniqueKey ? `#imgExample${uniqueKey}` : '#imgExample'
  
  useEffect(() => {
    // console.log(smilesStr);
    if (smilesStr) {
      let sd = new SmiDrawer(moleculeOptions, reactionOptions);
      sd.draw(smilesStr, `#${uniqueKey}`)
      // sd.draw(smilesStr, '#svgExample')
    }
    // sd.draw('C=CCBr.[Na+].[I-]>CC(=O)C>C=CCI.[Na+].[Br-]', '#svgExample', 'dark')
  }, [])


  return (
    // <canvas id='output-canvas' ref={canvasRef} />
    // <img data-smiles={smilesStr} data-smiles-options="{ 'height': 300 }" />
    <>
    {/* <img id={`${uniqueKey}`} data-smiles-options="{ 'width': 400, 'height': 400 }" /> */}
      <svg id={`${uniqueKey}`}  />
    </>

  )
}

export default SmileDrawer