import React, { useState, useEffect, useRef } from 'react'
import styles from './ToggleSelector.module.scss'

interface ToggleSelectorProps {
  options: {
    label: string;
    value: any;
  }[];
  onSelect: (value: any) => any;
  initial: number;
}

const ToggleSelector: React.FC<ToggleSelectorProps> = ({options, onSelect, initial}) => {
  const [selected, setSelected] = useState(initial);
  const [toggleLeft, setToggleLeft] = useState(0);
  const [toggleWidth, setToggleWidth] = useState(0);
  const selectorRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement|null)[]>([]);

  useEffect(() => {
    onSelect(options[initial].value)
  },[])

  function calculateToggle() {
    const selectorRect = selectorRef.current?.getBoundingClientRect();
    const buttonRect = buttonsRef.current[selected]?.getBoundingClientRect();
    setToggleLeft(buttonRect!.left - selectorRect!.left);
    setToggleWidth(buttonRect!.width);
  }

  useEffect(() => {
    calculateToggle();
  },[selected])

  const observer = new ResizeObserver((entry) => {
    calculateToggle();
  })
  
  useEffect(() => {
    observer.observe(selectorRef.current as Element);
    return () => {
      observer.disconnect();
    }
  },[])

  interface selectorStyleInterface extends React.CSSProperties {
    "--toggleLeft": string;
    "--toggleWidth": string;
  }
  const selectorStyle: selectorStyleInterface = {
    "--toggleLeft": toggleLeft + "px",
    "--toggleWidth": toggleWidth + "px"
  }

  return (
    <div
      ref={selectorRef}
      className={styles.ToggleSelector}
      style={selectorStyle}
    >
      {options.map((option, i) => (
      <button
        ref={(el) => buttonsRef.current[i] = el} 
        className={`
          ${styles.button}
          ${i === selected ? styles.selected : ""}
        `}
        key={i}
        onClick={() => {
          setSelected(i);
          onSelect(option.value)
        }}
      >
        {option.label}
      </button>
      ))}
    </div>
  )
}

export default ToggleSelector;