import React from "react"
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

import styles from './TagPlaceholder.module.scss'



const TagPlaceholder = (props: IContentLoaderProps) => (
  <ContentLoader 
    className={styles.svg}
    {...props}
  >
    <circle cx="25" cy="33" r="4" /> 
    <rect x="38" y="28" rx="5" ry="5" width="220" height="10" /> 
    <rect x="625" y="28" rx="5" ry="5" width="42" height="10" /> 
    <rect x="565" y="28" rx="5" ry="5" width="42" height="10" /> 
    <circle cx="23" cy="96" r="4" /> 
    <rect x="36" y="91" rx="5" ry="5" width="220" height="10" /> 
    <rect x="625" y="91" rx="5" ry="5" width="42" height="10" /> 
    <rect x="565" y="91" rx="5" ry="5" width="42" height="10" /> 
    <circle cx="22" cy="152" r="4" /> 
    <rect x="35" y="147" rx="5" ry="5" width="220" height="10" /> 
    <rect x="625" y="147" rx="5" ry="5" width="42" height="10" /> 
    <rect x="565" y="147" rx="5" ry="5" width="42" height="10" /> 
    <circle cx="23" cy="207" r="4" /> 
    <rect x="36" y="202" rx="5" ry="5" width="220" height="10" /> 
    <rect x="625" y="202" rx="5" ry="5" width="42" height="10" /> 
    <rect x="565" y="202" rx="5" ry="5" width="42" height="10" />
  </ContentLoader>
)

export default TagPlaceholder