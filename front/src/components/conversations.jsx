import { useState } from 'react';
import './styles/collections.css';

function Conversations({ isExpanded, onExpand, onCollapse }) {
  const initialConvos = [
    {name: "Krish", conversation: [
      {speaker: "Krish", text: "Hi John!"},
      {speaker: "John", text: "Hi Krish, you looking for something to borrow?"},
      {speaker: "Krish", text: "Yep, got a house reno in a week and I'd like a power drill for the weekend"},
      {speaker: "John", text: "Oo alright yeah ive got one available then. Would you like to pick up or have it delivered? Delivery will be an extra $10"},
    ]},
    {name: "Jacob", conversation: [
      {speaker: "Jacob", text: "Hey John, ive just got a couple questions regarding your power drill"},
      {speaker: "John", text: "Yeah whats up Jacob?"},
      {speaker: "Jacob", text: "Whatre the availabilities for next weekend, and how long are you willing to rent it out for?"},
      {speaker: "John", text: "Ah, unfortunately its being lent out at that time, but im happy to lend it afterwards for up to a week. Ill throw in a 20% discount for ya if youre willing to wait :)"},
    ]},
    {name: "Marsya", conversation: [
      {speaker: "Marsya", text: "Hey John, I saw your post about lending out a cordless drill. Is it still available?"},
      {speaker: "John", text: "Hi Marsya, yes it’s available. What day do you need it?"},
      {speaker: "Marsya", text: "I’m planning to put together some shelves this weekend, so ideally from Saturday morning until Sunday evening."},
      {speaker: "John", text: "That should be fine. I usually ask for a $20 rental fee for the weekend. Does that work?"},
    ]},
    {name: "Declan", conversation: [
      {speaker: "Declan", text: "Hey, I heard you’ve got a drill I can borrow?"},
      {speaker: "John", text: "Yeah, I do. What’s the project?"},
      {speaker: "Declan", text: "Just putting together some IKEA furniture. Shouldn’t take more than a day."},
      {speaker: "John", text: "Cool, no problem. You can take it for the weekend. Just bring it back by Sunday evening."},
    ]},
    {name: "Zhitian", conversation: [
      {speaker: "Zhitian", text: "Hi, I’d like to rent your drill listed on the app. Is it available Friday?"},
      {speaker: "John", text: "Hello Zhitian, yes it’s available. Standard rate is $10 per day, $25 for the weekend."},
      {speaker: "Zhitian", text: "Great, I’ll book it for two days (Friday–Saturday)."},
      {speaker: "John", text: "Confirmed. Pickup from ______ after 5 PM Friday. Please return it by 8 PM Saturday."},
    ]},
    {name: "Bartholomew", conversation: [
      {speaker: "Bartholomew", text: "Greetings earthling :^) I am Bartholomew III, from the planet of Steparine, and I am looking for an identified flying object"},
      {speaker: "John", text: "Sorry, I do not own IFOs, but you can have a UFO if you wish for $69 a day :)"},
      {speaker: "Bartholomew", text: "gjhifpabfe"},
    ]}
  ];

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedConvoIdx, setSelectedConvoIdx] = useState(null);
  const [textToSend, setTextToSend] = useState("");
  const [dummyConvos, setDummyConvos] = useState(initialConvos);

  const sendText = (e) => {
    e.preventDefault();
    if (selectedConvoIdx === null || textToSend.trim() === "") return;

    setDummyConvos(prev =>
      prev.map((convo, i) =>
        i === selectedConvoIdx
          ? { ...convo, conversation: [...convo.conversation, { speaker: "John", text: textToSend }] }
          : convo
      )
    );
    setTextToSend(""); // clear input
  };

  return (
    <div className={isExpanded ? "expanded-container" : "minimised-container"}>
      <button className="collection-title"
        onClick={isExpanded ? onCollapse : onExpand}
      >
        Conversations {isExpanded ? '⌄' : '>'}
      </button>

      <div className="items-container">
        {/* Map through conversations n display them, dummy first */}
        {dummyConvos.map((convo, index) => (
          <button key={index} onClick={() => {setSelectedConvoIdx(index);setPopupOpen(true);}} className="user-thumbnail">{convo.name[0]}</button>
        ))}
      </div>

      {popupOpen && 
        <div className="conversation-modal">
          <div>
            <h2>{dummyConvos[selectedConvoIdx].name}</h2>
            {dummyConvos[selectedConvoIdx].conversation.map((convo, index) => (
              <p key={index}><b>{convo.speaker}: </b>{convo.text}</p>
            ))}
            <form onSubmit={(e) => sendText(e)}>
              <input type="text" value={textToSend} onChange={(e) => setTextToSend(e.target.value)} />
              <button type='submit'>Send</button>
            </form>
            <button onClick={() => setPopupOpen(false)}>Close</button>
          </div>
        </div>
      }
    </div>
  );
}

export default Conversations;
