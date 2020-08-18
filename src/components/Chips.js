import React from 'react'
import './css/Chips.css'
function Chips({tag}) {
    return (
        <div className="chip">
            <strong>#</strong>
            {tag}
        </div>
    )
}

export default Chips
