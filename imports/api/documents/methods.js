import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Documents } from './documents'
import { rateLimit } from '../../modules/rate-limit'

export const insertDocument = new ValidatedMethod({
  name: 'documents.insert',
  validate: new SimpleSchema({
    title: { type: String },
    body: { type: String },
  }).validator(),
  run(document) {
    Documents.insert(document)
  },
})

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Documents.remove(_id)
  },
})

rateLimit({
  methods: [
    insertDocument,
    removeDocument,
  ],
  limit: 5,
  timeRange: 1000,
})
