import React from 'react'

const TableRow = (props) => {
  return (
    <tr>
        <td>{props.datetime}</td>
        <td>{props.open}</td>
        <td>{props.high}</td>
        <td>{props.low}</td>
        <td>{props.close}</td>
        <td className='fw-bold'>{props.volume}</td>
    </tr>
  )
}

export default TableRow