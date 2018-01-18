import { Model } from './model'

export const CURRENT_THUMBNAIL_VERSION = 1

export const ContentTypes = {
  Text: 1
}

export const ConversationMetadata = Model('ConversationMetadata', {
  id: '',
  publicID: '',
  secret: '',
  contacts: [],
  thumbnail: {}
})

export const Conversation = Model('Conversation', {
  /**
   * List of IDs of contacts involved in the conversation
   */
  contacts: [],

  /**
   * The random string which is the public ID for the convo
   */
  publicID: '',

  /**
   * The secret for the convo
   */
  secret: '',

  /**
   * List of messages contained in the conversation
   */
  messages: []
})

Conversation.getId = ({ contacts }) => contacts.sort().join('-')

Conversation.getDefaultThumbnail = () => ({
  id: null,
  version: CURRENT_THUMBNAIL_VERSION,
  contentType: ContentTypes.Text,
  content: '',
  timestamp: new Date().toISOString()
})

Conversation.getThumbnail = convo => {
  const id = Conversation.getId(convo)
  const version = CURRENT_THUMBNAIL_VERSION
  const [firstMessage] = convo.messages

  const base = Conversation.getDefaultThumbnail()

  if (!firstMessage) {
    return {
      ...base,
      id,
      version
    }
  }

  return {
    ...base,
    id,
    version,
    contentType: firstMessage.type,
    content: firstMessage.content,
    lastSender: firstMessage.sender,
    timestamp: firstMessage.sentAt
  }
}

Conversation.getMetadata = convo => new ConversationMetadata({
  id: Conversation.getId(convo),
  thumbnail: Conversation.getThumbnail(convo),
  contacts: convo.contacts,
  publicID: convo.publicID,
  secret: convo.secret
})

export const Message = Model('Message', {
  /**
   * ID of the contact who sent this message
   */
  sender: '',

  /**
   * What type of content the message contains
   */
  type: ContentTypes.Text,

  /**
   * String content of the message
   */
  content: '',

  sentAt: new Date().toISOString()
})
