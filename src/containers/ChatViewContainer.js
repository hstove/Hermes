import React from 'react'
import {
  compose,
  lifecycle,
  branch,
  renderNothing,
  withProps
} from 'recompose'
import { connect } from 'react-redux'
import { ChatView } from '../components/ChatView'
import { COMPOSE_CONVERSATION_ID } from '../store/chat/actions'
import { actions } from '../store'
import { WithAuthChallenge } from './WithAuthChallenge'
import { ChatSidebarContainer } from './ChatSidebarContainer'

const WithRedux = connect(
  state => {
    const identity = state.auth.identity

    const composing = state.chat.activeConversation === COMPOSE_CONVERSATION_ID
    const conversation = state.chat.activeConversation
                      && state.chat.conversationDetails[state.chat.activeConversation]

    const contacts = state.contacts.contactsById

    const loading = state.chat.loadingConversationMetadata
                 || state.contacts.loading
                 || (!conversation && !composing)
                 || conversation && conversation.loading

    let newMessageRecipients = []

    if (composing) {
      newMessageRecipients = state.chat.newMessageRecipients.map(id => contacts[id])
    }

    return {
      identity,
      composing,
      conversation,
      loading,
      contacts,
      newMessageRecipients
    }
  },
  dispatch => ({
    loadInitialData: async () => {
      await dispatch(actions.setup())
      await dispatch(actions.contacts.fetchContacts())
      await dispatch(actions.contacts.fetchSelf())
      await dispatch(actions.chat.fetchConversationList())
    },
    onSendMessage: text => {
      if (text.trim() === '/delete') {
        dispatch(actions.chat.deleteActiveConversation())
        return
      }

      dispatch(actions.chat.sendMessage(text))
    },
    onSetNewMessageRecipients: ids => dispatch(actions.chat.setNewMessageRecipients(ids))
  })
)

const WithSidebar = withProps({
  sidebar: <ChatSidebarContainer/>
})

const WithLoader = branch(
  props => props.loading,
  renderNothing
)

const WithDataOnLoad = lifecycle({
  componentDidMount() {
    this.props.loadInitialData()
  }
})

export const ChatViewContainer = compose(
  WithAuthChallenge,
  WithRedux,
  WithSidebar,
  WithDataOnLoad,
  WithLoader
)(ChatView)
