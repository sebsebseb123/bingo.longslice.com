import { DataStore } from '@aws-amplify/datastore'
import { Game } from '../models';
import { useEffect, useState } from 'react'

export default function GameGrid(props) {
  // const [shots, setShots] = useState([]);
  // const [ships, setShips] = useState([]);
  const [bodyRows, setBodyRows] = useState([]);

  const alpha = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  let cols = [];
  let headerRows = [];
  for (let j = 0; j < 11; j++) {
    let key = j == 0 ? 'X' : alpha[j];
    let label = j == 0 ? '' : key;
    cols.push(<th className="header" key={key}>{label}</th>);
  }
  headerRows.push(<tr key={'headerRow'}>{cols}</tr>);

  useEffect(() => {
    let rows = [];
    for (let i = 1; i < 11; i++) {
      cols = [];
      for (let j = 0; j < 11; j++) {
        let key = alpha[j] + i;
        let label = j == 0 ? key : '';
        let className = j == 0 ? 'header' : 'grid';
        className += props.shots.includes(key) ? ' hit' : '';
        cols.push(<td className={className} key={key}>{label}</td>);
      }
      rows.push(<tr className={'row-' + i} key={'row-' + i}>{cols}</tr>);
    }
    setBodyRows(rows);
  }, [props.shots]);

  return (
    <>
      <h3 className='box'>Targeting Scanner</h3>
      <table>
        <thead>{headerRows}</thead>
        <tbody>{bodyRows}</tbody>
      </table>
    </>
  )
}
