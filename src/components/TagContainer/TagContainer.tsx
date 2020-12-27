import React, { useState, useEffect, ChangeEvent } from 'react'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'

import { TagPlaceholder } from 'components/TagPlaceholder'
import { TagRow } from 'components/TagRow'
import { Tag } from 'components/TagRow/TagRow'
import useDebounce from 'hooks/useDebounce'

import styles from "./TagContainer.module.scss"

interface ITagContainerProps {
  id?: string
  tags: Tag[]
  onDelete?: (tId: string) => void
  onEdit?: (tId: string, text: string) => void
  onCreate?: (text: string) => void
}

const TagContainer = ({ tags, id, onEdit, onDelete, onCreate }: ITagContainerProps) => {
  const [tagInputValue, setTagInputValue] = useState('')
  const [filteredTags, setFilteredTags] = useState(tags)
  const debouncedTagInputValue = useDebounce(tagInputValue, 300)

  const tagsToShow = tagInputValue === debouncedTagInputValue ? filteredTags : tags
  useEffect(() => {
    setFilteredTags(
      tags.filter((e) => {
        return e.text.toLowerCase().includes(debouncedTagInputValue.toLowerCase())
      })
    )
  }, [debouncedTagInputValue, tags])

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value)
  }

  const handleCreateTag = () => {
    setTagInputValue('')
    onCreate && onCreate(tagInputValue)
  }

  const Row = ({ index, style }: ListChildComponentProps) => {
    return (
      <div key={index} style={style}>
        <TagRow onDelete={onDelete} onEdit={onEdit} tag={tagsToShow[index]} />
      </div>
    )
  }

  return (
    <div className={styles.container} id={id}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search tag"
        value={tagInputValue}
        onChange={handleTagInputChange}
      />

      {tagsToShow?.length ? (
        <List height={250} itemCount={tagsToShow.length} itemSize={50} width={'100%'}>
          {Row}
        </List>
      ) : (
        <div className={styles.addTagContainer}>
          {debouncedTagInputValue.length ? (
            <>
              <h3>Tag was not found</h3>
              <button
                type="button"
                onClick={handleCreateTag}
                className={styles.addTagButton}
              >
                Add new tag
              </button>
            </>
          ) : (
            // <h3>No tags added</h3>
            // TODO::Distinguish when data is loading and when there is 
            <TagPlaceholder
              speed={2}
              width={398}
              height={250}
              viewBox="0 0 398 250"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
             />
          )}
        </div>
      )}
    </div>
  )
}

export default TagContainer
