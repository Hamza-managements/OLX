function CustomBtn(props) {
    return <button
        style={{ width: 80, height: 50, backgroundColor: props.bgColor }}
        onClick={() => alert('0900-78601')}>

        {props.text}

    </button>
}

export default CustomBtn