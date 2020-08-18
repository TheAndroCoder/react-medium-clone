import React from 'react'

function Modal({show,children}) {
    const display = show?'modal show':'modal';
    return (
        <div className={display}>
            <div className="modal-main">
                {children}
            </div>
        </div>
    )
}

export default Modal
