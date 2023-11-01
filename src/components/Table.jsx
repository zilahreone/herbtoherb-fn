import React from 'react'

function Table({ head, body, foot }) {
  return (
    <>
      <div className="relative overflow-x-auto rounded-t-md border">
        <table className="w-full text-sm text-gray-900 dark:text-gray-400">
          <thead className="text-std text-left text-gray-900 bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            { head }
            {/* <tr>
              <th scope="col" className="px-6 py-3 rounded-l-lg">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                Price
              </th>
            </tr> */}
          </thead>
          <tbody>
            { body }
            {/* <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">
                1
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">
                1
              </td>
              <td className="px-6 py-4">
                $1999
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">
                1
              </td>
              <td className="px-6 py-4">
                $99
              </td>
            </tr> */}
          </tbody>
          <tfoot>
            { foot }
            {/* <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-6 py-3 text-base">Total</th>
              <td className="px-6 py-3">3</td>
              <td className="px-6 py-3">21,000</td>
            </tr> */}
          </tfoot>
        </table>
      </div>
    </>
  )
}

export default Table