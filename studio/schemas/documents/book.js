import { format } from 'date-fns'
import { FiBook } from 'react-icons/fi'
import { FiLink } from 'react-icons/fi'
import Tabs from '../../plugins/tabs'

export default {
  name: 'book',
  type: 'document',
  title: 'Book',
  icon: FiBook,
  fields: [
    {
      name: 'content',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: [
        { name: 'general', title: 'General' },
        { name: 'details', title: 'Details' },
        { name: 'promotion', title: 'Promotion' },
      ],
      options: {
        // setting layout to object will group the tab content in an object fieldset border.
        // ... Useful for when your tab is in between other fields inside a document.
        layout: 'object'
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          fieldset: 'general'
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          fieldset: 'general',
          options: {
            source: 'content.title',
            maxLength: 96
          }
        },
        {
          name: 'series',
          title: 'Series',
          type: 'reference',
          to: [
            {
              type: 'series'
            }
          ],
          fieldset: 'general'
        },
        {
          name: 'releaseDate',
          type: 'date',
          title: 'Release date',
          fieldset: 'general'
        },
        {
          name: 'cover',
          type: 'mainImage',
          title: 'Cover',
          fieldset: 'general'
        },
        {
          title: 'Color theme',
          name: 'theme',
          type: 'reference',
          fieldset: 'general',
          to: [{ type: 'colorTheme' }]
        },
        {
          name: 'hook',
          type: 'introPortableText',
          title: 'Hook',
          description: 'Short phrase that typically shows up on the book cover and marketing material',
          fieldset: 'details'
        },
        {
          title: 'Buy book from',
          name: 'buyBookFrom',
          type: 'array',
          fieldset: 'details',
          of: [
            {
              type: 'link',
              title: 'Link',
              icon: 'FiLink'
            }
          ]
        },
        {
          title: 'Add to Goodreads',
          name: 'addToGoodreads',
          type: 'link',
          fieldset: 'details'
        },
        {
          title: 'Links',
          name: 'links',
          type: 'array',
          fieldset: 'details',
          of: [
            {
              type: 'link',
              title: 'Link'
            }
          ]
        },
        {
          title: 'Publisher links',
          name: 'publishers',
          type: 'array',
          fieldset: 'details',
          of: [
            {
              type: 'link',
              title: 'Link'
            }
          ]
        },
        {
          title: 'Agent',
          name: 'agent',
          type: 'reference',
          to: { type: 'agent' },
          fieldset: 'details',
          readOnly: true
        },
        {
          name: 'internationalCovers',
          type: 'array',
          title: 'Promotional images',
          description: 'Add images and captions. Up to three will display alongside the Synopsis, Reviews, and Press items.',
          fieldset: 'promotion',
          of: [{ type: 'mainImage' }]
        },
        {
          name: 'synopsis',
          type: 'introPortableText',
          title: 'Synopsis',
          fieldset: 'promotion'
        },
        {
          name: 'reviews',
          type: 'array',
          title: 'Reviews',
          fieldset: 'promotion',
          of: [
            {
              type: 'review',
              title: 'Review'
            }
          ]
        },
        {
          title: 'Press items',
          name: 'pressItems',
          type: 'array',
          fieldset: 'promotion',
          of: [
            {
              type: 'reference',
              to: {type: 'press'}
            }
          ]
        },
      ]
    }
  ],
  initialValue: {
    agent: {
      _type: 'reference',
      _ref: 'agent'
    }
  },
  orderings: [
    {
      name: 'releaseDateAsc',
      title: 'Release date new–>old',
      by: [
        {
          field: 'releaseDate',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'releaseDateDesc',
      title: 'Release date old->new',
      by: [
        {
          field: 'releaseDate',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'content.title',
      slug: 'content.slug',
      media: 'content.cover'
    },
    prepare ({ title = 'No title', slug = {}, media }) {
      const path = `/${slug.current}/`
      return {
        title,
        media,
        subtitle: path
      }
    }
  }
}
