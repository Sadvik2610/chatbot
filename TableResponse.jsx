import React from 'react';

export default function TableResponse({ rows }) {
  if (!rows || rows.length === 0) return null;
  const headers = Object.keys(rows[0] || {});
  return (
    <div className="table-block" style={{marginTop:6}}>
      <table>
        <thead>
          <tr>
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i) => (
            <tr key={i}>
              {headers.map((h,idx) => <td key={idx}>{String(r[h] ?? '')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
