import React from 'react'
import styles from '../../styles/profile.module.scss';
import { BiEdit } from 'react-icons/bi';
export default function profileHeader(){
    return(
       <div className={styles.profileHeader}>
        <h2 className={styles.headerTittle}>Profile</h2>
        <div className={styles.edit}><BiEdit className={styles.icon}/></div>
       </div>
    )
}