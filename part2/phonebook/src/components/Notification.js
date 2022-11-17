const Notification = ({message, notificationType}) => {
    const color = notificationType === 'error' ? 'red' : 'green'
    const notificationStyle = {
        color,
        fontSize: `2rem`,
        padding: `.5em`,
        border: `2px solid ${color}`,
        borderRadius: `.25em`,
        backgroundColor: 'lightgray',
        margin: '.5em'
    }
    
    if (message === null) {
        return null;
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification;