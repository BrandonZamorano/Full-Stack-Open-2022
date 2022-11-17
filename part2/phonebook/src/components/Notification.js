const Notification = ({message, notificationType}) => {
    const notificationStyle = {
        color: `green`,
        fontSize: `2rem`,
        padding: `.5em`,
        border: `2px solid green`,
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