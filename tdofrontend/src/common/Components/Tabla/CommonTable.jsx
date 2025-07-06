
export default function CommonTable({ columns, data, actions }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-4 py-2 text-left border-b">
                {col.header}
              </th>
            ))}
            {actions && <th className="px-4 py-2 border-b">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="odd:bg-white even:bg-gray-50">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-2 border-b">
                  {typeof col.render === 'function'
                    ? col.render(row[col.key], row)
                    : row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-2 border-b whitespace-nowrap">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
