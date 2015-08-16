Type Dictionary
---------------

Date: Number (epoc)
MessageIdType: UUID
ThreadIdType: UUID
UserIdType: username string


ThreadInfo Payload
------------------

threadInfo: {
  createdAt: Date,
  parentId: ThreadIdType,
  participants: [ UserIdType ],
  threadId: ThreadIdType,
  title: String
}

Message Payload
---------------

message: {
  createdAt: Date
  messageId: MessageIdType,
  text: String,
  threadId: ThreadIdType
  userId: String,
}

User Payload
------------
userInfo: {
  id: String,
  name: String,
  threads: { threadId: dummyValue }
}







/*
TBD User Payload
-------------------
{
  id: String,
  name: String,
  snoozed: {
    messages: [ { threadId: MessageIdType, until: Date } ],
    threads: { threadId: Date }  // ???
  },
  status: StatusType,
  threads: [{
    id: ThreadIdType,
    lastSeenMessageId: MessageIdType,
    pinned: Boolean
  }],
  users: {
    blocked: [ UserIdType ],
    pinned: [ ]
  }
}
*/