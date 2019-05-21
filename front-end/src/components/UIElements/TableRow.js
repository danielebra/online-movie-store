import React from 'react';
const TableRow = ({
    index,
    isEditing,
    value,
    onChange
}) => {
    return (
        <td>
            { isEditing ? (
                <div className="input-field">
                    <input 
                        type="text"
                        value={value}
                        onChange={onChange}
                        className="validate"
                        required
                        aria-required=""
                    />
                </div>
            ) : (
                value
            )}
            
        </td>
    )
}

export default TableRow;
