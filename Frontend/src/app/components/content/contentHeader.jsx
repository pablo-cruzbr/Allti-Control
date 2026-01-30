import React from "react"
import { 
    BiSearch, 
    BiNotification 
} from "react-icons/bi";

import styles from '../../styles/content.module.scss'

export default function content(){
    return(
        <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h1 className={styles.headerTittle}>Dashboard</h1>
          <div className={styles.contentActivity}>
            <div className={styles.searchBox}>
              <input 
              type="text" 
              placeholder="Informe o Nº do Ticket..." 
              />
              
              <BiSearch className={styles.icons} />
            </div>
            <div className={styles.notify}>
              <BiNotification className={styles.icons} />
            </div>
          </div>
        </div>
      </div>
    )
}