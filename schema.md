# Slick Firebase Schema

## Schema

```
firebase:
  threadInfo: {
    threadId: {
      title: String,
      parentId: ThreadIdType,
      participants: [ UserIdType ],
      createdAt: Date,
    }
  },

  threadMessages: {
    threadId: {
      messageId: {
        text: String,
        userId: String,
        createdAt: Date
      }
    },
  },

  userInfo: {
    userId: {
      name: String,
      status: StatusType,
      threads: {
        threadId: {
          lastSeenMessageId: MessageIdType,
          pinned: Boolean,
          snoozedUntil: Date
        }
      },
      users: {
        blocked: [ UserIdType ],
        pinned: [ UserIdType ]
        // why not users: { userId: flag }
      }
    }
  }
```

## Types

```
Date:           Number (epoc)
MessageIdType:  UUID
StatusType:     enum (TBD)
ThreadIdType:   UUID
UserIdType:     String (Firebase-unsafe characters escaped)
```


## Pending

