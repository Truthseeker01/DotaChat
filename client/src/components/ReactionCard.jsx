import { useOutletContext } from "react-router-dom";


function ReactionCard({setShowReaction, class_name, setReaction, id, setSentMessages, setReceivedMessages}){

    const { currentUser } = useOutletContext()
    function handleClick(e){
        e.stopPropagation();
        setShowReaction(null);
        setReaction(e.target.textContent)

        fetch(`/api/reaction/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({'reaction': e.target.textContent})
        })
        .then(res => res.json())
        .then(msg => {
                
            if (msg.sender_id === currentUser.id) {
                setSentMessages(pre => {
                    const filteredMessages = pre.filter(m => m.id !== msg.id);
                    return [...filteredMessages, msg];
                });
            } else {
                setReceivedMessages(pre => {
                    const filteredMessages = pre.filter(m => m.id !== msg.id);
                    return [...filteredMessages, msg];
                });
            }
        })
    }

    return (
        <div className={class_name}>
            <span style={{border: '1px solid black',
                color: 'white',
                fontSize: '20px',
                }} onClick={handleClick}>😃</span>
            <span style={{border: '1px solid black',
                color: 'white',
                fontSize: '20px',
                }} onClick={handleClick}>😍</span>
            <span style={{border: '1px solid black',
                color: 'white',
                fontSize: '20px',
                }} onClick={handleClick}>🤣</span>
            <span style={{border: '1px solid black',
                color: 'white',
                fontSize: '20px',
                }} onClick={handleClick}>😲</span>
        </div>
    )
}

export default ReactionCard;