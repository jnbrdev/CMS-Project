import React, {useState, useEffect, useRef} from 'react'
import '../../../all-views-scss/_accordion.scss'
import Chevron from './chevron.svg'

export default function FAQ_unitowner() {

    const [toggle, setToggle] = useState(false)
    const [heightEl, setHeightEl] = useState(-1);

    const refHeight = useRef()

    useEffect(() => {
        console.log(refHeight);
        setHeightEl(`${refHeight.current.scrollHeight}px`)
    }, [])

    const toggleState = () => {
        setToggle(!toggle)
    }

    console.log(toggle);
    return (
        <div>
            <div className="accordion">
                <button 
                onClick={toggleState}
                className="accordion-visible">
                    <span>Lorem ipsum dolor sit amet.</span>
                    <img 
                    className={toggle && "active"}
                    src={Chevron} />
                </button>
                
                <div 
                    className={toggle ? "accordion-toggle animated" : "accordion-toggle"}
                    style={{height: toggle ? `${heightEl}` : "0px"}}
                    ref={refHeight}
                    >
                    <p aria-hidden={toggle ? "true" : "false"}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, suscipit quae maiores sunt ducimus est dolorem perspiciatis earum corporis unde, dicta quibusdam aut placeat dignissimos distinctio vel quo eligendi ipsam.
                    </p>
                </div>
            </div>
        </div>
    )
}