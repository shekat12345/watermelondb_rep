import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'chatList',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'position', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'chattid', type: 'string'},
        {name: 'hasMedia', type: 'string', isOptional: true},
        {name: 'sender', type: 'number'},                
        {name: 'chatID', type: 'string', isIndexed: true},
        
      ],
    }),
    // and so on
  ]
})