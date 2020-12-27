import React from "react"
import ContentLoader, { IContentLoaderProps } from 'react-content-loader'

import styles from './TagPlaceholder.module.scss'



const TagPlaceholder = (props: IContentLoaderProps) => (
  <ContentLoader 
    className={styles.svg}
    {...props}
  >
    <circle cx="29" cy="31" r="3" /> 
    <rect x="44" y="26" rx="5" ry="5" width="162" height="10" /> 
    <rect x="625" y="28" rx="5" ry="5" width="42" height="10" /> 
    <rect x="306" y="27" rx="5" ry="5" width="25" height="8" /> 
    <rect x="625" y="91" rx="5" ry="5" width="42" height="10" /> 
    <rect x="625" y="147" rx="5" ry="5" width="42" height="10" /> 
    <rect x="625" y="202" rx="5" ry="5" width="42" height="10" /> 
    <rect x="565" y="202" rx="5" ry="5" width="42" height="10" /> 
    <rect x="340" y="27" rx="5" ry="5" width="35" height="8" /> 
    <circle cx="29" cy="71" r="3" /> 
    <rect x="44" y="66" rx="5" ry="5" width="111" height="10" /> 
    <rect x="306" y="67" rx="5" ry="5" width="25" height="8" /> 
    <rect x="340" y="67" rx="5" ry="5" width="35" height="8" /> 
    <circle cx="29" cy="111" r="3" /> 
    <rect x="44" y="106" rx="5" ry="5" width="180" height="10" /> 
    <rect x="306" y="107" rx="5" ry="5" width="25" height="8" /> 
    <rect x="340" y="107" rx="5" ry="5" width="35" height="8" /> 
    <circle cx="29" cy="151" r="3" /> 
    <rect x="44" y="146" rx="5" ry="5" width="77" height="10" /> 
    <rect x="306" y="147" rx="5" ry="5" width="25" height="8" /> 
    <rect x="340" y="147" rx="5" ry="5" width="35" height="8" /> 
    <circle cx="29" cy="191" r="3" /> 
    <rect x="44" y="186" rx="5" ry="5" width="159" height="10" /> 
    <rect x="306" y="187" rx="5" ry="5" width="25" height="8" /> 
    <rect x="340" y="187" rx="5" ry="5" width="35" height="8" /> 
    <circle cx="29" cy="231" r="3" /> 
    <rect x="44" y="226" rx="5" ry="5" width="127" height="10" /> 
    <rect x="306" y="227" rx="5" ry="5" width="25" height="8" /> 
    <rect x="340" y="227" rx="5" ry="5" width="35" height="8" />
  </ContentLoader>
)

export default TagPlaceholder