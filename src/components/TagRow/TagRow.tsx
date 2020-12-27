import React, { useState, ChangeEvent, useCallback, KeyboardEvent } from 'react'
import classNames from 'classnames'
import styles from './TagRow.module.scss'

export interface Tag {
  id: string
  text: string
  color: string
}

interface ITagProps {
  tag: Tag
  onDelete?: (tId: string) => void
  onEdit?: (tId: string, text: string) => void
}

const TagRow = React.memo(({ tag, onEdit, onDelete }: ITagProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tagText, setTagText] = useState(tag.text)

  const handleTagTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagText(e.target.value)
  }

  const handleEditSaveClick = useCallback(() => {
    if (isEditing) {
      onEdit && onEdit(tag.id, tagText)
    }
    setIsEditing(!isEditing)
  }, [onEdit, tag, tagText, isEditing])

  const handleDeleteClick = useCallback(() => {
    onDelete && onDelete(tag.id)
  }, [onDelete, tag])
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSaveClick()
    }
  }, [handleEditSaveClick])

  return (
    <div
      className={classNames(styles.row, { [styles.active]: isEditing })}
      key={`tag-row-${tag.id}`}
      style={{ backgroundColor: tag.color }}
    >
      <div className={styles.bgWrap} />
      <div className={styles.content}>
        <div className={styles.title}>
          <span className={styles.circle} style={{ background: tag.color }}></span>
          <div className={styles.textWrap}>
            {isEditing ? (
              <input
                className={styles.tagTextInput}
                type="text"
                value={tagText}
                onChange={handleTagTextChange}
                onKeyDown={handleKeyDown}
                autoFocus={true}
              />
            ) : (
              <span>{tagText}</span>
            )}
          </div>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleEditSaveClick}
            className={styles.tagButton}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className={styles.tagButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
})

export default TagRow
