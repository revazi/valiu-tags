import React, { useState, useEffect } from 'react'
import { TagContainer } from 'components/TagContainer'
import { Tag } from 'components/TagRow/TagRow'
import useClickOutside from 'hooks/useClickOutside'
import classNames from 'classnames'

import styles from './Tagger.module.scss'

interface ITaggerProps {
  collapsed?: boolean // if collapsed exists means that tagger is collapsable
  onDelete?: (tId: string) => void
  onEdit?: (tId: string, text: string) => void
  onCreate?: (text: string) => void
  tags: Tag[]
}

const Tagger = ({ collapsed, tags, onEdit, onCreate, onDelete }: ITaggerProps) => {
  const [showTagContainer, setShowTagContainer] = useState(
    collapsed === undefined || !collapsed
  )

  const handleTagContainer = (show: boolean) => () => {
    if (collapsed !== undefined) setShowTagContainer(show)
  }

  useEffect(() => {
    setShowTagContainer(collapsed === undefined || !collapsed)
  }, [collapsed])

  useClickOutside(['Tag-Container', 'Tag-Button'], handleTagContainer(false))

  return (
    <div className={styles.tagger}>
      {collapsed !== undefined ? (
        <button
          id="Tag-Button"
          type="button"
          onClick={handleTagContainer(!showTagContainer)}
          className={styles.header}
        >
          Tags
        </button>
      ) : (
        <div className={classNames(styles.header, styles.button)}>Tags</div>
      )}
      {showTagContainer && (
        <TagContainer
          onCreate={onCreate}
          onDelete={onDelete}
          onEdit={onEdit}
          id="Tag-Container"
          tags={tags}
        />
      )}
    </div>
  )
}

export default Tagger
