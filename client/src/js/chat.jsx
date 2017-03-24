class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevName: this.props.name,
      name: this.props.name
    }
  }

  chatSubmit(event) {
    event.preventDefault();
    var messageText = this.refs.messageInput.value;
    var prevName = this.state.prevName;
    this.refs.messageInput.value = '';

    this.setState({
      prevName: this.refs.nameInput.value
    });

    //test version until chat DB is up
    var messageID;
    if(prevName !== this.state.name) {
      messageID = appData.chats[appData.chats.length - 1].id + 1;
      appData.chats.push({
        id: messageID,
        user: prevName,
        text: 'I changed my name to \'' + this.state.name + '\''
      });
    }

    messageID = appData.chats[appData.chats.length - 1].id + 1;
    appData.chats.push({
      id: messageID,
      user: this.state.name,
      text: messageText
    });
    // end test code

    this.props.updateChat();
  }

  changeName() {
    this.setState({
      name: this.refs.nameInput.value
    });
  }

  render() {
    return (
      <form onSubmit={this.chatSubmit.bind(this)}>
        <input type="text" ref="nameInput" value={this.state.name} onChange={this.changeName.bind(this)}></input>
        <input type="text" ref="messageInput"></input>
        <button type="submit">Send</button>
      </form>
    );
  }
};

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="chatMessage">
        <span className="chatMessageUser"> {this.props.message.user}: </span>
        <span className="chatMessageText"> {this.props.message.text} </span>
      </div>
    );
  }

};

//CHAT CONTROLLER
class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: appData.chats,
      anonName: this.genAnonName()
    }
  }

  genAnonName() {
    var num = Math.floor(Math.random() * 1000);
    var numStr = '000' + num;
    numStr = numStr.substring(numStr.length - 3);
    var name = 'Anon' + numStr;
    return name;
  }

  updateChat() {
    this.setState({
      messages: appData.chats
    });
  }

  render() {
    var chats = [];
    _.each(this.state.messages, function(message) {
      chats.push(<ChatMessage message={message} key={message.id}/>);
    })


    return (
      <div className="chatBox">
        {chats}
        <div>
          <ChatInput name={this.state.anonName} updateChat={this.updateChat.bind(this)}/>
        </div>
      </div>
    )
  }
};

window.Chat = Chat;